import React from 'react';
import {Form, Input, InputNumber, Slider, Checkbox} from 'antd';

const StyleFormItems = ({
    mode="new"
}) => {

    return (
        <React.Fragment>
            {/* show */}
            <Form.Item
                name={["style", "clampToGround"]}
                valuePropName="checked"
                label="Clamp to Ground"
            >
                <Checkbox/>
            </Form.Item>
            {/* fill */}
            <Form.Item
                name={["style", "fill"]}
                label="Fill"
            >
                <Input type='color'/>
            </Form.Item>
            <Form.Item
                name={["style", "alphaFill"]}
                label="Alpha Fill"
            >
                <Slider max={1} step={0.1}/>
            </Form.Item>
            {/* markerColor */}
            <Form.Item
                name={["style", "markerColor"]}
                label="Marker Color"
            >
                <Input type='color'/>
            </Form.Item>
            {/* markerSize */}
            <Form.Item
                name={["style", "markerSize"]}
                label="Marker Size"
            >
                <InputNumber/>
            </Form.Item>
            {/* markerSymbol */}
            <Form.Item
                name={["style", "markerSymbol"]}
                label="Marker Symbol"
            >
                <Input/>
            </Form.Item>
            {/* stroke */}
            <Form.Item
                name={["style", "stroke"]}
                label="Stroke"
            >
                <Input type='color'/>
            </Form.Item>
            {/* strokeWidth  */}
            <Form.Item
                name={["style", "strokeWidth"]}
                label="Stroke Width"
            >
                <InputNumber/>
            </Form.Item>
        </React.Fragment>
    );
};

export default StyleFormItems;