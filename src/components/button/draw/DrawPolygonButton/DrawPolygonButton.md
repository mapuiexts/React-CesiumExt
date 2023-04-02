An example with the __Draw Polygon Button__ component.
- If the __*min number of vertex positions*__ are not provided, the default will be 3.
- If the __*max number of vertex positions*__ are not provided:
    - It means that the user can draw any number of vertices.
    - To finish, the user has to double-click in the last vertex.

```js
import {useState, useCallback} from 'react';
import { Ion, Cartesian3 } from "cesium";
import {Button, InputNumber} from 'antd';
import ViewerWidget from '../../../widget/viewer/ViewerWidget/ViewerWidget';
import DrawPolygonButton from './DrawPolygonButton';

Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1OGZjNDZkNC1iOTdlLTRhYWMtODBjYy1mNWIzOGEwYjUxNjAiLCJpZCI6MTAzODcsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NTYyODk0MDl9.f13hGNgcrSFUzcocb5CpHD3Im9xzT0c7IDAPcpwGidc';

//the config for camera position and orientation
const flyOpts = {
  destination: Cartesian3.fromDegrees(4.4732578686176545, 50.859531134752565, 800000)
};

const viewerOpts = {
    timeline: false,
    animation: false,
    infoBox: false,
    selectionIndicator: false
};

const DrawPolygonExample = () => {
    const [viewer, setViewer] = useState(null);
    const [minNumberOfPositions, setMinNumberOfPositions] = useState(null);
    const [maxNumberOfPositions, setMaxNumberOfPositions] = useState(null);

    const onStart = useCallback((aViewer) => {
        //set camera position
        aViewer.camera.flyTo(flyOpts);
        setViewer(aViewer);
    }, []);

    const onDrawStarted = useCallback((entity) => {
        console.log('draw interaction started!!!');
    }, [viewer]);

    const onDrawAborted = useCallback((entity) => {
        console.log('draw interaction aborted!!!');
    }, [viewer]);

    const onDrawEnded = useCallback((entity) => {
        console.log('draw interaction ended!!!', entity);
        viewer.entities.add(entity);
    }, [viewer]);

    const onChangeMinNumberOfPositions = useCallback((value) => {
        setMinNumberOfPositions(value);
    }, [viewer]);
    
    const onChangeMaxNumberOfPositions = useCallback((value) => {
        setMaxNumberOfPositions(value);
    }, [viewer]);


    return(
        <div style={{display:'flex', height:'500px', width: '100%', flexDirection: 'column', gap:5}}>
            <div style={{display:'flex', flexDirection:'row', gap:5}}>
                <DrawPolygonButton 
                    type="primary" 
                    style={{width:'20%'}} 
                    viewer={viewer}
                    minNumberOfPositions={minNumberOfPositions}
                    maxNumberOfPositions={maxNumberOfPositions}
                    onDrawEnded={onDrawEnded}
                    onDrawStarted={onDrawStarted}
                    onDrawAborted={onDrawAborted}
                >
                    Draw Polygon
                </DrawPolygonButton>
                <InputNumber style={{width:'40%'}} placeholder="Min number of positions" value={minNumberOfPositions} onChange={onChangeMinNumberOfPositions}/>
                <InputNumber style={{width:'40%'}} placeholder="Max number of positions" value={maxNumberOfPositions} onChange={onChangeMaxNumberOfPositions}/>
            </div>
            <ViewerWidget options={viewerOpts} onStart={onStart} style={{width:'100%'}}/>
        </div>
    );
};

<DrawPolygonExample/>
```