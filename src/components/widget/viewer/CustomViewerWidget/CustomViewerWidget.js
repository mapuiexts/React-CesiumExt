import React, { useRef, useEffect, useState, useCallback } from 'react';
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
        console.log('creating a CesiumWidget');
        const cesiumViewer = new CesiumWidget(containerViewerRef.current, myOptions);
        console.log('container element', cesiumViewer.container);
        onStart && onStart(cesiumViewer);

        return cesiumViewer;
    }, [onStart, options]);

   
    const [viewer, setViewer] = useState();

    useEffect(() => {
        if(!defined(viewer)) {
            console.log('hiiii');
            const cesiumViewer = createCesiumViewer();
            setViewer(cesiumViewer);
        }
        return () => {
            defined(viewer) && viewer.destroy();
            //setViewer(null);
        }
    }, [viewer, createCesiumViewer]);

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