This Example shows the creation of a simple __Custom Viewer Widget__.

The component __ButtonControlContainer__ is used to set the position of
the button in the viewport and set its size.


```js
import CustomViewerWidget from './CustomViewerWidget';
import { Ion, createWorldTerrain, createOsmBuildings, Cartesian3, Math } from "cesium";
import ButtonControlContainer from '../../container/ButtonControlContainer/ButtonControlContainer';
import 'cesium/Widgets/widgets.css';
import '../../../../assets/css/react-cesiumext-controls.css';

Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1OGZjNDZkNC1iOTdlLTRhYWMtODBjYy1mNWIzOGEwYjUxNjAiLCJpZCI6MTAzODcsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NTYyODk0MDl9.f13hGNgcrSFUzcocb5CpHD3Im9xzT0c7IDAPcpwGidc';

const CustomViewerWidgetExample = () => {
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
        terrainProvider: createWorldTerrain()
    };

    return (
      <CustomViewerWidget options={viewerOpts} onStart={onStart}>
        <ButtonControlContainer style={{top:0, left:0, width:64, height:32}}>
            <button onClick={()=> alert('hello')} >Hello</button>
        </ButtonControlContainer>
        <ButtonControlContainer style={{top:0, left:64, width:64, height:32}}>
            <button onClick={()=> alert('hello')} >Hello</button>
        </ButtonControlContainer>
        <ButtonControlContainer style={{top:32, left:0, width:64, height:32}}>
            <button onClick={()=> alert('hello')} >Hello</button>
        </ButtonControlContainer>
      </CustomViewerWidget>
    );
};

<CustomViewerWidgetExample/>

```