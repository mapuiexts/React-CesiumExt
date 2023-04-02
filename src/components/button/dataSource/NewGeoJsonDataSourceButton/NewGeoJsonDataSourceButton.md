An example with the __New GeoJson DataSource Button__ component.
- In the GeoJsonDataSource it is possible to load GeoJson and TopoJson data.
- Click in the button *New GeoJson DataSource* to create a dataSource:
    - A new window will be show to add the GeoJson attributes
    - Enter the *Name* to give a name to the new datasource in the general tab
    - in the *Style Load Options* tab, change the attributes or accept the default values
        - Check in the [Cesium GeoJsonDataSource API doc for more detais](https://cesium.com/learn/ion-sdk/ref-doc/GeoJsonDataSource.html)
    - Press the submit button and the datasource will be created.
- Click in button *Load Data* to load the data into the datasource
    - this button implements the *onLoadData* method to load some
      data into the datasource.
    - The data is a topojson file named 
      [ne_10m_us_states.topojson](https://mapuiexts.github.io/react-cesiumext.github.io/assets/GeoJson/ne_10m_us_states.topojson) 
      copied from [Cesium repository](https://github.com/CesiumGS/cesium/tree/main/Apps/SampleData).
    - This data contains the *US States* and each state will be stored its population.
- Click in button *Load Data with Custom Style* to load the data into the datasource with a custom style
    - this button implements the *onLoadDataWithCustomStyle* function to load some data into the datasource and update its style:
        -  each state will be extruded based on the states' population:
            - Each cesium entity represented by a *US State* stores the population
            - So, each state will be extruded based on the population.
            - The colors for each state are generated randomly.
```js
import {useState, useCallback} from 'react';
import { Ion, Cartesian3, defined, Color } from "cesium";
import {Input, Button} from 'antd';
import ViewerWidget from '../../../widget/viewer/ViewerWidget/ViewerWidget';
import ButtonControlContainer from '../../../widget/container/ButtonControlContainer/ButtonControlContainer';
import NewGeoJsonDataSourceButton from './NewGeoJsonDataSourceButton';

Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1OGZjNDZkNC1iOTdlLTRhYWMtODBjYy1mNWIzOGEwYjUxNjAiLCJpZCI6MTAzODcsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NTYyODk0MDl9.f13hGNgcrSFUzcocb5CpHD3Im9xzT0c7IDAPcpwGidc';

//the config for camera position and orientation
const flyOpts = {
  destination: Cartesian3.fromDegrees(4.4732578686176545, 50.859531134752565, 20000000)
};

const viewerOpts = {
};

const NewGeoJsonDataSourceButtonExample = () => {
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
        dataSource.entities.removeAll();
        dataSource.load('https://mapuiexts.github.io/react-cesiumext.github.io/assets/GeoJson/ne_10m_us_states.topojson', dataSource._loadOptions).then((ds) => {
            viewer && viewer.flyTo(ds.entities);
            console.log(ds);
        });
    }

    const onLoadDataWithCustomStyle = () => {
        dataSource.entities.removeAll();
        dataSource.load('https://mapuiexts.github.io/react-cesiumext.github.io/assets/GeoJson/ne_10m_us_states.topojson', dataSource._loadOptions)
        .then((ds) => {
            //Get the array of entities
            const entities = ds.entities.values;
            const colorHash = {};
            for (let i = 0; i < entities.length; i++) {
                //For each entity, create a random color based on the state name.
                //Some states have multiple entities, so we store the color in a
                //hash so that we use the same color for the entire state.
                const entity = entities[i];
                const name = entity.name;
                let color = colorHash[name];
                if (!color) {
                color = Color.fromRandom({
                    alpha: 1.0,
                });
                colorHash[name] = color;
                }

                //Set the polygon material to our random color.
                entity.polygon.material = color;
                //Remove the outlines.
                entity.polygon.outline = false;

                //Extrude the polygon based on the state's population.  Each entity
                //stores the properties for the GeoJSON feature it was created from
                //Since the population is a huge number, we divide by 50.
                entity.polygon.extrudedHeight = entity.properties.Population / 50.0;
                //fly to datasource entities
                
            }
            viewer && viewer.flyTo(ds.entities);
            console.log(ds);
        });
    }

    return(
        <div style={{display:'flex', height:'500px', width: '100%', flexDirection: 'column', gap:5}}>
            <ViewerWidget options={viewerOpts} onStart={onStart} style={{width:'100%'}}>
                <ButtonControlContainer style={{top:4, left:4}}>
                    <NewGeoJsonDataSourceButton type="primary" viewer={viewer} onNewDataSource={onNewDataSource} disabled={defined(dataSource)}>
                        New GeoJson DataSource
                    </NewGeoJsonDataSourceButton>
                </ButtonControlContainer>
                <ButtonControlContainer style={{top:48, left:4}}>
                     <Button type="primary" onClick={onLoadData} disabled={!defined(dataSource)}>
                        Load Data
                    </Button>
                </ButtonControlContainer>
                <ButtonControlContainer style={{top:96, left:4}}>
                     <Button type="primary" onClick={onLoadDataWithCustomStyle} disabled={!defined(dataSource)}>
                        Load Data with Custom Style
                    </Button>
                </ButtonControlContainer>
            </ViewerWidget>
        </div>
    );
};

<NewGeoJsonDataSourceButtonExample/>
```