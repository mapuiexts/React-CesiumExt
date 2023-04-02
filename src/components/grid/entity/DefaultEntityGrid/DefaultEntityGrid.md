The following functionalities are present in the __Default Entity Grid__:
- If the entity is selected in the grid, it will be highlighted in the map
- Multiple selection is possible by default holding the shift key and selecting the rows in the grid
    - If you need a single selection, set the value "single" for the property *rowSelection*
- If the Cesium entity property is changed, the result is reflected in the grid
    - See the result after clicking in the "Change Name" button


```js
import {useState, useCallback} from 'react';
import { Ion, Cartesian3, Math, GeoJsonDataSource, Color, defined, JulianDate } from "cesium";
import {Button} from 'antd';
import DefaultEntityGrid from './DefaultEntityGrid';
import ViewerWidget from '../../../widget/viewer/ViewerWidget/ViewerWidget';
import belgiumProvinces from '../../../../assets/data/geojson/belgium-provinces-wgs84.json';
import 'cesium/Widgets/widgets.css';

Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1OGZjNDZkNC1iOTdlLTRhYWMtODBjYy1mNWIzOGEwYjUxNjAiLCJpZCI6MTAzODcsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NTYyODk0MDl9.f13hGNgcrSFUzcocb5CpHD3Im9xzT0c7IDAPcpwGidc';

//the config for camera position and orientation
const flyOpts = {
  destination: Cartesian3.fromDegrees(4.4732578686176545, 50.859531134752565, 800000)
};

const viewerOpts = {
    timeline: false,
    animation: false
};

const DefaultEntityGridExample = () => {
    const [viewer, setViewer] = useState(null);
    const [dataSource, setDataSource] = useState(null);
    const [selectedEntities, setSelectedEntities] = useState([]);

    const onStart = useCallback((aViewer) => {
        //create geojson datasource
        aViewer.dataSources.add(GeoJsonDataSource.load(belgiumProvinces, {
            stroke: Color.RED,
            fill: Color.BLUE.withAlpha(0.3),
            strokeWidth: 2,
        })).then((ds => {
            console.log(ds);
            setDataSource(ds);
        }));
        //set camera position
        aViewer.camera.flyTo(flyOpts);
        setViewer(aViewer);
        
    }, []);


   const onEntitySelectionChanged = useCallback((entities) => {
        entities.forEach((entity) => {
            console.log('selected entity :', entity);
        });
        setSelectedEntities(entities);
    }, []);

    const changeNameHandler = useCallback(() => {
        selectedEntities.forEach((entity) => {
            const oldName = entity.properties.NAME.getValue(JulianDate.now());
            const newName = oldName + 'X';
            entity.properties.NAME.setValue(newName);
            console.log(`name changed from ${oldName} to ${newName}`);
        });
        
    }, [selectedEntities]);

    return(
        <div style={{display:'flex', height:'500px', width: '100%', flexDirection: 'column', gap:5}}>
            <Button type="primary" 
                    style={{width:'30%'}} 
                    onClick={changeNameHandler}
                    disabled = {selectedEntities.length === 0}
            >
                Change Name
            </Button>
            <ViewerWidget options={viewerOpts} onStart={onStart} style={{height: '60%', width:'100%'}}/>
            <div style={{height:'40%'}}>
                {viewer && dataSource &&
                    <DefaultEntityGrid viewer={viewer} ds={dataSource} onEntitySelectionChanged={onEntitySelectionChanged}/>
                }
            </div>
        </div>
    );
}
<DefaultEntityGridExample/>
```