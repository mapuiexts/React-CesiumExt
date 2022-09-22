import { useMemo } from 'react';
import DataSourceForm from "./DataSourceForm";
import GeneralFormItems from "./items/general/GeneralFormItems";

/**
 * A form to create/update a generic GeoJson DataSource
 * 
 */
const DefaultDataSourceForm = ({
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
                    children:  <GeneralFormItems mode={mode}/>   
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

export default DefaultDataSourceForm;