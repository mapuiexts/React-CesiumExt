import React from 'react';
import {Form, Input, InputNumber, Slider} from 'antd';
import CesiumColorSelect from '../../../../select/core/CesiumColorSelect/CesiumColorSelect';

const GeoJsonStyleFormItems = ({
    mode="new"
}) => {

    return (
        <React.Fragment>
            {/* fill */}
            <Form.Item
                name="fill"
                label="Fill"
            >
                <CesiumColorSelect/>
            </Form.Item>
            <Form.Item
                name="alphaFill"
                label="Alpha Fill"
            >
                <Slider max={1} step={0.1}/>
            </Form.Item>
            {/* markerColor */}
            <Form.Item
                name="markerColor"
                label="Marker Color"
            >
                <Input type='color'/>
            </Form.Item>
            {/* markerSize */}
            <Form.Item
                name="markerSize"
                label="Marker Size"
            >
                <InputNumber/>
            </Form.Item>
            {/* markerSymbol */}
            <Form.Item
                name="markerSymbol"
                label="Marker Symbol"
            >
                <Input/>
            </Form.Item>
            {/* stroke */}
            <Form.Item
                name="stroke"
                label="Stroke"
            >
                <Input type='color'/>
            </Form.Item>
            {/* strokeWidth  */}
            <Form.Item
                name="strokeWidth "
                label="Stroke Width"
            >
                <InputNumber/>
            </Form.Item>
            
        </React.Fragment>
    );
};

export default GeoJsonStyleFormItems;