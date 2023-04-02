An example with the __Remove Imagery Layer Button__ component.

In the example below, 2 layers were added in the initialization:
- The Bing Imagery Layer from Ion, with attribute *show=true*.
    - This attribute will allow the layer to be shown in the viewer
- The OSM Imagery Layer, with attribute *show=true*.
    - This attribute will allow the layer to be hidden in the viewer.
- The two layers are activated but only the OSM layer is visible, because it is on the top.
    - The OSM layer in the example below was the last to be added. So it is on the top.


```js
import {useState, useCallback} from 'react';
import { Ion, Cartesian3, IonImageryProvider, OpenStreetMapImageryProvider, ImageryLayer, defined } from "cesium";
import {Input, Spin} from 'antd';
import ViewerWidget from '../../../widget/viewer/ViewerWidget/ViewerWidget';
import ButtonControlContainer from '../../../widget/container/ButtonControlContainer/ButtonControlContainer';
import RemoveImageryLayerButton from './RemoveImageryLayerButton';

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

const RemoveImageryLayerButtonExample = () => {
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
        layer = new ImageryLayer(provider, {show:true});
        aViewer.imageryLayers.add(layer);
        setOsmLayer(layer);

        setViewer(aViewer);
    }, []);

    const imageryLayers = defined(viewer) ? viewer.imageryLayers : null;

    return(
        <div style={{display:'flex', height:'500px', width: '100%', flexDirection: 'column', gap:5}}>
            <ViewerWidget options={viewerOpts} onStart={onStart} style={{width:'100%'}}>
                <ButtonControlContainer style={{top:4, left:180}}>
                    <RemoveImageryLayerButton type="primary" 
                        layer={bingLayer} 
                        imageryLayers={imageryLayers} 
                        onRemove={()=>setBingLayer(null)}
                        disabled={!defined(bingLayer)}
                    >
                        Remove Bing Layer
                    </RemoveImageryLayerButton>
                </ButtonControlContainer>
                <ButtonControlContainer style={{top:4, left:4}}>
                    <RemoveImageryLayerButton type="primary" 
                        layer={osmLayer} 
                        imageryLayers={imageryLayers} 
                        onRemove={()=>setOsmLayer(null)}
                        disabled={!defined(osmLayer)}
                    >
                        Remove OSM Layer
                    </RemoveImageryLayerButton>
                </ButtonControlContainer>
            </ViewerWidget>
        </div>
    );
};

<RemoveImageryLayerButtonExample/>
```