import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import {Viewer, defined} from 'cesium';
import './ViewerWidget.css';

/**
 * The Widget Container for the Cesium Viewer.
 * 
 * @visibleName Viewer Widget
 */
const ViewerWidget = ({
    options,
    children, 
    onStart,
    ...otherProps
}) => {
    const viewerRef = useRef();
    const viewerContainerRef = useRef();

    useEffect(() => {
        if(!defined(viewerRef.current)) {
            const aViewer = new Viewer(viewerContainerRef.current, options);
            viewerRef.current = aViewer;
            onStart && onStart(aViewer);
        }
        return () => {
            defined(viewerRef.current) && !viewerRef.current.isDestroyed() && viewerRef.current.destroy();
            viewerRef.current = null;
        }
    }, [onStart, options]);

    return (
        <div className="react-cesiumext-viewer" {...otherProps}>
            <div className="cesium-viewer">
                <div ref={viewerContainerRef} className="cesium-viewer-cesiumWidgetContainer"/>
                {children}
            </div>
        </div>
    );

};

ViewerWidget.propTypes = {
    /**
     * The configuration options parameter to create the Cesium Viewer
     * See Cesium Viewer Api Doc for all the configuration
     */
    options: PropTypes.object,

    /**
     * Callback hander called once the Cesium Viewer is instantiated by the widget.
     * This function will have as parameter the Cesium Viewer.
     */
    onStart: PropTypes.func

};

export default ViewerWidget;