This Example shows the creation of a simple __Viewer Widget__.

```js
import {useCallback, useState, useMemo} from 'react';
import ViewerWidget from './ViewerWidget';
import AboutButton from '../../../button/common/AboutButton/AboutButton';
import {Button, Layout} from 'antd';
import { Ion, defined, Cartesian3, Math, GoogleMaps, createGooglePhotorealistic3DTileset } from 'cesium';
import 'cesium/Widgets/widgets.css'
import '../../../../assets/css/react-cesiumext-controls.css';
const { Content } = Layout;

//register and get your own key for CesiumJs Ion
Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1OGZjNDZkNC1iOTdlLTRhYWMtODBjYy1mNWIzOGEwYjUxNjAiLCJpZCI6MTAzODcsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NTYyODk0MDl9.f13hGNgcrSFUzcocb5CpHD3Im9xzT0c7IDAPcpwGidc';

//this api key is only valid for this application. Create your own googleMaps api key
GoogleMaps.defaultApiKey = 'AIzaSyBzf8jvuiGJR0x7q2eqaILi4FzKwAq8xXA';

const ViewerWidgetExample = () => {
   
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
        //Add Google Photorealistic 3D Tileset
        createGooglePhotorealistic3DTileset()
        .then((tileset) => {
            if(defined(aViewer) && !aViewer.isDestroyed()) {
                aViewer.scene.primitives.add(tileset);
                console.log('tileset added');
            }
        })
        .catch((error) => {
            console.log(`Error creating tileset: ${error}`);
        }); 

        // Flying the camera near to Proximus Tower, Belgium ... 
        // and maybe u can find me there :-)
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
        <Layout>
            <Content>
                <ViewerWidget options={viewerOpts} onStart={onStart}>
                    <AboutButton className="react-cesiumext-control" style={{top:4, left:4}}/>
                </ViewerWidget>
            </Content>
        </Layout>
    );
}

<ViewerWidgetExample/>
```