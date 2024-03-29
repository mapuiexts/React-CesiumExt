This Example shows the creation of a simple __Custom Viewer Widget__.



```js
import CustomViewerWidget from './CustomViewerWidget';
import AboutButton from '../../../button/common/AboutButton/AboutButton';
import { Ion, createWorldTerrain, Cartesian3, Math, Cesium3DTileset } from "cesium";
import ButtonControlContainer from '../../container/ButtonControlContainer/ButtonControlContainer';
import '../../../../assets/css/react-cesiumext-controls.css';

Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1OGZjNDZkNC1iOTdlLTRhYWMtODBjYy1mNWIzOGEwYjUxNjAiLCJpZCI6MTAzODcsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NTYyODk0MDl9.f13hGNgcrSFUzcocb5CpHD3Im9xzT0c7IDAPcpwGidc';

const CustomViewerWidgetExample = () => {
    const onStart = (viewer) => {
        //enable depth test so things behind terrain will disapear.
        viewer.scene.globe.depthTestAgainstTerrain = true;
        // Add Buildings for Grand Place/Belgium.
        viewer.scene.primitives.add(
            new Cesium3DTileset({
                url: 'https://mapuiexts.github.io/react-cesiumext.github.io/assets/3D_Tiles/UrbAdm3D_148170_3DTILES/tileset/tileset.json',
                backFaceCulling: false
            })
        ); 
        // Fly the camera to San Francisco at the given longitude, latitude, and height.
        viewer.camera.flyTo({
            destination : Cartesian3.fromDegrees( 4.3524312269858, 50.84678117753969, 100),
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
        <AboutButton className="react-cesiumext-control" style={{top:4, left:4}}/>
      </CustomViewerWidget>
    );
};

<CustomViewerWidgetExample/>

```