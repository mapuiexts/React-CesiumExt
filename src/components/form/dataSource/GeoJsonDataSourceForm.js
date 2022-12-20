import React, { useMemo} from 'react';
import DataSourceForm from "./DataSourceForm";
import GeneralFormItems from "./items/general/GeneralFormItems";
import GeoJsonLoadOptionsFormItems from './items/loadOptions/GeoJsonLoadOptionsFormItems';

/**
 * A from to create/update a GeoJson DataSource
 * 
 */
const GeoJsonDataSourceForm = ({
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
                    children: <GeoJsonLoadOptionsFormItems mode={mode}/>
                },
                {
                    label: 'General', 
                    key: 'GENERAL', 
                    forceRender: true,
                    children: <GeneralFormItems mode={mode} nameIsUpdatable={true}/>
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

export default GeoJsonDataSourceForm;