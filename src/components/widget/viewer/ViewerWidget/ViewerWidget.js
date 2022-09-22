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
            console.log('destructor');
            viewerRef.current.destroy();
            viewerRef.current = null;
        }
    }, [onStart, options]);

    return (
        <div {...otherProps}
             ref={viewerContainerRef}
             className="react-cesiumext-viewer"
        >
            {children}
        </div>
    );

};

ViewerWidget.propTypes = {
    /**
     * <p>The configuration <strong>options<strong> parameter to create the Cesium Viewer.</p>
     * <p>See <a href="https://cesium.com/learn/cesiumjs/ref-doc/Viewer.html#.ConstructorOptions">Cesium Viewer Api Doc</a> for all the configuration</p> 
     */
    options: PropTypes.object,

    /**
     * Callback hander called once the Cesium Viewer is instantiated by the widget.
     * This function will have as parameter the Cesium Viewer.
     */
    onStart: PropTypes.func

};

export default ViewerWidget;