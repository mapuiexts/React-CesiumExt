import React from 'react';
import {Form, InputNumber} from 'antd';

const ProviderFormItems = ({
    mode='new'
}) => {
    return (
        <React.Fragment>
            {/* minimum level */}
            <Form.Item
                name={["provider", "minimumLevel"]}
                label="Min. Level"
            >
                <InputNumber readOnly={mode === 'new'? false : true} />
            </Form.Item>

            {/* maximum level */}
            <Form.Item
                name={["provider", "maximumLevel"]}
                label="Max. Level"
            >
                <InputNumber readOnly={mode === 'new'? false : true}/>
            </Form.Item>
        </React.Fragment>
    );
};

ProviderFormItems.defaultValues = {
    
};

export default ProviderFormItems;

