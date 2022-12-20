import React from 'react';
import {Form, Input, InputNumber, Slider, Checkbox} from 'antd';

const GeoJsonLoadOptionsFormItems = ({
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
            {/* fill */}
            <Form.Item
                name={["_loadOptions", "fill"]}
                label="Fill"
            >
                <Input type='color'/>
            </Form.Item>
            <Form.Item
                name={["_loadOptions", "alphaFill"]}
                label="Alpha Fill"
            >
                <Slider max={1} step={0.1}/>
            </Form.Item>
            {/* markerColor */}
            <Form.Item
                name={["_loadOptions", "markerColor"]}
                label="Marker Color"
            >
                <Input type='color'/>
            </Form.Item>
            {/* markerSize */}
            <Form.Item
                name={["_loadOptions", "markerSize"]}
                label="Marker Size"
            >
                <InputNumber/>
            </Form.Item>
            {/* markerSymbol */}
            <Form.Item
                name={["_loadOptions", "markerSymbol"]}
                label="Marker Symbol"
            >
                <Input/>
            </Form.Item>
            {/* stroke */}
            <Form.Item
                name={["_loadOptions", "stroke"]}
                label="Stroke"
            >
                <Input type='color'/>
            </Form.Item>
            {/* strokeWidth  */}
            <Form.Item
                name={["_loadOptions", "strokeWidth"]}
                label="Stroke Width"
            >
                <InputNumber/>
            </Form.Item>
            
        </React.Fragment>
    );
};

export default GeoJsonLoadOptionsFormItems;