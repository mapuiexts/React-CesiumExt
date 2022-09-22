import React from 'react';
import {Form, Checkbox, Input} from 'antd';

const GeoJsonGeneralFormItems = ({
    mode="new"
}) => {

    return (
        <React.Fragment>
            {/* show */}
            <Form.Item
                name= "clampToGround"
                valuePropName="checked"
                label="Clamp to Ground"
            >
                <Checkbox/>
            </Form.Item>
        </React.Fragment>
    );
};

export default GeoJsonGeneralFormItems;