import React from 'react';
import {Form, Input} from 'antd';

const UrlTemplateImageryProviderFormItems = ({
    mode
}) => {
    return (
        <React.Fragment>
            {/* url */}
            <Form.Item
                name={["provider", "url"]}
                label="URL"
                rules={[
                    {
                      required: true,
                      message: 'Please input the url',
                    },
                ]}
            >
                <Input readOnly={mode === 'new'? false : true}/>
            </Form.Item>
        </React.Fragment>
    );
};

export default UrlTemplateImageryProviderFormItems;