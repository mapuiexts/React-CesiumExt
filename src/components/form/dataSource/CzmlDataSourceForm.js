import React, { useMemo} from 'react';
import DataSourceForm from "./DataSourceForm";
import GeneralFormItems from "./items/general/GeneralFormItems";

/**
 * A from to create/update a Czml DataSource
 * 
 */
const CzmlDataSourceForm = ({
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

export default CzmlDataSourceForm;