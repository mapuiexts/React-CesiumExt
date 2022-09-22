import { useCallback, useState } from 'react';
import { Color, Ion, createWorldTerrain, /*createOsmBuildings,*/ Cartesian3, Cesium3DTileset, /*IonResource*/ } from "cesium";
import ViewerWidget from './components/widget/viewer/ViewerWidget/ViewerWidget';
import ImageryLayerTree from './components/tree/imageryLayer/ImageryLayerTree/ImageryLayerTree';
import DataSourceTree from './components/tree/dataSource/DataSourceTree/DataSourceTree';
import defaultImageryLayers from './assets/imageryLayer/defaultImageryLayers.json';
import belgiumImageryLayers from './assets/imageryLayer/belgiumImageryLayers.json';
import ImageryLayerBuilder from './core/factory/imageryLayer/ImageryLayerBuilder';
import CesiumColorSelect from './components/select/core/CesiumColorSelect/CesiumColorSelect';


import 'antd/dist/antd.min.css'; //https://github.com/ant-design/ant-design/issues/33327
//import 'cesium/Widgets/widgets.css';
import './App.css';


// Your access token can be found at: https://cesium.com/ion/tokens.
// This is a temporary default access token
Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1OGZjNDZkNC1iOTdlLTRhYWMtODBjYy1mNWIzOGEwYjUxNjAiLCJpZCI6MTAzODcsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NTYyODk0MDl9.f13hGNgcrSFUzcocb5CpHD3Im9xzT0c7IDAPcpwGidc';


const viewerOpts = {
  terrainProvider: createWorldTerrain()
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

  
  return (
    <div className="App">
      <div style={{display:'flex'}}>
        <CesiumColorSelect defaultValue={Color.GOLD.toCssHexString()}/>
      </div>
      <div style={{display:'flex', flexDirection:'row'}}>
        <ViewerWidget options={viewerOpts} onStart={onStart} style={{width:'80%'}}/>
        <div  style={{display:'flex', flexDirection:'column'}}>
          <ImageryLayerTree viewer={viewer} rootName="Imagery Layers" />
          <DataSourceTree viewer={viewer} rootName="Data Sources" />
        </div>
      </div>

      {/* <CustomViewerWidget options={viewerOpts} onStart={onStart}/> */}
    </div>
  );
}

export default App;
