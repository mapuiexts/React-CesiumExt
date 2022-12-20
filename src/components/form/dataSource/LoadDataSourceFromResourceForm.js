import GeneralResourceFormItems from '../resource/items/general/ResourceFormItems';

import {Form, Button, Space} from 'antd';

const layout = {
    labelAlign: 'left',
    labelCol: {
      span: 7,
    },
    wrapperCol: {
      span:35,
    },
};

const tailLayout = {
    wrapperCol: {
        offset: 10,
        span: 3,
    },
};

/**
 * A form to load a data source by a given url
 */
const LoadDataSourceByResourceForm = ({
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

    return(
        <Form 
            {...otherProps}
            {...layout}
            form={form} 
            name="load-datasource-by-resource-form" 
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            onClick={(e) => e.stopPropagation()}
            initialValues = {initialValues}
        >
            <GeneralResourceFormItems/>
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

export default LoadDataSourceByResourceForm;