An example with the __Edit Imagery Layer Button__ component.

In the example below, 2 layers were added in the initialization:
- The Bing Imagery Layer from Ion, with attribute *show=true*.
    - This attribute will allow the layer to be shown in the viewer
- The OSM Imagery Layer, with attribute *show=false*.
    - This attribute will allow the layer to be hidden in the viewer.

To visualize only the OSM Layer:
- Set the attribute *show=true* for the OSM layer:
    - Click in the button *Edit OSM Layer*
    - In the new window, in the *General* tab, set *show* as true
    - click in the submit button to update the changes
- Set the attribute *show=false* for the Bing Layer:
    - Click in the button *Edit OSM Layer*
    - In the new window, in the *General* tab, set *show* as true
    - click in the submit button to update the changes

__Remark__: If both layers have attribute *show=true*, they will be active in the viewer,
but only OSM can be visualized:
- As the OSM was the last layer to be added, it will be in the top and will hide all the previously added layers.
- But still you can visualize more than one layer, for instance:
    - Set attribute *show=true* for all the layers
    - click in the button *Edit OSM Layer* and in the *General Tab* set the attribute *alpha = 0.5*:
        - in this case, the OSM will be transparent and the Bing Layer in the Bottom can also be visualized


```js
import {useState, useCallback} from 'react';
import { Ion, Cartesian3, IonImageryProvider, OpenStreetMapImageryProvider, ImageryLayer } from "cesium";
import {Input} from 'antd';
import ViewerWidget from '../../../widget/viewer/ViewerWidget/ViewerWidget';
import ButtonControlContainer from '../../../widget/container/ButtonControlContainer/ButtonControlContainer';
import EditImageryLayerButton from './EditImageryLayerButton';

Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1OGZjNDZkNC1iOTdlLTRhYWMtODBjYy1mNWIzOGEwYjUxNjAiLCJpZCI6MTAzODcsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NTYyODk0MDl9.f13hGNgcrSFUzcocb5CpHD3Im9xzT0c7IDAPcpwGidc';

//the config for camera position and orientation
const flyOpts = {
  destination: Cartesian3.fromDegrees(4.4732578686176545, 50.859531134752565, 20000000)
};

const viewerOpts = {
    timeline: false,
    animation: false,
    baseLayerPicker: false
};

const EditImageryLayerButtonExample = () => {
    const [viewer, setViewer] = useState(null);
    const [osmLayer, setOsmLayer] = useState(null);
    const [bingLayer, setBingLayer] = useState(null);

    const onStart = useCallback((aViewer) => {
        //set camera position
        aViewer.camera.flyTo(flyOpts);
        //remove all the default viewer layers
        aViewer.imageryLayers.removeAll();
        
        //add a bing imagery layer from Ion
        let provider = new IonImageryProvider({ assetId : 3 });
        let layer = new ImageryLayer(provider, {show: true});
        aViewer.imageryLayers.add(layer);
        setBingLayer(layer);
        //add a openstreetmap imagery layer
        provider = new OpenStreetMapImageryProvider({
            url : 'https://a.tile.openstreetmap.org/'
        });
        layer = new ImageryLayer(provider, {show:false});
        aViewer.imageryLayers.add(layer);
        setOsmLayer(layer);

        setViewer(aViewer);
    }, []);

    return(
        <div style={{display:'flex', height:'500px', width: '100%', flexDirection: 'column', gap:5}}>
            <ViewerWidget options={viewerOpts} onStart={onStart} style={{width:'100%'}}>
                <ButtonControlContainer style={{top:4, left:150}}>
                    <EditImageryLayerButton type="primary" layer={bingLayer}>
                        Edit Bing Layer
                    </EditImageryLayerButton>
                </ButtonControlContainer>
                <ButtonControlContainer style={{top:4, left:4}}>
                    <EditImageryLayerButton type="primary" layer={osmLayer}>
                        Edit OSM Layer
                    </EditImageryLayerButton>
                </ButtonControlContainer>
            </ViewerWidget>
        </div>
    );
};

<EditImageryLayerButtonExample/>
```