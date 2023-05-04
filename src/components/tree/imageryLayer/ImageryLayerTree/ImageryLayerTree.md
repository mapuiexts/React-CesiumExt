This Example shows the usage of a __ImageryLayer Tree__ component.
- On this example, the ImageryLayer tree is located in the right side.
- Click on the root tree *Imagery Layers* to expand all the nodes:
  - It will show all the imagery layers present in the viewer.
- If you check/uncheck a checbox for a particular layer, this layer will be visible/invisible in the viewer.
- A default context menu will be shown if you click in a particular tree node. 
  Just right click in any node in the tree view to visualize it.
  The following options are available in the default menu context:
  - menu options for creation of a new layer if user right-click in the root node.
  - menu option for update an existing layer if user right-click in the imagery layer node.
  - remove a existing layer if user right-click in the imagery layer node. 
  - To check how these components work, check in our api documentation
    under the folder: [UI Components/Button/imagery layer](#/UI%20Components/button/imagery%20layer)
- On this example, if you click in the check box *Custom Context Menu*, a custom context menu will be available:
  - the function *buildCustomContextMenu* to build the new context menu is set in the *ImageryLayerTree*
    component through its property named *menuPropsFunc*. So, this custom context menu will have the following behaviour:
      - if user right-click in the root node, only the option to create a OSM layer will be available.
      - if user right-click in the imagery layer node, only a custom menu item will be available.
```js
import { useCallback, useState } from 'react';
import {Checkbox, Button} from 'antd';
import { Ion, Terrain, createOsmBuildingsAsync, Cartesian3, Math, defined } from "cesium";
import CustomViewerWidget from '../../../widget/viewer/CustomViewerWidget/CustomViewerWidget';
import ButtonControlContainer from '../../../widget/container/ButtonControlContainer/ButtonControlContainer';
import NewOSMImageryLayerButton from '../../../button/imageryLayer/NewOSMImageryLayerButton/NewOSMImageryLayerButton';
import ImageryLayerTree from '../../../tree/imageryLayer/ImageryLayerTree/ImageryLayerTree';
import ImageryLayerBuilder from '../../../../core/factory/imageryLayer/ImageryLayerBuilder';
import belgiumImageryLayers from '../../../../assets/imageryLayer/belgiumImageryLayers.json';
import defaultImageryLayers from '../../../../assets/imageryLayer/defaultImageryLayers.json';
import '../../../../assets/css/react-cesiumext-controls.css';

// Your access token can be found at: https://cesium.com/ion/tokens.
// This is a temporary default access token
Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1OGZjNDZkNC1iOTdlLTRhYWMtODBjYy1mNWIzOGEwYjUxNjAiLCJpZCI6MTAzODcsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NTYyODk0MDl9.f13hGNgcrSFUzcocb5CpHD3Im9xzT0c7IDAPcpwGidc';

//the config for the 3d terrain elevation provider
const viewerOpts = {
  //terrainProvider: createWorldTerrain()
  terrain: Terrain.fromWorldTerrain({
    requestWaterMask : true, //required for water effects
    requestVertexNormals : true //required for lighting
  })
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
  const [menuPropsFunc, setMenuPropsFunc] = useState();

  const buildCustomContextMenu = useCallback((viewer, layer) => {
    const menuProps = {items:[]};
    //add a menu option to create a OSM layer in the root node
    if(!defined(layer)) {
      menuProps.items.push(
        {
          label: <NewOSMImageryLayerButton size="small" type="text" viewer={viewer}>New OSM Layer</NewOSMImageryLayerButton>,
          key: 'NEW_OSM_LYR',
        }
      );
    }
    if(defined(layer)) {
      menuProps.items.push(
        {
          label: <Button size="small" type="text" 
                  onClick={()=>alert(`hello, this layer has property 'show' as ${layer.show}`)}
                 > 
                  My Custom Menu Item
                </Button>,
          key: 'MY_CUSTOM_MENU_ITEM',
        }
      );
    }
    return menuProps;
  }, []);

  const onChange = useCallback((e) => {
    const checked = e.target.checked;
    if(checked) {
      setMenuPropsFunc(() => (viewer, layer) => buildCustomContextMenu(viewer, layer));
      console.log('buildCustomContextMenu', buildCustomContextMenu);
    }
    else {
      setMenuPropsFunc(undefined);
    }
  }, [buildCustomContextMenu]);

  const onStart = useCallback((aViewer) => {

    //remove all default imageryLayers
    aViewer.imageryLayers.removeAll();
    // Add Cesium OSM Buildings, a global 3D buildings layer.
    createOsmBuildingsAsync()
    .then((tileset) => {
      aViewer.scene.primitives.add(tileset);
    })
    .catch((error) => {
      console.log(`Error creating tileset: ${error}`);
    });
    // Fly the camera to Dinant, Belgium at the given longitude, latitude, and height.
    aViewer.camera.flyTo(flyOpts);
    //retrieve layer definitions from asset/imageryLayer folder and build layers
    const layerOptions = {
      layers: [...belgiumImageryLayers.layers, ...defaultImageryLayers.layers]
    };
    const layerBuilder = new ImageryLayerBuilder();
    layerBuilder.buildAsync(layerOptions, aViewer.imageryLayers);
    
    setViewer(aViewer);
  }, [])

  return(
      <div style={{display:'flex'}}>
        <CustomViewerWidget options={viewerOpts} onStart={onStart} style={{width:'80%'}}>
         <Checkbox  onChange={onChange} className="react-cesiumext-control" style={{top:4, left:4}}>Custom Context Menu</Checkbox>
        </CustomViewerWidget>
        <ImageryLayerTree viewer={viewer} menuPropsFunc={menuPropsFunc}/>
      </div>
  );
};

<ImageryLayerTreeApp/>
```