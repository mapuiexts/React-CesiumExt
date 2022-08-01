import {Button} from 'antd';
import { Ion, createWorldTerrain, createOsmBuildings, Cartesian3, Math } from "cesium";
import ViewerWidget from './components/widget/viewer/ViewerWidget/ViewerWidget';

import 'antd/dist/antd.min.css'; //https://github.com/ant-design/ant-design/issues/33327
import 'cesium/Widgets/widgets.css';
import './App.css';


// Your access token can be found at: https://cesium.com/ion/tokens.
// This is a temporary default access token
Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1OGZjNDZkNC1iOTdlLTRhYWMtODBjYy1mNWIzOGEwYjUxNjAiLCJpZCI6MTAzODcsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NTYyODk0MDl9.f13hGNgcrSFUzcocb5CpHD3Im9xzT0c7IDAPcpwGidc';


const viewerOpts = {
  terrainProvider: createWorldTerrain()
}

function App() {
  const onStart = (viewer) => {
    console.log(viewer);
    // Add Cesium OSM Buildings, a global 3D buildings layer.
    viewer.scene.primitives.add(createOsmBuildings());   
    // Fly the camera to San Francisco at the given longitude, latitude, and height.
    viewer.camera.flyTo({
      destination : Cartesian3.fromDegrees(-122.4175, 37.655, 400),
      orientation : {
          heading : Math.toRadians(0.0),
          pitch : Math.toRadians(-15.0),
      }
      });
  }
  return (
    <div className="App">
      <Button type="primary" onClick={() => alert('hello cesium')}>Hello</Button>
      <ViewerWidget options={viewerOpts} onStart={onStart}/>
    </div>
  );
}

export default App;
