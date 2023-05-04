import {useMemo} from 'react';
import {OpenStreetMapImageryProvider, WebMapServiceImageryProvider, IonImageryProvider, defined} from 'cesium'
import OpenStreetMapImageryLayerForm from './OpenStreetMapImageryLayerForm';
import WebMapServiceImageryLayerForm from './WebMapServiceImageryLayerForm';
import IonImageryLayerForm from './IonImageryLayerForm';
import ImageryLayerForm from './ImageryLayerForm';
import ImageryLayerFormat from '../../../core/format/imageryLayer/ImageryLayerFormat';
import OpenStreetMapImageryProviderFormat from '../../../core/format/imageryProvider/OpenStreetMapImageryProviderFormat';
import WebMapServiceImageryProviderFormat from '../../../core/format/imageryProvider/WebMapServiceImageryProviderFormat';
import IonImageryProviderFormat from '../../../core/format/imageryProvider/IonImageryProviderFormat';
import { useCallback } from 'react';

const EditImageryLayerForm = ({
    layer,
    onFinish,
    onFinishFailed,
    ...otherProps
}) => {

    let LayerForm = null;
    let imageryProviderFormat = null;
    const layerFormat = useMemo(() => {
        return new ImageryLayerFormat();
    }, []);
   
    let initialValues = null;
    if(layer) {
        if(layer.imageryProvider instanceof OpenStreetMapImageryProvider ) {
            LayerForm = OpenStreetMapImageryLayerForm;
            imageryProviderFormat = new OpenStreetMapImageryProviderFormat();
        }
        else if(layer.imageryProvider instanceof WebMapServiceImageryProvider ) {
            LayerForm = WebMapServiceImageryLayerForm;
            imageryProviderFormat = new WebMapServiceImageryProviderFormat();
        }
        else if(layer.imageryProvider instanceof IonImageryProvider ) {
            LayerForm = IonImageryLayerForm;
            imageryProviderFormat = new IonImageryProviderFormat();
        }
        else {
            LayerForm = ImageryLayerForm;
        }
        
        if(defined(LayerForm)) {
            const providerOpts = imageryProviderFormat && imageryProviderFormat.writeJson(layer.imageryProvider);
            const layerOpts = layerFormat.writeJson(layer);

            initialValues = {
                title: layer._title,
                options: layerOpts,
                provider: providerOpts
            };
        }
    }

    const internalOnFinish = useCallback((values) => {
        //retrieve the layer and provider properties
        const {provider, options} = values;
        //update layer and its provider
        layerFormat.readJson(options, layer);
        provider && imageryProviderFormat.readJson(provider, layer.imageryProvider);
        onFinish && onFinish(values);
        

    }, [imageryProviderFormat, layerFormat, layer, onFinish]);

    return (
        defined(LayerForm) &&
        <LayerForm 
            {...otherProps}
            initialValues={initialValues}
            onFinish={internalOnFinish}
            onFinishFailed={onFinishFailed}
            onClick={(e) => e.stopPropagation()}
            mode="edit"
        />
    );
};

export default EditImageryLayerForm;