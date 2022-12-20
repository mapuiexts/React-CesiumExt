import React from 'react';
import {Form, Input, Checkbox} from 'antd';

const GpxLoadOptionsFormItems = ({
    mode="new"
}) => {

    return (
        <React.Fragment>
            {/* show */}
            <Form.Item
                name={["_loadOptions", "clampToGround"]}
                valuePropName="checked"
                label="Clamp to Ground"
            >
                <Checkbox/>
            </Form.Item>
            {/* waypoint image */}
            <Form.Item
                name={["_loadOptions", "waypointImage"]}
                label="Way Point Image"
            >
                <Input/>
            </Form.Item>
            {/* track image */}
            <Form.Item
                name={["_loadOptions", "trackImage"]}
                label="Track Image"
            >
                <Input/>
            </Form.Item>
            {/* track color */}
            <Form.Item
                name={["_loadOptions", "trackColor"]}
                label="Track Color"
            >
                <Input type="color"/>
            </Form.Item>
            {/* route color */}
            <Form.Item
                name={["_loadOptions", "routeColor"]}
                label="Route Color"
            >
                <Input type="color"/>
            </Form.Item>
        </React.Fragment>
    );
};

export default GpxLoadOptionsFormItems;