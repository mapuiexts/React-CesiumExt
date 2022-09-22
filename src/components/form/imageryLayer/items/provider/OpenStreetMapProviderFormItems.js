import React from 'react';
import {Form, Input} from 'antd';

const OpenStreetMapProviderFormItems = ({
    mode
}) => {
    return (
        <React.Fragment>
            {/* file extension */}
            {mode === 'new' && 
                <Form.Item
                    name={["provider", "fileExtension"]}
                    label="File Extension"
                >
                    <Input/>
                </Form.Item>
            }

        </React.Fragment>
    );
};

// OpenStreetMapProviderFormItems.defaultValues = {
//     url: 'https://a.tile.openstreetmap.org',
//     fileExtension: 'png',
//     minimumLevel: 0,
//     maximumLevel: undefined,
// };

export default OpenStreetMapProviderFormItems;