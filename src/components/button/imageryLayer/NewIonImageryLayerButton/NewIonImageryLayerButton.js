import React, {useState, useCallback} from 'react';
import {Button} from 'antd';
import Window from "../../../window/base/Window/Window";
import IonImageryLayerForm from '../../../form/imageryLayer/IonImageryLayerForm';
import ImageryLayerFactory from '../../../../core/factory/imageryLayer/ImageryLayerFactory';
import ImageryLayerFormat from '../../../../core/format/imageryLayer/ImageryLayerFormat';
import IonImageryProviderFormat from '../../../../core/format/imageryProvider/IonImageryProviderFormat';
import { defined } from 'cesium';

const NewIonImageryLayerButton = ({
    viewer,
    layerCollection,
    children,
    windowProps,
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
        if(defined(layerCollection)) {
            layerCollection.add(layer);
        }
        else {
            viewer && viewer.imageryLayers.add(layer);
        }

     }, [layerCollection, viewer]);

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

export default NewIonImageryLayerButton;