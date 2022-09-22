import React from 'react';
import {Tabs} from 'antd';
import {Form, Button, Space} from 'antd';

const layout = {
    labelAlign: 'left',
    labelCol: {
      span: 10,
    },
    wrapperCol: {
      span: 16,
    },
};

const tailLayout = {
    wrapperCol: {
        offset: 10,
        span: 3,
    },
};

/**
 * A basic Form to create a new DataSource.
 * The 'items' property will allow the caller
 * to provide the form items for each specific
 * data source.
 * 
 */
const DataSourceForm = ({
    initialValues,
    onFinish,
    onFinishFailed,
    mode="new",
    items = [],
    ...otherProps
}) => {
    const [form] = Form.useForm();

    const onReset = () => {
        form.resetFields();
    };

    const onFill = () => {
        form.setFieldsValue(initialValues);
    };

    return(
        <Form 
            {...otherProps}
            {...layout}
            form={form} 
            name="datasource-form" 
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            onClick={(e) => e.stopPropagation()}
            initialValues = {initialValues}
        >
            <Tabs defaultActiveKey= {'GENERAL'} items={items}/>
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

export default DataSourceForm;