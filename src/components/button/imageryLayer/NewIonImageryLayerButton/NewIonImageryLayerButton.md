
An example with the __New Ion Imagery Layer Button__ component.
The [Ion](https://cesium.com/ion) is a cloud platform provided by the Cesium team on which you can have a free and a comercial solution.
So, you can store in Ion different assets like imagery layers, terrain models, 3D models, 3D tiles, etc.).
Additionally, Ion provides default assets like some imagery layers. So, we will use it on this example.

__Remark__: To develop your application, if still you have not created your account in [Ion](https://cesium.com/ion), 
please, do it and generate your token. In the example I am using my temporary token from my account and it should not work in the future.

To show a imagery layer present in Ion, follow the instructions:
- Click in the button *New Ion Layer*
- In the new window, add the parameters to create the WMS layer:
    - In the *General* Tab:
        - in the title field, give any name for the layer or accepts the default one.
        - keep all the remaining default fields as it is (or change it to have a different visualization).
        - check the [Cesium Imagery Layer documentation](https://cesium.com/learn/ion-sdk/ref-doc/ImageryLayer.html) for details about remaining fields.
    - In the *Provider* Tab:
        - in the *Asset ID* field, provides the asset id for the imagery layer present in Ion (for instance, 3)
            - in the [Ion web page](https://cesium.com/ion), click in the tab "My Assets" to list all the present asset ids in your account.
            - Some default asset ids for imagery layers present in Ion:
                - Asset ID = 2: Bing Maps Aerial
                - Asset ID = 3: Bing Maps Aerial with Labels
                - Asset ID = 4: Bing Maps Road
        - in the *Access Token* field set your token, if you have it. If not, give the temporary one provided in example code below. 
        - keep all the remaining default fields as it is
        - check the [Cesium Ion Imagery Provider documentation](https://cesium.com/learn/ion-sdk/ref-doc/IonImageryProvider.html) for details about remaining fields.

```js
import {useState, useCallback} from 'react';
import { Ion, Cartesian3, Math } from "cesium";
import {Input} from 'antd';
import ViewerWidget from '../../../widget/viewer/ViewerWidget/ViewerWidget';
import ButtonControlContainer from '../../../widget/container/ButtonControlContainer/ButtonControlContainer';
import NewIonImageryLayerButton from './NewIonImageryLayerButton';

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

const NewIonImageryLayerButtonExample = () => {
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
                    <NewIonImageryLayerButton type="primary" viewer={viewer}>
                        New Ion Layer
                    </NewIonImageryLayerButton>
                </ButtonControlContainer>
            </ViewerWidget>
        </div>
    );
};

<NewIonImageryLayerButtonExample/>
```