import React, {useMemo} from 'react';
import {Tabs} from 'antd';
import {Form, Button, Space} from 'antd';
import WfsGetFeatureFormItems from './items/WfsGetFeatureFormItems';
import ResourceFormItems from '../resource/items/general/ResourceFormItems';


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
 * A basic Form to define a wfs configuration paramsr.
 * 
 */
const WfsForm = ({
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
                label: 'Wfs GetFeature Options' ,
                key: 'WFS_GET_FEATURE',
                forceRender: true,
                children: <WfsGetFeatureFormItems mode={mode}/>
            }, 
            { 
                label: 'Resource', 
                key: 'RESOURCE', 
                forceRender: true,
                children: <ResourceFormItems mode={mode}/>
            }
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
            form={form} 
            name="wfs-form" 
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            onClick={(e) => e.stopPropagation()}
            initialValues = {initialValues}
        >
            <Tabs defaultActiveKey= {'WFS_GET_FEATURE'} items={tabItems}/>
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

export default WfsForm;