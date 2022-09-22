This Example shows the usage of a __ImageryLayer Tree__ component.

```js
import { useCallback, useState } from 'react';
import { Ion, createWorldTerrain, createOsmBuildings, Cartesian3, Math } from "cesium";
import CustomViewerWidget from '../../../widget/viewer/CustomViewerWidget/CustomViewerWidget';
import ImageryLayerTree from '../../../tree/imageryLayer/ImageryLayerTree/ImageryLayerTree';
import ImageryLayerBuilder from '../../../../core/factory/imageryLayer/ImageryLayerBuilder';
import belgiumImageryLayers from '../../../../assets/imageryLayer/belgiumImageryLayers.json';
import defaultImageryLayers from '../../../../assets/imageryLayer/defaultImageryLayers.json';
import 'antd/dist/antd.min.css';
import 'cesium/Widgets/widgets.css';

// Your access token can be found at: https://cesium.com/ion/tokens.
// This is a temporary default access token
Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1OGZjNDZkNC1iOTdlLTRhYWMtODBjYy1mNWIzOGEwYjUxNjAiLCJpZCI6MTAzODcsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NTYyODk0MDl9.f13hGNgcrSFUzcocb5CpHD3Im9xzT0c7IDAPcpwGidc';

//the config for the 3d terrain elevation provider
const viewerOpts = {
  terrainProvider: createWorldTerrain()
};

//the config for camera position and orientation
const flyOpts = {
  destination: Cartesian3.fromDegrees(4.912775, 50.261706, 400),
  orientation : {
      heading : Math.toRadians(0.0),
      pitch : Math.toRadians(-15.0),
  }
};

//our app having the ImageryLayer Tree component
const ImageryLayerTreeApp = () => {
  const [viewer, setViewer] = useState(null);

  const onStart = useCallback((aViewer) => {
    //remove all default imageryLayers
    aViewer.imageryLayers.removeAll();
    // Add Cesium OSM Buildings, a global 3D buildings layer.
    aViewer.scene.primitives.add(createOsmBuildings());   
    // Fly the camera to Dinant, Belgium at the given longitude, latitude, and height.
    aViewer.camera.flyTo(flyOpts);
    
    //retrieve layer definitions from asset/imageryLayer folder and build layers
    const layerOptions = {
      layers: [...belgiumImageryLayers.layers, ...defaultImageryLayers.layers]
    };
    const layerBuilder = new ImageryLayerBuilder();
    layerBuilder.build(layerOptions, aViewer.imageryLayers);
    
    setViewer(aViewer);
  }, [])

  return(
      <div style={{display:'flex'}}>
        <CustomViewerWidget options={viewerOpts} onStart={onStart} style={{width:'80%'}}/>
        <ImageryLayerTree viewer={viewer}/>
      </div>
  );
};

<ImageryLayerTreeApp/>



```