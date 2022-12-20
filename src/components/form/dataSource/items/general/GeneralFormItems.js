import React from 'react';
import {Form, Checkbox, Input} from 'antd';

const GeneralFormItems = ({
    mode="new",
    nameIsUpdatable
}) => {
    const nameIsReadOnly = (mode !== 'new' && !nameIsUpdatable) ? true : false;

    return (
        <React.Fragment>
            {/* name */}
            <Form.Item
                name="name"
                label="Name"
            >
                <Input readOnly={nameIsReadOnly}/>
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