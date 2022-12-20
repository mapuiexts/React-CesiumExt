import React, {useState, useCallback} from 'react';
import { GpxDataSource } from 'cesium';
import {Button} from 'antd';
import Window from "../../../window/base/Window/Window";
import GpxDataSourceForm from '../../../form/dataSource/GpxDataSourceForm';
import GpxDataSourceFormat from '../../../../core/format/dataSource/GpxDataSourceFormat';
import { defined } from 'cesium';

const NewGeoJsonDataSourceButton = ({
    viewer,
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
        const format = new GpxDataSourceFormat();
        setInitialValues(format.writeJsonDefaultValues());
    };
 
     /**
      * Callback called once the user clicks the submit button
      * in the dialog
      */
     const onFinish = useCallback((values) => {
        const loadOptions = new GpxDataSourceFormat().getLoadOptions(values);
        const ds = new GpxDataSource();
        ds.show = values.show;
        ds._loadOptions = loadOptions;
        const dataSources = viewer.dataSources;
        dataSources.add(ds);
        //hide window
        setInitialValues(null);
     }, [viewer.dataSources]);

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
                    <GpxDataSourceForm
                        initialValues={initialValues}
                        onFinish={onFinish}
                    />
                </Window>
            }
        </React.Fragment>
     );
};

export default NewGeoJsonDataSourceButton;