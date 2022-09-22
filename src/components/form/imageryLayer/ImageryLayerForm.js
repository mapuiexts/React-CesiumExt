import React, {useMemo} from 'react';
import {Tabs} from 'antd';
import {Form, Button, Space} from 'antd';
import GeneralFormItems from './items/general/GeneralFormItems';

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
 * A basic Form to create a new Imagery Layer.
 * 
 */
const ImageryLayerForm = ({
    initialValues,
    onFinish,
    onFinishFailed,
    mode="new",
    items = [],
    ...otherProps
}) => {
    const [form] = Form.useForm();

    const tabItems = useMemo(() => {
        return ([
            { 
                label: 'General', 
                key: 'GENERAL', 
                forceRender: true,
                children: <GeneralFormItems mode={mode}/>
            }, 
            ...items
          ]);

    }, [mode, items]);

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
            name="imagery-layer-form" 
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            onClick={(e) => e.stopPropagation()}
            initialValues = {initialValues}
        >
            <Tabs defaultActiveKey= {'GENERAL'} items={tabItems}/>
            <Form.Item 
                {...tailLayout}
            >
                <Space>
                    <Button  type="primary" htmlType="submit" >
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

export default ImageryLayerForm;