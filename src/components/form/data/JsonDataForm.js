import React from 'react';
import {Form, Button, Space, Input} from 'antd';
import { defined } from 'cesium';
import { useCallback } from 'react';

const layout = {
    labelAlign: 'left',
    labelCol: {
      span: 3,
    },
    wrapperCol: {
      span:30,
    },
};

const tailLayout = {
    wrapperCol: {
        offset: 10,
        span: 3,
    },
};


const JsonDataForm = ({
    initialValues,
    onFinish,
    onFinishFailed,
    ...otherProps
}) => {

    const [form] = Form.useForm();

    const onReset = () => {
        form.resetFields();
    };

    const onFill = () => {
        form.setFieldsValue(initialValues);
    };

    const internalOnFinish = useCallback((values) => {
        if(defined(onFinish)) {
            const obj = JSON.parse(values.data);
            onFinish(obj);
        }
    }, [onFinish]);

    return(
        <Form 
            {...otherProps}
            {...layout}
            form={form} 
            name="json-data-form" 
            onFinish={internalOnFinish}
            onFinishFailed={onFinishFailed}
            onClick={(e) => e.stopPropagation()}
            initialValues = {initialValues}
        >
            <Form.Item
                name="data"
                label="Data"
                rules={[
                    {
                        required: true,
                        message: 'Please input the data',
                    },
                ]}
            >
                <Input.TextArea rows={20} allowClear/>
            </Form.Item>
            
            <Form.Item 
                {...tailLayout}
            >
                <Space>
                    <Button  type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Button htmlType="button" onClick={onReset}>
                        Reset
                    </Button>
                    <Button type="link" htmlType="button" onClick={onFill}>
                        Fill form
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
};

export default JsonDataForm;