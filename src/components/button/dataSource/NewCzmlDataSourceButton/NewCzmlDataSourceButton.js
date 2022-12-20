import React, {useState, useCallback} from 'react';
import { CzmlDataSource } from 'cesium';
import {Button} from 'antd';
import Window from "../../../window/base/Window/Window";
import CzmlDataSourceForm from '../../../form/dataSource/CzmlDataSourceForm';
import CzmlDataSourceFormat from '../../../../core/format/dataSource/CzmlDataSourceFormat';
import { defined } from 'cesium';

const NewCzmlDataSourceButton = ({
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
        const format = new CzmlDataSourceFormat();
        setInitialValues(format.writeJsonDefaultValues());
    };
 
     /**
      * Callback called once the user clicks the submit button
      * in the dialog
      */
     const onFinish = useCallback((values) => {
        const ds = new CzmlDataSource(values.name);
        ds.show = values.show;
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
                    <CzmlDataSourceForm
                        initialValues={initialValues}
                        onFinish={onFinish}
                    />
                </Window>
            }
        </React.Fragment>
     );
};

export default NewCzmlDataSourceButton;