import React, { useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import {CesiumWidget, defined} from 'cesium';
import Controls from './Controls/Controls';
import './CustomViewerWidget.css';


/**
 * The Customizable Widget Container for the Cesium Viewer.
 * 
 * @visibleName Custom Viewer Widget
 */
const CustomViewerWidget = ({
    options,
    children, 
    onStart,
    ...otherProps
}) => {

    const viewerRef = useRef();
    const containerViewerRef = useRef();
    const containerBottomRef = useRef();

    const createCesiumViewer = useCallback(() => {
        let myOptions = options;
        if(defined(options) && !defined(options.creditContainer)) {
            myOptions = {
                ...options,
                creditContainer: containerBottomRef.current
            };
        }
        const cesiumViewer = new CesiumWidget(containerViewerRef.current, myOptions);
        onStart && onStart(cesiumViewer);

        return cesiumViewer;
    }, [onStart, options]);

   

    useEffect(() => {
        if(!defined(viewerRef.current)) {
            viewerRef.current = createCesiumViewer();
        }
        return () => {
            defined(viewerRef.current) && viewerRef.current.destroy();
            viewerRef.current = null;
        }
    }, [createCesiumViewer]);

    return (
        <div className="react-cesiumext-custom-viewer" {...otherProps}>
            <div className="cesium-viewer">
                <div ref={containerViewerRef} className="cesium-viewer-cesiumWidgetContainer"/>
                {children}
                <div className="cesium-viewer-bottom" ref={containerBottomRef} /*style={{display:'none'}}*/>
                </div>  
            </div>
        </div>
    );
};

CustomViewerWidget.propTypes = {
    /**
     * The configuration options parameter to create the Cesium Viewer.
     * See <a href="https://cesium.com/learn/cesiumjs/ref-doc/Viewer.html#.ConstructorOptions">Cesium Viewer Api Doc</a> for all the configuration.
     */
    options: PropTypes.object,

    /**
     * Callback hander called once the Cesium Viewer is instantiated by the widget.
     * This function will have as parameter the Cesium Viewer.
     */
    onStart: PropTypes.func

};

CustomViewerWidget.Controls = Controls;

export default CustomViewerWidget;