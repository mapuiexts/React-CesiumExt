import React, {useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import {Button} from 'antd';
import Window from "../../../window/base/Window/Window";
import OpenStreetMapImageryLayerForm from '../../../form/imageryLayer/OpenStreetMapImageryLayerForm';
import OpenStreetMapProviderFormItems from '../../../form/imageryLayer/items/provider/OpenStreetMapProviderFormItems';
import ProviderFormItems from '../../../form/imageryLayer/items/provider/ProviderFormItems';
import ImageryLayerFactory from '../../../../core/factory/imageryLayer/ImageryLayerFactory';
import ImageryLayerFormat from '../../../../core/format/imageryLayer/ImageryLayerFormat';
import OpenStreetMapImageryProviderFormat from '../../../../core/format/imageryProvider/OpenStreetMapImageryProviderFormat';
import './NewOSMImageryLayerButton.css';
import { defined, Viewer, CesiumWidget } from 'cesium';

/**
 * Button Component to create a new OpenStreetMap Imagery Layer.
 * 
 * @visibleName New OSM Imagery Layer
 */
const NewOSMImageryLayerButton = ({
    viewer,
    children,
    windowProps = undefined,
    ...otherProps
}) => {

    

    const [initialValues, setInitialValues] = useState(null);

    const getDefaultValues = () => {
        const imageryProviderFormat = new OpenStreetMapImageryProviderFormat();
        const providerOpts = imageryProviderFormat.writeJsonDefaultValues();
        const layerFormat = new ImageryLayerFormat();
        const layerOpts = layerFormat.writeJsonDefaultValues(providerOpts);
        
        return(
            {
                title: 'OSM',
                options: layerOpts,
                provider: providerOpts
            }
        );
    }

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
        console.log(values);
        if(!defined(values.provider)) {
            values.provider = {
                ...OpenStreetMapProviderFormItems.defaultValues,
                ...ProviderFormItems.defaultValues
            };
        }
        //hide window
        setInitialValues(null);
        //create layer
        const layerFactory = new ImageryLayerFactory();
        values.type = "OpenStreetMap";
        const layer = layerFactory.buildLayer(values);
        viewer && viewer.imageryLayers.add(layer);
        

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
                    <OpenStreetMapImageryLayerForm
                        initialValues={initialValues}
                        onFinish={onFinish}
                    />
                </Window>
            }
        </React.Fragment>
     );
};

NewOSMImageryLayerButton.propTypes = {
    /**
     * The Cesium Viewer on where the OpenStreetMap Imagery
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

}

export default NewOSMImageryLayerButton;