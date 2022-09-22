import { useCallback } from 'react';
import { Button } from 'antd';
import {defined, DeveloperError} from 'cesium';

const RemoveImageryLayerButton = ({
    layerCollection,
    layer,
    destroy = true,
    children,
    ...otherProps
}) => {
    const onClickHandler = useCallback((event) => {
        if(defined(layer) && defined(layerCollection)) {
            layerCollection.remove(layer, destroy);
        }
        else {
            throw new DeveloperError('Parameters Layer and LayerCollection should not be null/undefined')
        }
    }, [layer, layerCollection, destroy]);

    return(
        <Button {...otherProps} onClick={onClickHandler}>
            {children}
        </Button>
    );

};

export default RemoveImageryLayerButton;