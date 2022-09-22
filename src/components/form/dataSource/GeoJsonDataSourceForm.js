import React, { useMemo} from 'react';
import DataSourceForm from "./DataSourceForm";
import GeneralFormItems from "./items/general/GeneralFormItems";
import GeoJsonGeneralFormItems from "./items/general/GeoJsonGeneralFormItems";
import GeoJsonStyleFormItems from './items/style/GeoJsonStyleFormItems';

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
                    label: 'General', 
                    key: 'GENERAL', 
                    forceRender: true,
                    children: (
                        <React.Fragment>
                            <GeneralFormItems mode={mode}/>
                            <GeoJsonGeneralFormItems mode={mode}/>
                        </React.Fragment>
                    )
                },
                {
                    label: 'Style', 
                    key: 'STYLE', 
                    forceRender: true,
                    children: <GeoJsonStyleFormItems mode={mode}/>
                },
                
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