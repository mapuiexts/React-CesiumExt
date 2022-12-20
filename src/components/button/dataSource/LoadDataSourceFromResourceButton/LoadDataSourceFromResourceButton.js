import React, { useState, useCallback } from "react";
import { Button } from 'antd';
import { defined, Resource } from 'cesium';
import Window from "../../../window/base/Window/Window";
import LoadDataSourceFromResourceForm from "../../../form/dataSource/LoadDataSourceFromResourceForm";


const LoadDataSourceByResourceButton = ({
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
        setInitialValues({url: undefined, queryParameters:undefined});
    };

    /**
      * Callback called once the user clicks the submit button
      * in the dialog
      */
    const onFinish = useCallback((values) => {

        //hide window
        setInitialValues(null);
        //load datasource by resource
        const loadOptions = ds._loadOptions;
        console.log('url:', values.url);
        const resource = new Resource({
            url: values.url,
            headers: defined(values.headers) ? JSON.parse(values.headers) : undefined,
            queryParameters: defined(values.queryParameters) ? JSON.parse(values.queryParameters) : undefined
        })
        ds.load(resource, loadOptions).then((dataSource => {
            viewer && viewer.flyTo(dataSource.entities);
        }));
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
                    <LoadDataSourceFromResourceForm
                        initialValues={initialValues}
                        onFinish={onFinish}
                    />
                </Window>
            }
        </React.Fragment>
    );

};

export default LoadDataSourceByResourceButton;