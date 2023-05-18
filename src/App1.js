import {useCallback, useState, useMemo} from 'react';
import ViewerWidget from './components/widget/viewer/ViewerWidget/ViewerWidget'
import AboutButton from './components/button/common/AboutButton/AboutButton';	
import { Ion, defined, Cartesian3, Math, GoogleMaps, createGooglePhotorealistic3DTileset } from 'cesium';
import './assets/css/react-cesiumext-controls.css';

Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1OGZjNDZkNC1iOTdlLTRhYWMtODBjYy1mNWIzOGEwYjUxNjAiLCJpZCI6MTAzODcsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NTYyODk0MDl9.f13hGNgcrSFUzcocb5CpHD3Im9xzT0c7IDAPcpwGidc';

GoogleMaps.defaultApiKey = 'your google api key';

const App1 = () => {
   
    console.log('GoogleMaps.mapTilesApiEndpoint', GoogleMaps.mapTilesApiEndpoint);
    const [viewer, setViewer] = useState(null);

    const viewerOpts = useMemo(() => {
        return {
            timeline: false,
            animation: false
        };
    }, []);

    const onStart = useCallback((aViewer) => {
        console.log(aViewer);
        aViewer.scene.globe.show = false;
        // Add Google Photorealistic 3D Tileset
        createGooglePhotorealistic3DTileset()
        .then((tileset) => {
            if(defined(aViewer) && !aViewer.isDestroyed()) {
                aViewer.scene.primitives.add(tileset);
                console.log('tileset added');
            }
            else {
                console.log('tileset not added');
            }
        })
        .catch((error) => {
            console.log(`Error creating tileset: ${error}`);
        }); 

        // Fly the camera to San Francisco at the given longitude, latitude, and height.
        aViewer.camera.flyTo({
            destination : Cartesian3.fromDegrees(4.358948, 50.859114, 200),
            orientation : {
                heading : Math.toRadians(0.0),
                pitch : Math.toRadians(-5.0)
            }
        });
        setViewer(aViewer);
    }, []);
    
    return (
      <ViewerWidget options={viewerOpts} onStart={onStart}>
        <AboutButton className="react-cesiumext-control" style={{top:4, left:4}}/>
      </ViewerWidget>
    );
};
export default App1;