This Example shows the usage of a __DataSource Tree__ component.
- On this example, the DataSource Tree is located in the right side.
- Click on the root tree *DataSources* to expand all the nodes:
  - It will show all the DataSources present in the viewer.
- If you check/uncheck a checkbox for a particular layer, this layer will be visible/invisible in the viewer.
- A default context menu will be shown if you click in a particular tree node. 
  Just right click in any node in the tree view to visualize it.
  The following options are available in the default menu context:
  - menu options with button components to create a new datasource if user right-click in the *ROOT* node
    - New GeoJson DataSource: check the button component in the section UI Components/button/dataSource/NewGeoJsonDataSourceButton
    - New Wfs GeoJson DataSource: check the button component in the section UI Components/button/dataSource/NewWfsGeoJsonDataSourceButton
    - New Czml DataSource: check the button component in the section UI Components/button/dataSource/NewCzmlDataSourceButton
    - New Gpx DataSource: check the button component in the section UI Components/button/dataSource/NewGPxDataSourceButton
  - menu option to interact with a particular dataSource if user right-click in any dataSource node.
  - remove a existing layer if user right-click in the imagery layer node. 
  - To check how these components work, check in our api documentation
    under the folder: [UI Components/Button/dataSource](#/UI%20Components/button/dataSource)
- On this example, if you click in the check box *Custom Context Menu*, a custom context menu will be available:
  - the function *buildCustomContextMenu* to build the new context menu is set in the *ImageryLayerTree*
    component through its property named *menuPropsFunc*. So, this custom context menu will have the following behaviour:
      - if user right-click in the root node, only the option to create a OSM layer will be available.
      - if user right-click in the imagery layer node, only a custom menu item will be available.
```js
import { useCallback, useState } from 'react';
import {Checkbox, Button} from 'antd';
import {Ion, createWorldTerrain, createOsmBuildings, Cartesian3, Math, defined, 
        CzmlDataSource, GeoJsonDataSource, GpxDataSource
} from "cesium";
import ViewerWidget from '../../../widget/viewer/ViewerWidget/ViewerWidget';
import ButtonControlContainer from '../../../widget/container/ButtonControlContainer/ButtonControlContainer';
import NewOSMImageryLayerButton from '../../../button/imageryLayer/NewOSMImageryLayerButton/NewOSMImageryLayerButton';
import DataSourceTree from '../../../tree/dataSource/DataSourceTree/DataSourceTree';
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
  terrainProvider: createWorldTerrain({
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

const createCzmlDataSource = (viewer) => {
    let ds = new CzmlDataSource ();
    ds.load('https://mapuiexts.github.io/react-cesiumext.github.io/assets/Czml/simple.czml')
    .then(dataSource => {
        viewer.dataSources.add(dataSource);
    })
    .catch(error => {
        console.log(error);
    });
};

const createGpxDataSource = (viewer) => {
    let ds = new GpxDataSource ();
    ds.load('https://mapuiexts.github.io/react-cesiumext.github.io/assets/Gpx/complexTrk.gpx')
    .then(dataSource => {
        viewer.dataSources.add(dataSource);
    })
    .catch(error => {
        console.log(error);
    });
};

const createGeoJsonDataSource = (viewer) => {
    let ds = new GeoJsonDataSource('US States');
    ds.load('https://mapuiexts.github.io/react-cesiumext.github.io/assets/GeoJson/ne_10m_us_states.topojson')
    .then(dataSource => {
        viewer.dataSources.add(dataSource);
    })
    .catch(error => {
        console.log(error);
    });
}

//our app having the ImageryLayer Tree component
const DataSourceTreeApp = () => {
  const [viewer, setViewer] = useState(null);
  const [menuPropsFunc, setMenuPropsFunc] = useState();

  const onStart = useCallback((aViewer) => {
    //create CZML dataSource
    createCzmlDataSource(aViewer);
    //create Gpx dataSource
    createGpxDataSource(aViewer);
    //create GeoJson DataSource
    createGeoJsonDataSource(aViewer);
    // Add Cesium OSM Buildings, a global 3D buildings layer.
    aViewer.scene.primitives.add(createOsmBuildings());   
    // Fly the camera to Dinant, Belgium at the given longitude, latitude, and height.
    aViewer.camera.flyTo(flyOpts);
    
    setViewer(aViewer);
  }, [])

  const buildCustomContextMenu = useCallback((viewer, ds) => {
    const menuProps = {items:[]};
    //add a menu option to create a OSM layer in the root node
    // if(!defined(ds)) {
    //   menuProps.items.push(
    //     {
    //       label: <NewOSMImageryLayerButton size="small" type="text" viewer={viewer}>New OSM Layer</NewOSMImageryLayerButton>,
    //       key: 'NEW_OSM_LYR',
    //     }
    //   );
    // }
    if(defined(ds)) {
      menuProps.items.push(
        {
          label: <Button size="small" type="text" 
                  onClick={()=>alert(`hello, this dataSource has property 'show' as ${ds.show}`)}
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

  

  return(
      <div style={{display:'flex'}}>
        <ViewerWidget options={viewerOpts} onStart={onStart} style={{width:'80%'}}>
          <ButtonControlContainer style={{top:4, left:4}}>
            <Checkbox onChange={onChange}>Custom Context Menu</Checkbox>
         </ButtonControlContainer>
        </ViewerWidget>
        <DataSourceTree viewer={viewer} menuPropsFunc={menuPropsFunc}/>
      </div>
  );
};

<DataSourceTreeApp/>
```