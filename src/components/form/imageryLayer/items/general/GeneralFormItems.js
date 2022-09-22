import React from 'react';
import {Form, Slider, Checkbox, InputNumber, Input, Select} from 'antd';
import {SplitDirection, TextureMinificationFilter, TextureMagnificationFilter } from 'cesium';

const GeneralFormItems = ({
    mode="new"
}) => {

    return (
        <React.Fragment>
            {/* title */}
            <Form.Item
                name="title"
                label="Title"
            >
                <Input/>
            </Form.Item>
            {/* alpha */}
            <Form.Item
                name={["options", "alpha"]}
                label="Alpha"
            >
                <Slider max={1} step={0.1}/>
            </Form.Item>
            {/* night alpha */}
            <Form.Item
                name={["options", "nightAlpha"]}
                label="Night Alpha"
            >
                <Slider max={1} step={0.1}/>
            </Form.Item>
            {/* day alpha */}
            <Form.Item
                name={["options", "dayAlpha"]}
                label="Day Alpha"
            >
                <Slider max={1} step={0.1}/>
            </Form.Item>
            {/* brightness */}
            <Form.Item
                name={["options", "brightness"]}
                label="Brightness"
            >
                <InputNumber/>
            </Form.Item>
            {/* contrast */}
            <Form.Item
                name={["options", "contrast"]}
                label="Contrast"
            >
                <InputNumber/>
            </Form.Item>
            {/* hue */}
            <Form.Item
                name={["options", "hue"]}
                label="Hue"
            >
                <InputNumber/>
            </Form.Item>
            {/* saturation */}
            <Form.Item
                name={["options", "saturation"]}
                label="Saturation"
            >
                <InputNumber/>
            </Form.Item>
            {/* gamma */}
            <Form.Item
                name={["options", "gamma"]}
                label="Gamma"
            >
                <InputNumber/>
            </Form.Item>
            {/* split direction */}
            <Form.Item
                name={["options", "splitDirection"]}
                label="Split Dir."
            >
                <Select /*defaultValue={SplitDirection.NONE}*/>
                    <Select.Option value={SplitDirection.LEFT}>Left</Select.Option>
                    <Select.Option value={SplitDirection.NONE}>None</Select.Option>
                    <Select.Option value={SplitDirection.RIGHT}>Right</Select.Option>
                </Select>
            </Form.Item>
            {/* texture minification filter  */}
            <Form.Item
                name={["options", "minificationFilter"]}
                label="Text. Min. Filter"
            >
                <Select /*defaultValue={TextureMinificationFilter.LINEAR}*/>
                    <Select.Option value={TextureMinificationFilter.NEAREST}>Nearest</Select.Option>
                    <Select.Option value={TextureMinificationFilter.LINEAR}>Linear</Select.Option>
                    {/* <Select.Option value={TextureMinificationFilter.NEAREST_MIPMAP_NEAREST}>Nearest Mipmap Nearest</Select.Option>
                    <Select.Option value={TextureMinificationFilter.LINEAR_MIPMAP_NEAREST}>Linear Mipmap Nearest</Select.Option>
                    <Select.Option value={TextureMinificationFilter.NEAREST_MIPMAP_LINEAR}>Nearest Mipmap Linear</Select.Option>
                    <Select.Option value={TextureMinificationFilter.LINEAR_MIPMAP_LINEAR}>Linear Mipmap Linear</Select.Option> */}
                </Select>
            </Form.Item>
            {/* texture magnification filter  */}
            <Form.Item
                name={["options", "magnificationFilter"]}
                label="Text. Mag. Filter"
            >
                <Select /*defaultValue={TextureMagnificationFilter.LINEAR}*/>
                    <Select.Option value={TextureMagnificationFilter.NEAREST}>Nearest</Select.Option>
                    <Select.Option value={TextureMagnificationFilter.LINEAR}>Linear</Select.Option>
                </Select>
            </Form.Item>
            {/* show */}
            <Form.Item
                name={["options", "show"]}
                valuePropName="checked"
                label="Show"
            >
                <Checkbox/>
            </Form.Item>
            {/* maximum anisotropy */}
            {mode==='new' &&
                <Form.Item
                    name={["options", "maximumAnisotropy"]}
                    label="Max. Anisotropy"
                >
                    <InputNumber/>
                </Form.Item>
            }
            {/* minimum terrain level */}
            {mode==='new' &&
                <Form.Item
                    name={["options", "minimumTerrainLevel"]}
                    label="Min. Terrain Level"
                >
                    <InputNumber/>
                </Form.Item>
            }
            {/* maxiumum terrain level */}
            {mode==='new' &&
                <Form.Item
                    name={["options", "maximumTerrainLevel"]}
                    label="Max. Terrain Level"
                >
                    <InputNumber/>
                </Form.Item>
            }
        </React.Fragment>
    );

};

GeneralFormItems.defaultValues = {
    alpha: 1.0,
    nightAlpha: 1.0,
    dayAlpha: 1.0,
    brightness: 1.0,
    contrast: 1.0,
    hue: 0.0,
    saturation: 1.0,
    gamma: 1.0,
    splitDirection: SplitDirection.NONE,
    minificationFilter: TextureMinificationFilter.LINEAR,
    magnificationFilter: TextureMagnificationFilter.LINEAR,
    show: true,
    maximumAnisotropy: undefined,
    minimumTerrainLevel: undefined,
    maximumTerrainLevel: undefined
}

export default GeneralFormItems;