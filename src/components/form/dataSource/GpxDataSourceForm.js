import React, { useMemo} from 'react';
import DataSourceForm from "./DataSourceForm";
import GeneralFormItems from "./items/general/GeneralFormItems";
import GpxLoadOptionsFormItems from './items/loadOptions/GpxLoadOptionsFormItems';

/**
 * A from to create/update a Gpx DataSource
 * 
 */
const GpxDataSourceForm = ({
    initialValues,
    onFinish,
    onFinishFailed,
    mode="new",
    ...otherProps
}) => {

    const items = useMemo(() => {
        return (
            [
                {
                    label: 'Load Options', 
                    key: 'LOAD_OPTIONS', 
                    forceRender: true,
                    children: <GpxLoadOptionsFormItems mode={mode}/>
                },
                {
                    label: 'General', 
                    key: 'GENERAL', 
                    forceRender: true,
                    children: <GeneralFormItems mode={mode} nameIsUpdatable={false}/>
                }
            ]
        );
    }, [mode]);
    
    return(
        <DataSourceForm 
            {...otherProps}
            initialValues={initialValues}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            mode={mode}
            items={items}
        />
    );
};

export default GpxDataSourceForm;