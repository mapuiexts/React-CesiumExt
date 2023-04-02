An example with the __New WebMapService Imagery Layer Button__ component.
To create a WMS layer provided by the Belgium Flemish government, follow the instructions:
- Click in the button *New WMS Layer*
- In the new window, add the parameters to create the WMS layer:
    - In the *General* Tab:
        - in the title field, give any name for the layer as, for instance, "Belgium Flemish Region".
        - keep all the remaining default fields as it is (or change it to have a different visualization).
        - check the [Cesium Imagery Layer documentation](https://cesium.com/learn/ion-sdk/ref-doc/ImageryLayer.html) for details about remaining fields.
    - In the *Provider* Tab:
        - in the *URL* field set *https://geoservices.informatievlaanderen.be/raadpleegdiensten/GRB-selectie/wms*
            - this is the URL for the WMS service provided by the belgium flemish government
        - in the *Layers* field set *GRB_BSK*
            - this is the layer name for the base map provided by the belgium flemish government 
        - keep all the remaining default fields as it is
        - check the [Cesium WMS Imagery Layer Provider documentation](https://cesium.com/learn/ion-sdk/ref-doc/WebMapServiceImageryProvider.html) for details about remaining fields.

```js
import {useState, useCallback} from 'react';
import { Ion, Cartesian3, Math } from "cesium";
import {Input} from 'antd';
import ViewerWidget from '../../../widget/viewer/ViewerWidget/ViewerWidget';
import ButtonControlContainer from '../../../widget/container/ButtonControlContainer/ButtonControlContainer';
import NewWmsImageryLayerButton from './NewWmsImageryLayerButton';

Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1OGZjNDZkNC1iOTdlLTRhYWMtODBjYy1mNWIzOGEwYjUxNjAiLCJpZCI6MTAzODcsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NTYyODk0MDl9.f13hGNgcrSFUzcocb5CpHD3Im9xzT0c7IDAPcpwGidc';

//the config for camera position and orientation
const flyOpts = {
  destination: Cartesian3.fromDegrees(4.4732578686176545, 50.859531134752565, 1000),
  orientation : {
    heading : Math.toRadians(0.0),
    pitch : Math.toRadians(-15.0),
  }
};

const viewerOpts = {
    timeline: false,
    animation: false,
    baseLayerPicker: false
};

const NewWmsButtonExample = () => {
    const [viewer, setViewer] = useState(null);

    const onStart = useCallback((aViewer) => {
        //set camera position
        aViewer.camera.flyTo(flyOpts);
        //remove all the viewer layers
        aViewer.imageryLayers.removeAll();
        setViewer(aViewer);
    }, []);

    return(
        <div style={{display:'flex', height:'500px', width: '100%', flexDirection: 'column', gap:5}}>
            <ViewerWidget options={viewerOpts} onStart={onStart} style={{width:'100%'}}>
                <ButtonControlContainer style={{top:0, left:0}}>
                    <NewWmsImageryLayerButton type="primary" viewer={viewer}>
                        New Wms Layer
                    </NewWmsImageryLayerButton>
                </ButtonControlContainer>
            </ViewerWidget>
        </div>
    );
};

<NewWmsButtonExample/>
```