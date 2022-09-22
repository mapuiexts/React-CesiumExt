import React from 'react';
import {Form, Checkbox, Input} from 'antd';

const GeneralFormItems = ({
    mode="new"
}) => {

    return (
        <React.Fragment>
            {/* name */}
            <Form.Item
                name="name"
                label="Name"
            >
                <Input/>
            </Form.Item>
            {/* show */}
            <Form.Item
                name="show"
                valuePropName="checked"
                label="Show"
            >
                <Checkbox/>
            </Form.Item>
        </React.Fragment>
    );
};

export default GeneralFormItems;