import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import {defined, ImageryLayer, ImageryLayerCollection} from 'cesium';

/**
 * Component button to remove a Imagery Layer.
 * Once the user clicks this button, the 
 * imagery layer will be removed.
 * 
 * @visibleName Remove Imagery Layer
 */
const RemoveImageryLayerButton = ({
    layer,
    imageryLayers,
    destroy = true,
    onRemove,
    children,
    ...otherProps
}) => {
    const onClickHandler = useCallback((event) => {
        if(defined(layer) && !layer.isDestroyed() && defined(imageryLayers)) {
            imageryLayers.remove(layer, destroy);
            defined(onRemove) && onRemove(layer);
        }
    }, [layer, imageryLayers, destroy, onRemove]);

    return(
        <Button {...otherProps} onClick={onClickHandler}>
            {children}
        </Button>
    );
};

RemoveImageryLayerButton.propTypes = {
    /**
     * The Cesium imagery Layer to be removed.
     */
    layer: PropTypes.instanceOf(ImageryLayer),

    /**
     * The Cesium Imagery Layer Collection from where
     * the layer will be removed.
     */
    imageryLayers: PropTypes.instanceOf(ImageryLayerCollection),

    /**
     * If true, the layer will be destroyed and
     * can not be re-used.
     */
    destroy: PropTypes.bool,

    /**
     * Handler function called once the
     *  layer is removed.
     * This function will have the removed layer as
     * parameter.
     */
    onRemove: PropTypes.func,

    /**
     * The button children: text or JSX element.
     */
    children: PropTypes.node

};

export default RemoveImageryLayerButton;