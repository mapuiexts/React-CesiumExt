import { useCallback, useState } from 'react';
//import { Button, Menu, Dropdown, Space  } from 'antd';
import { Ion, createWorldTerrain, /*createOsmBuildings,*/ Cartesian3, Cesium3DTileset, /*IonResource*/ } from "cesium";
import ViewerWidget from './components/widget/viewer/ViewerWidget/ViewerWidget';
import ImageryLayerTree from './components/tree/imageryLayer/ImageryLayerTree/ImageryLayerTree';
import DataSourceTree from './components/tree/dataSource/DataSourceTree/DataSourceTree';
import defaultImageryLayers from './assets/imageryLayer/defaultImageryLayers.json';
import belgiumImageryLayers from './assets/imageryLayer/belgiumImageryLayers.json';
import ImageryLayerBuilder from './core/factory/imageryLayer/ImageryLayerBuilder';
//import OverlayTooltip from './components/overlay/tooltip/OverlayTooltip/OverlayTooltip';
import DrawPolylineButton from './components/button/common/draw/DrawPolylineButton/DrawPolylineButton';
import DrawPolygonButton from './components/button/common/draw/DrawPolygonButton/DrawPolygonButton';
import DrawPointButton from './components/button/common/draw/DrawPointButton/DrawPointButton';
import DrawLabelButton from './components/button/common/draw/DrawLabelButton/DrawLabelButton';
import WfsGetFeatureButton from './components/button/wfs/WfsGetFeatureButton/WfsGetFeatureButton';

import 'antd/dist/antd.min.css'; //https://github.com/ant-design/ant-design/issues/33327
//import 'cesium/Widgets/widgets.css';
import './App.css';

const wfsUrl = 'https://geoservices.informatievlaanderen.be/overdrachtdiensten/Adressen/wfs';
// const wfsResourceOptions = {
//   url: 'https://geoservices.informatievlaanderen.be/overdrachtdiensten/Adressen/wfs'
// };
const wfsOptions = {
  //srsName: 'urn:x-ogc:def:crs:EPSG:4326',
  srsName: 'EPSG:4326',
  featureNS: 'informatievlaanderen.be/Adressen',
  featurePrefix: 'Adressen',
  featureTypes: ['Adrespos'],
  geometryName: 'adrespositie',
  outputFormat: 'application/json',
  maxFeatures: 200
};


// Your access token can be found at: https://cesium.com/ion/tokens.
// This is a temporary default access token
Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1OGZjNDZkNC1iOTdlLTRhYWMtODBjYy1mNWIzOGEwYjUxNjAiLCJpZCI6MTAzODcsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NTYyODk0MDl9.f13hGNgcrSFUzcocb5CpHD3Im9xzT0c7IDAPcpwGidc';


const viewerOpts = {
  terrainProvider: createWorldTerrain({
    requestWaterMask : true, //required for water effects
    requestVertexNormals : true //required for lighting
  }),
  infoBox: false,
  selectionIndicator: false
};

const flyOpts = {
  //destination : Cartesian3.fromDegrees(-122.4175, 37.655, 400),
  destination: Cartesian3.fromDegrees(4.352422633283487, 50.8468441328301, 400),
  // orientation : {
  //     heading : Math.toRadians(0.0),
  //     pitch : Math.toRadians(-15.0),
  // }
}

function App() {

  const [viewer, setViewer] = useState(null);
  
  const onStart = useCallback((aViewer) => {
    console.log(aViewer);
    aViewer.imageryLayers.removeAll();
    // Add Cesium OSM Buildings, a global 3D buildings layer.
    //aViewer.scene.primitives.add(createOsmBuildings());   
    // Fly the camera to San Francisco at the given longitude, latitude, and height.
    aViewer.camera.flyTo(flyOpts);
    console.log('imageryLayers1', aViewer.imageryLayers);
    //enable depth test so things behind terrain will disapear.
    aViewer.scene.globe.depthTestAgainstTerrain = true;

    const tileset = aViewer.scene.primitives.add(
      new Cesium3DTileset({
        url: 'https://mapuiexts.github.io/react-cesiumext.github.io/assets/3D_Tiles/UrbAdm3D_148170_3DTILES/tileset/tileset.json',
        //url: IonResource.fromAssetId(1299995),
        backFaceCulling: false
      })
    );
    console.log('tileset', tileset);
    const layerOptions = {
      layers: [...belgiumImageryLayers.layers, ...defaultImageryLayers.layers]
    };
    const layerBuilder = new ImageryLayerBuilder();
    layerBuilder.build(layerOptions, aViewer.imageryLayers);
    
    setViewer(aViewer);
  }, []);

  // const onClick = useCallback(() => {
  //   console.log('overlay');
  //   return (
  //     <>
  //     {/* <Button>Hi</Button> */}
  //     <OverlayTooltip viewer={viewer} visible={true}><div>Hello</div></OverlayTooltip>
  //     </>
  //   );
  // }, [viewer]);

  // const menu = (
  //   <Menu TabIndex={0}
  //     items={[
  //       {
  //         label: <a href="https://www.antgroup.com">1st menu item</a>,
  //         key: '0',
  //       },
  //       {
  //         label: <a href="https://www.aliyun.com">2nd menu item</a>,
  //         key: '1',
  //       },
  //       {
  //         type: 'divider',
  //       },
  //       {
  //         label: '3rd menu item',
  //         key: '3',
  //       },
  //     ]}
  //   />
  // );
  
  return (
    <div className="App">
      <div style={{display:'flex'}}>
        {/* <Button type="primary" onClick={onClick}>test</Button> */}
        {
          viewer &&
        <>
          <DrawPolylineButton viewer={viewer} type="primary">Draw Polyline</DrawPolylineButton>
          <DrawPolygonButton viewer={viewer} type="primary">Draw Polygon</DrawPolygonButton>
          <DrawPointButton viewer={viewer} type="primary">Draw Point</DrawPointButton>
          <DrawLabelButton viewer={viewer} text="React-CesiumExt" type="primary">Draw Label</DrawLabelButton>
          <WfsGetFeatureButton url={wfsUrl} wfsOptions={wfsOptions} >Get Feature</WfsGetFeatureButton>
          {/* <WfsGetFeatureByPolygonButton viewer={viewer} wfsResourceOptions={wfsResourceOptions} wfsOptions={wfsOptions} >Get Feature by Polygon</WfsGetFeatureByPolygonButton> */}
        </>
        }
      </div>
      <div style={{display:'flex', flexDirection:'row'}}>
        <ViewerWidget options={viewerOpts} onStart={onStart} style={{width:'80%'}}/>
        <div  style={{display:'flex', flexDirection:'column'}}>
          <ImageryLayerTree viewer={viewer} rootName="Imagery Layers" />
          <DataSourceTree viewer={viewer} rootName="Data Sources" />
        </div>
      </div>
      {/* <OverlayTooltip viewer={viewer} visible={true}>
        <div>Draw a Line ...</div>
      </OverlayTooltip> */}
      {/* <CustomViewerWidget options={viewerOpts} onStart={onStart}/> */}
    </div>
  );
}

export default App;
