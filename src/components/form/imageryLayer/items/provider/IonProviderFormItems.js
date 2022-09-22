import React from 'react';
import {Form, Input, InputNumber} from 'antd';

const IonProviderFormItems = ({
    mode
}) => {
    return (
        <React.Fragment>
            {/* asset id */}
            {mode === 'new' && 
                <Form.Item
                    name={["provider", "assetId"]}
                    label="Asset ID"
                    rules={[
                        {
                          required: true,
                          message: 'Please input the asset id',
                        },
                    ]}
                >
                    <InputNumber allowClear/>
                </Form.Item>
            },
            {/* access token */}
            {mode === 'new' && 
                <Form.Item
                    name={["provider", "accessToken"]}
                    label="Access Token"
                    rules={[
                        {
                          required: true,
                          message: 'Please input the access token',
                        },
                    ]}
                >
                    <Input allowClear/>
                </Form.Item>
            },
            {mode === 'new' && 
                <Form.Item
                    name={["provider", "server"]}
                    label="Server"
                >
                    <Input allowClear/>
                </Form.Item>
            }

        </React.Fragment>
    );
};

export default IonProviderFormItems;