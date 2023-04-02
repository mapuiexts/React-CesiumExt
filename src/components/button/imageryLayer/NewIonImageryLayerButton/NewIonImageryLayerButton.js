import React, {useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import {Button} from 'antd';
import Window from "../../../window/base/Window/Window";
import IonImageryLayerForm from '../../../form/imageryLayer/IonImageryLayerForm';
import ImageryLayerFactory from '../../../../core/factory/imageryLayer/ImageryLayerFactory';
import ImageryLayerFormat from '../../../../core/format/imageryLayer/ImageryLayerFormat';
import IonImageryProviderFormat from '../../../../core/format/imageryProvider/IonImageryProviderFormat';
import { defined, Viewer, CesiumWidget } from 'cesium';

/**
 * Component button to create a new Ion Imagery Layer.
 * Once the user clicks this button, a window will be shown and the
 * user will be able to add the parameters for the new layer creation.
 * 
 * @visibleName New Ion Imagery Layer
 */
const NewIonImageryLayerButton = ({
    viewer,
    children,
    windowProps,
    onCreate,
    ...otherProps
}) => {

    const [initialValues, setInitialValues] = useState(null);

    const getDefaultValues = () => {
        const imageryProviderFormat = new IonImageryProviderFormat();
        const providerOpts = imageryProviderFormat.writeJsonDefaultValues();
        const layerFormat = new ImageryLayerFormat();
        const layerOpts = layerFormat.writeJsonDefaultValues(providerOpts);
        
        return(
            {
                title: 'Ion',
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
        //hide window
        setInitialValues(null);
        //create layer
        const layerFactory = new ImageryLayerFactory();
        values.type = "Ion";
        const layer = layerFactory.buildLayer(values);
        defined(viewer) && viewer.imageryLayers.add(layer);
        onCreate && onCreate(layer);

     }, [viewer, onCreate]);

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
                    <IonImageryLayerForm
                        initialValues={initialValues}
                        onFinish={onFinish}
                    />
                </Window>
            }
        </React.Fragment>
     );
};

NewIonImageryLayerButton.propTypes = {
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
     * Handler function called once the
     * new layer is created.
     * This function will have the new layer as
     * parameter.
     */
    onCreate: PropTypes.func,

    /**
     * The button children: text or JSX element.
     */
    children: PropTypes.node

};

export default NewIonImageryLayerButton;