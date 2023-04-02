import React, { useMemo} from 'react';
import DataSourceForm from "./DataSourceForm";
import GeneralFormItems from "./items/general/GeneralFormItems";
import StyleFormItems from './items/style/StyleFormItems';
import ResourceFormItems from '../resource/items/general/ResourceFormItems';
import WfsGetFeatureFormItems from '../wfs/items/WfsGetFeatureFormItems';

/**
 * A from to create/update a Wfs GeoJson DataSource
 * 
 */
const WfsGeoJsonDataSourceForm = ({
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
                    label: 'Style', 
                    key: 'STYLE', 
                    forceRender: true,
                    children: <StyleFormItems mode={mode}/>
                },
                {
                    label: 'Resource', 
                    key: 'RESOURCE', 
                    forceRender: true,
                    children: <ResourceFormItems mode={mode}/>
                },
                {
                    label: 'Wfs Get Feature Options', 
                    key: 'WFS_GET_FEATURE_OPTIONS', 
                    forceRender: true,
                    children: <WfsGetFeatureFormItems mode={mode}/>
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

export default WfsGeoJsonDataSourceForm;