import React, {useMemo} from 'react';
import {Tabs} from 'antd';
import {Form, Button, Space} from 'antd';
import GeneralFormItems from './items/general/GeneralFormItems';
import UrlTemplateImageryProviderFormItems from './items/provider/UrlTemplateImageryProviderFormItems';
import WebMapServiceImageryProviderFormItems from './items/provider/WebMapServiceImageryProviderFormItems';
import ProviderFormItems from './items/provider/ProviderFormItems';

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
 * A basic Form to create a new WebMapService Imagery Layer.
 * 
 */
const WebMapServiceImageryLayerForm = ({
    initialValues,
    onFinish,
    onFinishFailed,
    mode="new",
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
            { 
                label: 'Provider', 
                key: 'PROVIDER', 
                forceRender: true,
                children: 
                    <>
                        <UrlTemplateImageryProviderFormItems mode={mode}/>
                        <WebMapServiceImageryProviderFormItems mode={mode}/>
                    </> 
            },
            { 
                label: 'Default', 
                key: 'DEFAULT', 
                forceRender: true,
                children: <ProviderFormItems mode={mode}/>
            },
          ]);

    }, [mode]);

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
            //layout="vertical"
            form={form} 
            name="wms-layer-form" 
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

export default WebMapServiceImageryLayerForm;