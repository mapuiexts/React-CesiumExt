import React, {useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import {Button} from 'antd';
import Window from "../../../window/base/Window/Window";
import WebMapServiceImageryLayerForm from '../../../form/imageryLayer/WebMapServiceImageryLayerForm';
import ImageryLayerFactory from '../../../../core/factory/imageryLayer/ImageryLayerFactory';
import ImageryLayerFormat from '../../../../core/format/imageryLayer/ImageryLayerFormat';
import WebMapServiceImageryProviderFormat from '../../../../core/format/imageryProvider/WebMapServiceImageryProviderFormat';
import { defined, Viewer, CesiumWidget } from 'cesium';

/**
 * Component button to create a new WebMapService Imagery Layer.
 * Once the user clicks this button, a window will be shown and the
 * user will be able to add the parameters for the new layer creation.
 * 
 * @visibleName New Wms Imagery Layer
 */
const NewWmsImageryLayerButton = ({
    viewer,
    children,
    windowProps,
    ...otherProps
}) => {
    const [initialValues, setInitialValues] = useState(null);

    const getDefaultValues = useCallback(() => {
        const imageryProviderFormat = new WebMapServiceImageryProviderFormat();
        const providerOpts = imageryProviderFormat.writeJsonDefaultValues();
        const layerFormat = new ImageryLayerFormat();
        const layerOpts = layerFormat.writeJsonDefaultValues(providerOpts);
        
        return(
            {
                title: 'New WMS Layer',
                options: layerOpts,
                provider: providerOpts
            }
        );
    }, []);

     /**
      * Handler to close the Window once the OK button
      * on this window is clicked
      */
     const onCloseWindow = () => {
         setInitialValues(null);
     };
 
     /**
      * Handler to show the Window once the button is Clicked
      */
     const onShowWindow = () => {
         setInitialValues(getDefaultValues());
     };
 
     /**
      * Callback called once the user clicks the submit button
      * in the dialog
      */
     const onFinish = useCallback((values) => {
        
        const imageryProviderFormat = new WebMapServiceImageryProviderFormat();
        if(!defined(values.provider)) {
            values.provider = imageryProviderFormat.writeJsonDefaultValues();
        }
        imageryProviderFormat.formatJson(values.provider);
        if(!defined(values.options)) values.options = {};
        console.log(values);
        //hide window
        setInitialValues(null);
        //create layer
        const layerFactory = new ImageryLayerFactory();
        values.type = "WebMapService";
        const layer = layerFactory.buildLayer(values);
       
        defined(viewer) && viewer.imageryLayers.add(layer);
     }, [viewer]);

     return (
        <React.Fragment>
            <Button onClick={onShowWindow} {...otherProps}>{children}</Button>
            {
                defined(initialValues) &&
                <Window
                    title={children}
                    collapsible
                    onClose={onCloseWindow} 
                    visible={defined(initialValues)}
                    {...windowProps} 
                >
                    <WebMapServiceImageryLayerForm
                        initialValues={initialValues}
                        onFinish={onFinish}
                    />
                </Window>
            }
        </React.Fragment>
     );
};

NewWmsImageryLayerButton.propTypes = {
    /**
     * The Cesium Viewer on where the Wms Imagery
     * Layer will be created.
     */
    viewer: PropTypes.PropTypes.oneOfType([
        PropTypes.instanceOf(Viewer),
        PropTypes.instanceOf(CesiumWidget)
    ]),

    /**
     * The properties for the window component 
     * that is show for the creation of the layer.
     * See  components.window.base.Window for more
     * details about the available properties.
     */
    windowProps: PropTypes.object,

    /**
     * The button children: text or JSX element.
     */
    children: PropTypes.node

};

export default NewWmsImageryLayerButton;