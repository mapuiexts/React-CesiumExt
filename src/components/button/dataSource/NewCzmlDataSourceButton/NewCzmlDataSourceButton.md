An example with the __New Czml DataSource Button__ component:
- Click in the button *New Czml DataSource* to create a dataSource:
    - A new window will be show to add the Czml attributes
    - Enter the *Name* to give a name to the new datasource
    - Press the submit button and the datasource will be created.
- Click in button *Load Data* to load the data into the datasource
    - this button implements the *onLoadData* method to load some
      data into the datasource.
    - The data is a czml file named [simple.czml](https://mapuiexts.github.io/react-cesiumext.github.io/assets/Czml/simple.czml) 
      copied from [Cesium repository](https://github.com/CesiumGS/cesium/tree/main/Apps/SampleData).


```js
import {useState, useCallback} from 'react';
import { Ion, Cartesian3, defined } from "cesium";
import {Input, Button} from 'antd';
import ViewerWidget from '../../../widget/viewer/ViewerWidget/ViewerWidget';
import ButtonControlContainer from '../../../widget/container/ButtonControlContainer/ButtonControlContainer';
import NewCzmlDataSourceButton from './NewCzmlDataSourceButton';

Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1OGZjNDZkNC1iOTdlLTRhYWMtODBjYy1mNWIzOGEwYjUxNjAiLCJpZCI6MTAzODcsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NTYyODk0MDl9.f13hGNgcrSFUzcocb5CpHD3Im9xzT0c7IDAPcpwGidc';

//the config for camera position and orientation
const flyOpts = {
  destination: Cartesian3.fromDegrees(4.4732578686176545, 50.859531134752565, 20000000)
};

const viewerOpts = {
    timeline: false,
    animation: false,
    baseLayerPicker: false,
    shouldAnimate: true,
};

const NewCzmlDataSourceButtonExample = () => {
    const [viewer, setViewer] = useState(null);
    const [dataSource, setDataSource] = useState(null);

    const onStart = useCallback((aViewer) => {
        //set camera position
        aViewer.camera.flyTo(flyOpts);
        //remove all the viewer layers
        //aViewer.imageryLayers.removeAll();
        setViewer(aViewer);
    }, []);

    const onNewDataSource = (ds) => {
        setDataSource(ds);
    }

    const onLoadData = () => {
        dataSource.load('https://mapuiexts.github.io/react-cesiumext.github.io/assets/Czml/simple.czml').then((ds) => {
            viewer && viewer.flyTo(ds.entities);
        });
    }

    return(
        <div style={{display:'flex', height:'500px', width: '100%', flexDirection: 'column', gap:5}}>
            <ViewerWidget options={viewerOpts} onStart={onStart} style={{width:'100%'}}>
                <ButtonControlContainer style={{top:4, left:4}}>
                    <NewCzmlDataSourceButton type="primary" viewer={viewer} onNewDataSource={onNewDataSource} disabled={defined(dataSource)}>
                        New Czml DataSource
                    </NewCzmlDataSourceButton>
                </ButtonControlContainer>
                <ButtonControlContainer style={{top:48, left:4}}>
                     <Button type="primary" onClick={onLoadData} disabled={!defined(dataSource)}>
                        Load Data
                    </Button>
                </ButtonControlContainer>
            </ViewerWidget>
        </div>
    );
};

<NewCzmlDataSourceButtonExample/>
```