import { useCallback, useState } from 'react';
import { Ion, Math, Terrain, GeoJsonDataSource, Color, defined, /*createOsmBuildingsAsync,*/ Cartesian3, Cesium3DTileset, DataSource, GoogleMaps, createGooglePhotorealistic3DTileset } from "cesium";
import ViewerWidget from './components/widget/viewer/ViewerWidget/ViewerWidget';
import ImageryLayerTree from './components/tree/imageryLayer/ImageryLayerTree/ImageryLayerTree';
import DataSourceTree from './components/tree/dataSource/DataSourceTree/DataSourceTree';
import defaultImageryLayers from './assets/imageryLayer/defaultImageryLayers.json';
import belgiumImageryLayers from './assets/imageryLayer/belgiumImageryLayers.json';
import belgiumProvinces from './assets/data/geoJson/belgium-provinces-wgs84.json';
import ImageryLayerBuilder from './core/factory/imageryLayer/ImageryLayerBuilder';
import WfsGetFeatureButton from './components/button/wfs/WfsGetFeatureButton/WfsGetFeatureButton';
import EntityGrid from './components/grid/entity/EntityGrid/EntityGrid';
import './App.css';
import TrackCoordinateButton from './components/button/coordinate/TrackCoordinateButton/TrackCoordinateButton';
import { AgGridReact } from 'ag-grid-react';

//https://geo.api.vlaanderen.be/Adressenregister/wfs?service=WFS&request=getcapabilities
const wfsUrl = 'https://geoservices.informatievlaanderen.be/overdrachtdiensten/Adressen/wfs';
//const wfsUrl = 'https://geoservices.informatievlaanderen.be/overdrachtdiensten/Gebouwenregister/wfs'
// const wfsResourceOptions = {
//   url: 'https://geoservices.informatievlaanderen.be/overdrachtdiensten/Adressen/wfs'
// };
const wfsOptions = {
  //srsName: 'urn:x-ogc:def:crs:EPSG:4326',
  srsName: 'EPSG:4326',
  featureNS: 'informatievlaanderen.be/Adressen', //informatievlaanderen.be/Gebouwenregister
  featurePrefix: 'Adressen', //Gebouwenregister
  featureTypes: ['Adrespos'], //['Gebouw']
  geometryName: 'adrespositie', //Geometrie
  outputFormat: 'application/json',
  maxFeatures: 200
};


// Your access token can be found at: https://cesium.com/ion/tokens.
// This is a temporary default access token
Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1OGZjNDZkNC1iOTdlLTRhYWMtODBjYy1mNWIzOGEwYjUxNjAiLCJpZCI6MTAzODcsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NTYyODk0MDl9.f13hGNgcrSFUzcocb5CpHD3Im9xzT0c7IDAPcpwGidc';

GoogleMaps.defaultApiKey = 'add your key';

const viewerOpts = {
  // terrain: Terrain.fromWorldTerrain({
  //   requestWaterMask : true, //required for water effects
  //   requestVertexNormals : true //required for lighting
  // }),
  infoBox: false,
  selectionIndicator: false,
};

const flyOpts = {
  //destination : Cartesian3.fromDegrees(-122.4175, 37.655, 400),
  //destination: Cartesian3.fromDegrees(4.352422633283487, 50.8468441328301, 400),
  destination: Cartesian3.fromDegrees(4.358948, 50.859114, 200),
  orientation : {
      heading : Math.toRadians(0.0),
      pitch : Math.toRadians(-5.0),
  }
}

function App() {

  const [viewer, setViewer] = useState(null);
  const [dataSource, setDataSource] = useState(null);
  
  const onStart = useCallback((aViewer) => {
    aViewer.scene.globe.show = false;
    setDataSource(new GeoJsonDataSource('bld'));
    aViewer.imageryLayers.removeAll();
    // Add Cesium OSM Buildings, a global 3D buildings layer.
    // createOsmBuildingsAsync()
    // .then((tileset) => {
    //   aViewer.scene.primitives.add(tileset);
    // })
    // .catch((error) => {
    //   console.log(`Error creating tileset: ${error}`);
    // });   
    // Fly the camera to San Francisco at the given longitude, latitude, and height.
    aViewer.camera.flyTo(flyOpts);
    //enable depth test so things behind terrain will disapear.
    aViewer.scene.globe.depthTestAgainstTerrain = true;
    //add tileset
    //Cesium3DTileset.fromIonAssetId(IonResource.fromAssetId(1299995), {
    // Cesium3DTileset.fromUrl('https://mapuiexts.github.io/react-cesiumext.github.io/assets/3D_Tiles/UrbAdm3D_148170_3DTILES/tileset/tileset.json', {
    //   backFaceCulling: false
    // })
    // .then((tileset) => {
    //   aViewer.scene.primitives.add(tileset);
    // })
    // .catch((error) => {
    //   console.log(`Error creating tileset: ${error}`);
    // });

    // const tileset = aViewer.scene.primitives.add(
    //   new Cesium3DTileset({
    //     url: 'https://mapuiexts.github.io/react-cesiumext.github.io/assets/3D_Tiles/UrbAdm3D_148170_3DTILES/tileset/tileset.json',
    //     //url: IonResource.fromAssetId(1299995),
    //     backFaceCulling: false
    //   })
    // );

     // Add Google Photorealistic 3D Tileset
     createGooglePhotorealistic3DTileset()
     .then((tileset) => {
         defined(aViewer) && !aViewer.isDestroyed() && aViewer.scene.primitives.add(tileset);
     })
     .catch((error) => {
         console.log(`Error creating tileset: ${error}`);
     }); 

    const layerOptions = {
      layers: [...belgiumImageryLayers.layers, ...defaultImageryLayers.layers]
    };
    const layerBuilder = new ImageryLayerBuilder();
    layerBuilder.buildAsync(layerOptions, aViewer.imageryLayers);
    
    setViewer(aViewer);
  }, []);

  
  
  return (
    <div className="App" style={{display: 'flex', flexDirection: 'column', width:'100%', height:900}}>
      <div style={{display:'flex'}}>
        {/* <Button type="primary" onClick={onClick}>test</Button> */}
        {
          defined(viewer) &&
        <>
          <WfsGetFeatureButton url={wfsUrl} wfsOptions={wfsOptions} >Get Feature</WfsGetFeatureButton>
          <TrackCoordinateButton viewer={viewer}>TrackCoordinate</TrackCoordinateButton>
        </>
        }
      </div>
      <div style={{display:'flex', flexDirection:'row', height:'100%'}}>
        <ViewerWidget options={viewerOpts} onStart={onStart} style={{width:'80%', height:'90%'}}/>
        <div  style={{display:'flex', flexDirection:'column', width:'20%'}}>
          <ImageryLayerTree viewer={viewer} rootName="Imagery Layers" />
          <DataSourceTree viewer={viewer} rootName="Data Sources" />
        </div>
      </div>
      <div style={{height:'30%'}}>
        { viewer && dataSource &&
            <EntityGrid viewer={viewer} ds={dataSource} />
        }
        
        
      </div>
      {/* <OverlayTooltip viewer={viewer} visible={true}>
        <div>Draw a Line ...</div>
      </OverlayTooltip> */}
      {/* <CustomViewerWidget options={viewerOpts} onStart={onStart}/> */}
    </div>
  );
}

export default App;
