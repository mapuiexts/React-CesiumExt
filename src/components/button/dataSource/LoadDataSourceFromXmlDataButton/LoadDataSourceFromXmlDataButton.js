import React, { useState, useCallback } from "react";
import { Button } from 'antd';
import { defined } from 'cesium';
import Window from "../../../window/base/Window/Window";
import XmlDataForm from "../../../form/data/XmlDataForm";


const LoadDataSourceFromXmlDataButton = ({
    viewer,
    ds,
    windowProps,
    children,
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
        setInitialValues({data:undefined});
    };

    /**
     * Callback called once the user clicks the submit button
     * in the dialog
     */
    const onFinish = useCallback((xmlDoc) => {
        //hide window
        setInitialValues(null);

        const loadOptions = ds._loadOptions || {};
        console.log('data', xmlDoc);
        ds.load(xmlDoc, loadOptions).then((dataSource) => {
            viewer && viewer.flyTo(dataSource.entities);
        });

    }, [ds, viewer]);

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
                    <XmlDataForm
                        initialValues={initialValues}
                        onFinish={onFinish}
                    />
                </Window>
            }
        </React.Fragment>
    );
};

export default LoadDataSourceFromXmlDataButton;