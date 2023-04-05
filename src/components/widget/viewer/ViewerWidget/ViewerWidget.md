This Example shows the creation of a simple __Viewer Widget__.


```js
import ViewerWidget from './ViewerWidget';
import { Ion, createWorldTerrain, createOsmBuildings, Cartesian3, Math } from "cesium";
import 'cesium/Widgets/widgets.css';

Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1OGZjNDZkNC1iOTdlLTRhYWMtODBjYy1mNWIzOGEwYjUxNjAiLCJpZCI6MTAzODcsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NTYyODk0MDl9.f13hGNgcrSFUzcocb5CpHD3Im9xzT0c7IDAPcpwGidc';

const ViewerWidgetExample = () => {
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
    };
    const viewerOpts = {
        terrainProvider: createWorldTerrain(),
        timeline: false,
        animation: false
    };

    return (
      <ViewerWidget options={viewerOpts} onStart={onStart}/>
    );
}

<ViewerWidgetExample/>

```