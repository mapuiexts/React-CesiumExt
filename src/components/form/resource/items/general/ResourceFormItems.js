import React from 'react';
import {Form, Input} from 'antd';

const ResourceFormItems = () => {
    return (
        <React.Fragment>
            <Form.Item
                name={["resource", "url"]}
                label="Url"
                rules={[
                    {
                        required: true,
                        message: 'Please input the datasource url',
                    },
                ]}
            >
                <Input allowClear/>
            </Form.Item>
            <Form.Item
                name={["resource","queryParameters"]}
                label="Query Parameters"
            >
                <Input.TextArea rows={5} allowClear/>
            </Form.Item>
            <Form.Item
                name={["resource","headers"]}
                label="Headers"
            >
                <Input.TextArea rows={5} allowClear/>
            </Form.Item>
        </React.Fragment>
    );
};

export default ResourceFormItems;