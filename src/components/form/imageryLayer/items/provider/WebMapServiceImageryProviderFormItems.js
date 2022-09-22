import React from 'react';
import {Form, Input} from 'antd';

const WebMapServiceImageryProviderFormItems = ({
    mode='new'
}) => {
    return (
        <React.Fragment>
            {/* layers */}
            <Form.Item
                name={["provider", "layers"]}
                label="Layers"
                rules={[
                    {
                      required: true,
                      message: 'Please input the layers',
                    },
                ]}
            >
                <Input readOnly={mode === 'new'? false : true}/>
            </Form.Item>
            {/* parameters */}
            {mode === 'new' &&
                <Form.Item
                    name={["provider", "parameters"]}
                    label="Parameters"
                >
                    <Input.TextArea rows={7} readOnly={mode === 'new'? false : true}/>
                </Form.Item>
            }
            {/* getFeatureInfo parameters */}
            {mode === 'new' &&
                <Form.Item
                    name={["provider", "getFeatureInfoParameters"]}
                    label="GetFeatureInfo Params"
                >
                    <Input.TextArea rows={5} readOnly={mode === 'new'? false : true}/>
                </Form.Item>
            }
            {/* srs */}
            {mode === 'new' &&
                <Form.Item
                    name={["provider", "srs"]}
                    label="SRS"
                >
                    <Input readOnly={mode === 'new'? false : true}/>
                </Form.Item>
            }
        </React.Fragment>
    );
};

export default WebMapServiceImageryProviderFormItems;