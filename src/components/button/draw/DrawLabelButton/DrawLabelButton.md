An example with the __Draw Label Button__ component.

```js
import {useState, useCallback} from 'react';
import { Ion, Cartesian3 } from "cesium";
import {Button, Input} from 'antd';
import ViewerWidget from '../../../widget/viewer/ViewerWidget/ViewerWidget';
import DrawLabelButton from './DrawLabelButton';

Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1OGZjNDZkNC1iOTdlLTRhYWMtODBjYy1mNWIzOGEwYjUxNjAiLCJpZCI6MTAzODcsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NTYyODk0MDl9.f13hGNgcrSFUzcocb5CpHD3Im9xzT0c7IDAPcpwGidc';

//the config for camera position and orientation
const flyOpts = {
  destination: Cartesian3.fromDegrees(4.4732578686176545, 50.859531134752565, 800000)
};

const viewerOpts = {
    timeline: false,
    animation: false
};

const DrawLabelExample = () => {
    const [viewer, setViewer] = useState(null);
    const [label, setLabel] = useState("React-CesiumExt");

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
        console.log('draw interaction ended!!!');
        viewer.entities.add(entity);
    }, [viewer]);

    const onChangeLabel = useCallback((event) => {
        setLabel(event.target.value);
    }, [viewer]);


    return(
        <div style={{display:'flex', height:'500px', width: '100%', flexDirection: 'column', gap:5}}>
            <div style={{display:'flex', flexDirection:'row', gap:5}}>
                <DrawLabelButton 
                    type="primary" 
                    style={{width:'30%'}} 
                    viewer={viewer}
                    text={label}
                    onDrawEnded={onDrawEnded}
                    onDrawStarted={onDrawStarted}
                    onDrawAborted={onDrawAborted}
                >
                    Draw Label
                </DrawLabelButton>
                <Input placeholder="label" value={label} onChange={onChangeLabel}/>
            </div>
            <ViewerWidget options={viewerOpts} onStart={onStart} style={{width:'100%'}}/>
        </div>
    );
};

<DrawLabelExample/>
```