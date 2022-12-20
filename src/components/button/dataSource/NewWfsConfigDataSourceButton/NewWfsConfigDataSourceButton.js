import React, {useState, useCallback} from 'react';
import {Button} from 'antd';
import Window from "../../../window/base/Window/Window";
import WfsForm from '../../../form/wfs/WfsForm';
import ResourceFormat from '../../../../core/format/resource/ResourceFormat';
import WfsGetFeatureOptionsFormat from '../../../../core/format/wfs/WfsGetFeatureOptionsFormat';
import { defined } from 'cesium';

/**
 * 
 * Button to add a WFS configuration for a DataSource
 *
 */
const NewWfsConfigDataSourceButton = ({
    ds,
    children,
    windowProps,
    ...otherProps
}) => {

    const [initialValues, setInitialValues] = useState(null);

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
        const initialValues = {};

        const resourceFormat = new ResourceFormat();
        initialValues.resource = resourceFormat.writeJsonDefaultValuesForWfs();

        const wfsGetFeatureOptionsFormat = new WfsGetFeatureOptionsFormat();
        initialValues.wfsGetFeature = wfsGetFeatureOptionsFormat.writeJsonDefaultValuese();

        setInitialValues(initialValues);
    };
 
     /**
      * Callback called once the user clicks the submit button
      * in the dialog.
      * As a result, the wfs configuration will be stored in the
      * datasource
      */
     const onFinish = useCallback((values) => {
        const wfsOptions = {...values}
        console.log('values', values);
        
        if(defined(wfsOptions.resource)) {
            const resourceFormat = new ResourceFormat();
            wfsOptions.resource = resourceFormat.readJson(wfsOptions.resource);
        }

        if(defined(wfsOptions.wfsGetFeature)) {
            const wfsGetFeatureOptionsFormat = new WfsGetFeatureOptionsFormat();
            wfsOptions.wfsGetFeature = wfsGetFeatureOptionsFormat.readJson(wfsOptions.wfsGetFeature);
        }

        console.log('wfsOptions', wfsOptions);
        
        ds._wfs = wfsOptions;
        console.log('ds', ds);
        //hide window
        setInitialValues(null);

     }, [ds]);

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
                    <WfsForm
                        initialValues={initialValues}
                        onFinish={onFinish}
                    />
                </Window>
            }
        </React.Fragment>
     );
};

export default NewWfsConfigDataSourceButton;