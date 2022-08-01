import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {Viewer} from 'cesium';
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
    const [viewer, setViewer] = useState(null);

    useEffect(() => {
        if(viewer === null) {
            const aViewer = new Viewer(viewerRef.current, options);
            onStart && onStart(aViewer);
            setViewer(aViewer);
        }
    }, [options, onStart, viewer]);

    return (
        <div {...otherProps}
             ref={viewerRef}
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