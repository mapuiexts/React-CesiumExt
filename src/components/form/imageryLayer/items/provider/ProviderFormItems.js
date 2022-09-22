import React from 'react';
import {Form, Slider, InputNumber, Select} from 'antd';
import {TextureMinificationFilter, TextureMagnificationFilter } from 'cesium';

const ProviderFormItems = ({
    mode='new'
}) => {
    return (
        <React.Fragment>
            {/* minimum level */}
            <Form.Item
                name={["provider", "minimumLevel"]}
                label="Min. Level"
            >
                <InputNumber readOnly={mode === 'new'? false : true} />
            </Form.Item>

            {/* maximum level */}
            <Form.Item
                name={["provider", "maximumLevel"]}
                label="Max. Level"
            >
                <InputNumber readOnly={mode === 'new'? false : true}/>
            </Form.Item>

            {/* default alpha */}
            <Form.Item
                name={["provider", "defaultAlpha"]}
                label="Default Alpha"
            >
                <Slider max={1} step={0.1}/>
            </Form.Item>
            {/* default night alpha */}
            <Form.Item
                name={["provider", "defaultNightAlpha"]}
                label="Default Night Alpha"
            >
                <Slider max={1} step={0.1}/>
            </Form.Item>
            {/* default day alpha */}
            <Form.Item
                name={["provider", "defaultDayAlpha"]}
                label="Default Day Alpha"
            >
                <Slider max={1} step={0.1}/>
            </Form.Item>
            {/* default brightness */}
            <Form.Item
                name={["provider", "defaultBrightness"]}
                label="Default Brightness"
            >
                <InputNumber/>
            </Form.Item>
            {/* default contrast */}
            <Form.Item
                name={["provider", "defaultContrast"]}
                label="Default Contrast"
            >
                <InputNumber/>
            </Form.Item>
            {/* default hue */}
            <Form.Item
                name={["provider", "defaultHue"]}
                label="Default Hue"
            >
                <InputNumber/>
            </Form.Item>
            {/* default saturation */}
            <Form.Item
                name={["provider", "defaultSaturation"]}
                label="Default Saturation"
            >
                <InputNumber/>
            </Form.Item>
            {/* default gamma */}
            <Form.Item
                name={["provider", "defaultGamma"]}
                label="Default Gamma"
            >
                <InputNumber/>
            </Form.Item>
            {/* default texture minification filter  */}
            <Form.Item
                name={["provider", "defaultMinificationFilter"]}
                label="Default Text. Min. Filter"
            >
                <Select /*defaultValue={-1}*/>
                    <Select.Option value={-1}>Undefined</Select.Option>
                    <Select.Option value={TextureMinificationFilter.NEAREST}>Nearest</Select.Option>
                    <Select.Option value={TextureMinificationFilter.LINEAR}>Linear</Select.Option>
                    <Select.Option value={TextureMinificationFilter.NEAREST_MIPMAP_NEAREST}>Nearest Mipmap Nearest</Select.Option>
                    <Select.Option value={TextureMinificationFilter.LINEAR_MIPMAP_NEAREST}>Linear Mipmap Nearest</Select.Option>
                    <Select.Option value={TextureMinificationFilter.NEAREST_MIPMAP_LINEAR}>Nearest Mipmap Linear</Select.Option>
                    <Select.Option value={TextureMinificationFilter.LINEAR_MIPMAP_LINEAR}>Linear Mipmap Linear</Select.Option>
                </Select>
            </Form.Item>
            {/* default texture magnification filter  */}
            <Form.Item
                name={["provider", "defaultMagnificationFilter"]}
                label="Default Text. Mag. Filter"
            >
                <Select /*defaultValue={-1}*/>
                    <Select.Option value={-1}>Undefined</Select.Option>
                    <Select.Option value={TextureMagnificationFilter.NEAREST}>Nearest</Select.Option>
                    <Select.Option value={TextureMagnificationFilter.LINEAR}>Linear</Select.Option>
                </Select>
            </Form.Item>
        </React.Fragment>
    );
};

ProviderFormItems.defaultValues = {
    defaultAlpha: undefined,
    defaultNightAlpha: undefined,
    defaultDayAlpha: undefined,
    defaultBrightness: undefined,
    defaultContrast: undefined,
    defaultHue: undefined,
    defaultSaturation : undefined,
    defaultGamma: undefined,
    defaultMinificationFilter: undefined,
    defaultMagnificationFilter: undefined,
};

export default ProviderFormItems;

