An example with the __New Wfs GeoJson DataSource Button__ component.
- This component will create a new Wfs GeoJson Datasource with the capabilities to load data from a Wfs Request.
- Creating the Wfs GeoJson DataSource:
    - Click in the button *New Wf GeoJson DataSource* to create a dataSource:
    - A new window will be show to add the GeoJson attributes. Set the following attributes:
        - In the *Style* tab:
            - keep the default value as it is or change it by your preference.
            - Check in the [Cesium GeoJsonDataSource API doc for more detais](https://cesium.com/learn/ion-sdk/ref-doc/GeoJsonDataSource.html)
        - In the *Resource* tab:
            - Url: https://geoservices.informatievlaanderen.be/overdrachtdiensten/Gebouwenregister/wfs
        - In the *Wfs GetFeature Options* tab:
            - Feature NS: informatievlaanderen.be/Gebouwenregister
            - Feature Prefix: Gebouwenregister
            - Feature Types: Gebouw
            - SRS: EPSG:4326
            - Output Format: application/json
            - Max Features: 2000
            - For the information about these atributes 
              check the [ol/format/WFS.writeGetFeature](https://openlayers.org/en/latest/apidoc/module-ol_format_WFS-WFS.html).
        - In the *General* tab:
            - Name: give any name like for instance, *Building*
            - Show: true
    - Press the submit button and the datasource will be created with all the configuration stored to retrieve the buildings
      through the Wfs service provided by the Belgium government.
- Loading the data into the datasource through a Wfs request:
    - Click in button *Load Data by Polygon* to load the data into the datasource previously created:
        - This button is the component *WfsGetFeatureByPolygonButton* used to send a wfs request based on a polygon provided by the user.
        - Check the section UI Components/button/wfs/WfsGetFeatureByPolygonButton for more details about the usage of this component.
    - Using the left button, click in the viewer to provide the polygon vertices.
    - To finish, provide the last vertex through a double-click.
    - A Wfs request will be sent and all the buildings overlapping the provided polygon will be retrieved.
- Loading the data into the datasource with a custom style through a Wfs request:
    - Click in button *Load Data with Custom Style* to load the data into the datasource with a custom style.
        - This button also is the component *WfsGetFeatureByPolygonButton* and will receive an additional property *onLoad*:
        - the property *OnLoad* will receive the function *onLoadDataWithCustomStyle* to provide a different style:
            - Each building stored in the dataSource will be modified:
                - Each building stores the properties:
                    - GebouwStatus: the status of the building
                    - ObjectId: the unique identification for the building
                - For each building status, it will generated a random color and this color is assigned for the building geometry.
                - Each building will be extruded based on its ObjectId:
                    - As the ObjectId is a big value, we divide by 1000000
    - As previously, indicate the polygon vertices and the buildings will be stored with the new custom style.
```js
import {useState, useCallback} from 'react';
import { Ion, Cartesian3, defined, Color } from "cesium";
import {Input, Button} from 'antd';
import ViewerWidget from '../../../widget/viewer/ViewerWidget/ViewerWidget';
import ButtonControlContainer from '../../../widget/container/ButtonControlContainer/ButtonControlContainer';
import NewWfsGeoJsonDataSourceButton from './NewWfsGeoJsonDataSourceButton';
import WfsGetFeatureByPolygonButton from '../../../button/wfs/WfsGetFeatureByPolygonButton/WfsGetFeatureByPolygonButton';

Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1OGZjNDZkNC1iOTdlLTRhYWMtODBjYy1mNWIzOGEwYjUxNjAiLCJpZCI6MTAzODcsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NTYyODk0MDl9.f13hGNgcrSFUzcocb5CpHD3Im9xzT0c7IDAPcpwGidc';

//the config for camera position and orientation
const flyOpts = {
  destination: Cartesian3.fromDegrees(4.4732578686176545, 50.859531134752565, 1000)
};

const viewerOpts = {
};

const NewWfsGeoJsonDataSourceButtonExample = () => {
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


    const onLoadDataWithCustomStyle = (ds, wfsResponse) => {
        //Get the array of entities
        const entities = ds.entities.values;
        const colorHash = {};
        for (let i = 0; i < entities.length; i++) {
            //For each entity, create a random color based on the state name.
            //Some states have multiple entities, so we store the color in a
            //hash so that we use the same color for the entire state.
            const entity = entities[i];
            const status = entity.properties.GebouwStatus;
            let color = colorHash[status];
            if (!color) {
            color = Color.fromRandom({
                alpha: 1.0,
            });
            colorHash[status] = color;
            }

            //Set the polygon material to our random color.
            entity.polygon.material = color;
            //Remove the outlines.
            entity.polygon.outline = false;

            //Extrude the polygon based on the state's population.  Each entity
            //stores the properties for the GeoJSON feature it was created from
            //Since the population is a huge number, we divide by 50.
            entity.polygon.extrudedHeight = entity.properties.ObjectId / 1000000;
            //fly to datasource entities
            
        }
        viewer && viewer.flyTo(entities);
    }

    return(
        <div style={{display:'flex', height:'500px', width: '100%', flexDirection: 'column', gap:5}}>
            <ViewerWidget options={viewerOpts} onStart={onStart} style={{width:'100%'}}>
                <ButtonControlContainer style={{top:4, left:4}}>
                    <NewWfsGeoJsonDataSourceButton type="primary" viewer={viewer} onNewDataSource={onNewDataSource} disabled={defined(dataSource)}>
                        New Wfs GeoJson DataSource
                    </NewWfsGeoJsonDataSourceButton>
                </ButtonControlContainer>
                <ButtonControlContainer style={{top:48, left:4}}>
                    <WfsGetFeatureByPolygonButton type="primary" viewer={viewer} ds={dataSource} disabled={!defined(dataSource)}>
                        Load Data by Polygon
                    </WfsGetFeatureByPolygonButton>
                </ButtonControlContainer>
                <ButtonControlContainer style={{top:96, left:4}}>
                    <WfsGetFeatureByPolygonButton type="primary" viewer={viewer} ds={dataSource} 
                        disabled={!defined(dataSource)} onLoad={onLoadDataWithCustomStyle}
                    >
                        Load Data by Polygon with Custom Style
                    </WfsGetFeatureByPolygonButton>
                </ButtonControlContainer>
            </ViewerWidget>
        </div>
    );
};

<NewWfsGeoJsonDataSourceButtonExample/>
```