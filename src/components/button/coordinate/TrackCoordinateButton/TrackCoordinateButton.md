An example with the __Track Coordinate Button__ component.

```js
import {useState, useCallback} from 'react';
import { Ion, Cartesian3 } from "cesium";
import {Input} from 'antd';
import ViewerWidget from '../../../widget/viewer/ViewerWidget/ViewerWidget';
import TrackCoordinateButton from './TrackCoordinateButton';

Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1OGZjNDZkNC1iOTdlLTRhYWMtODBjYy1mNWIzOGEwYjUxNjAiLCJpZCI6MTAzODcsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NTYyODk0MDl9.f13hGNgcrSFUzcocb5CpHD3Im9xzT0c7IDAPcpwGidc';

//the config for camera position and orientation
const flyOpts = {
  destination: Cartesian3.fromDegrees(4.4732578686176545, 50.859531134752565, 800000)
};

const viewerOpts = {
    timeline: false,
    animation: false
};

const TrackCoordinateExample = () => {
    const [viewer, setViewer] = useState(null);

    const onStart = useCallback((aViewer) => {
        //set camera position
        aViewer.camera.flyTo(flyOpts);
        setViewer(aViewer);
    }, []);


    return(
        <div style={{display:'flex', height:'500px', width: '100%', flexDirection: 'column', gap:5}}>
            <TrackCoordinateButton 
                type="primary" 
                style={{width:'30%'}} 
                viewer={viewer}
            >
                Track Coordinate
            </TrackCoordinateButton>
            <ViewerWidget options={viewerOpts} onStart={onStart} style={{width:'100%'}}/>
        </div>
    );
};

<TrackCoordinateExample/>
```