import {Button} from 'antd';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { 
    defined, Viewer, Entity, EntityCollection, 
    DataSource, CzmlDataSource, GeoJsonDataSource,  
    GpxDataSource, KmlDataSource, ImageryLayer, 
    Cesium3DTileset,  TimeDynamicPointCloud, HeadingPitchRange  
} from 'cesium';
import WfsGeoJsonDataSource from '../../../../core/packages/engine/DataSources/WfsGeoJsonDataSource';

/**
 * Button Component to fly the camera to the provided
 * entity, array of entities, entity collection, data source, 
 * Cesium3DTileset, point cloud, or imagery layer to view. 
 * You can also pass a promise that resolves to one of the 
 * previously mentioned types.
 * 
 * @visibleName FlyTo  Button
 */
const FlyToButton = ({
    viewer,
    target,
    flyToOptions,
    children,
    ...otherProps
}) => {

    const onClick = useCallback(() => {
        defined(viewer) && !viewer.isDestroyed() && viewer.flyTo(target, flyToOptions);
    }, [viewer, target, flyToOptions])

    return(
        <Button {...otherProps} onClick={onClick}>{children}</Button>
    );
};

FlyToButton.propTypes = {
    /**
     * The Cesium Viewer on where the camera
     * will be moved.
     */
    viewer: PropTypes.instanceOf(Viewer),

    /**
     * The entity, array of entities, entity collection, data source, 
     * Cesium3DTileset, point cloud, or imagery layer to view. 
     * You can also pass a promise that resolves to one of the 
     * previously mentioned types.
     */
    target: PropTypes.oneOfType([
        PropTypes.instanceOf(Entity),
        PropTypes.arrayOf(PropTypes.instanceOf(Entity)),
        PropTypes.instanceOf(EntityCollection),
        PropTypes.instanceOf(DataSource),
        PropTypes.instanceOf(CzmlDataSource),
        PropTypes.instanceOf(GeoJsonDataSource),
        PropTypes.instanceOf(GpxDataSource),
        PropTypes.instanceOf(KmlDataSource),
        PropTypes.instanceOf(WfsGeoJsonDataSource),
        PropTypes.instanceOf(ImageryLayer),
        PropTypes.instanceOf(Cesium3DTileset),
        PropTypes.instanceOf(TimeDynamicPointCloud),
        PropTypes.instanceOf(PropTypes.instanceOf(Promise)),
    ]),

    /**
     * optional options
     */
    flyToOptions: PropTypes.shape({
        duration: PropTypes.number,
        maximumHeight: PropTypes.number,
        offset: PropTypes.instanceOf( HeadingPitchRange)
    }),
};

export default FlyToButton;