import React from 'react';
import {Form, Input, InputNumber} from 'antd';

const WfsGetFeatureFormItems = () => {
    return (
        <React.Fragment>
            <Form.Item
                name={["wfsGetFeature", "featureNS"]}
                label="Feature NS"
                rules={[
                    {
                        required: true,
                        message: 'Please input the feature namespace',
                    },
                ]}
            >
                <Input allowClear/>
            </Form.Item>
            <Form.Item
                name={["wfsGetFeature", "featurePrefix"]}
                label="Feature Prefix"
                rules={[
                    {
                        required: true,
                        message: 'Please input the prefix for the feature namespace',
                    },
                ]}
            >
                <Input allowClear/>
            </Form.Item>
            <Form.Item
                name={["wfsGetFeature", "featureTypes"]}
                label="Feature Types"
                rules={[
                    {
                        required: true,
                        message: 'Please input the feature types',
                    },
                ]}
            >
                <Input allowClear/>
            </Form.Item>
            <Form.Item
                name={["wfsGetFeature", "srsName"]}
                label="SRS"
            >
                <Input allowClear/>
            </Form.Item>
            <Form.Item
                name={["wfsGetFeature", "handle"]}
                label="Handle"
            >
                <Input allowClear/>
            </Form.Item>
            <Form.Item
                name={["wfsGetFeature", "outputFormat"]}
                label="Output Format"
            >
                <Input allowClear/>
            </Form.Item>
            <Form.Item
                name={["wfsGetFeature", "maxFeatures"]}
                label="Max Features"
            >
                <InputNumber/>
            </Form.Item>
            <Form.Item
                name={["wfsGetFeature", "geometryName"]}
                label="Geometry Name"
            >
                <Input allowClear/>
            </Form.Item>
            <Form.Item
                name={["wfsGetFeature", "propertyNames"]}
                label="Property Names"
            >
                <Input allowClear/>
            </Form.Item>
            <Form.Item
                name={["wfsGetFeature", "viewParams"]}
                label="View Params"
            >
                <Input allowClear/>
            </Form.Item>
            <Form.Item
                name={["wfsGetFeature", "startIndex"]}
                label="Start Index"
            >
                <InputNumber/>
            </Form.Item>
            <Form.Item
                name={["wfsGetFeature", "count"]}
                label="Count"
            >
                <InputNumber/>
            </Form.Item>
            <Form.Item
                name={["wfsGetFeature", "resultType"]}
                label="Result Type"
            >
                <Input allowClear/>
            </Form.Item>
        </React.Fragment>
    );
};

export default WfsGetFeatureFormItems;