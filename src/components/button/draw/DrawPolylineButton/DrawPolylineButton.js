
import { useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { defined, Viewer } from 'cesium';
import {Button} from 'antd';
import DrawPolyline from '../../../../core/interaction/draw/DrawPolyline';

/**
 * Button Component to draw a polyline.
 * 
 * @visibleName Draw Polyline Button
 */
const DrawPolylineButton = ({
    viewer,
    minNumberOfPositions = 2,
    maxNumberOfPositions = null,
    polylineGraphicsOptions,
    onDrawStarted,
    onDrawEnded,
    onDrawAborted,
    children,
    ...otherProps
}) => {

    const interactionRef = useRef(null);
    const [, setIsRunning] = useState(false);

    let end = null;
    const interactionStartedHandler = useCallback(() => {
        onDrawStarted && onDrawStarted();
    }, [onDrawStarted]);

    const interactionAbortedHandler = useCallback(() => {
        end();
        onDrawAborted && onDrawAborted();
    }, [onDrawAborted, end]);

    const interactionEndedHandler = useCallback((entity) => {
        end();
        onDrawEnded && onDrawEnded(entity);
    }, [end, onDrawEnded]);

    const start = useCallback(() => {
        if(!defined(interactionRef.current)) {
            interactionRef.current = new DrawPolyline(viewer, viewer.entities, minNumberOfPositions, maxNumberOfPositions, polylineGraphicsOptions);
            interactionRef.current.interactionStarted.addEventListener(interactionStartedHandler);
            interactionRef.current.interactionAborted.addEventListener(interactionAbortedHandler);
            interactionRef.current.interactionEnded.addEventListener(interactionEndedHandler);
            interactionRef.current.start();
            setIsRunning(true);
        }
    }, [interactionAbortedHandler, interactionStartedHandler, interactionEndedHandler, 
        viewer, minNumberOfPositions, maxNumberOfPositions, polylineGraphicsOptions]);

    end = useCallback(() => {
        if(defined(interactionRef.current)) {
            interactionRef.current.interactionStarted.removeEventListener(interactionStartedHandler);
            interactionRef.current.interactionAborted.removeEventListener(interactionAbortedHandler);
            interactionRef.current.interactionEnded.removeEventListener(interactionEndedHandler);
            interactionRef.current = null;
            setIsRunning(false);
        }
    }, [interactionAbortedHandler, interactionStartedHandler, interactionEndedHandler]);

    const onClickHandler = useCallback(() => {
        defined(interactionRef.current) && interactionRef.current.start();
        start();
    }, [start]);
    
    return (
        <Button {...otherProps} onClick={onClickHandler}>
            {children}
        </Button>
    )
};

DrawPolylineButton.propTypes = {
    /**
     * The Cesium Viewer on where the polyline will be drawed.
     */
    viewer: PropTypes.instanceOf(Viewer),

    /**
     * The minimum number of vertices to be assigned
     * to the polyline
     */
    minNumberOfPositions: PropTypes.number,

    /**
     * The maximum number of vertices to be assigned
     * to the polyline. If not defined, any number of
     * vertices will be added to the polyline and
     * the last vertice is added through a user
     * double-click
     */
    maxNumberOfPositions: PropTypes.number,

    /**
     * The polylineGraphics options.
     * See <a href="https://cesium.com/learn/ion-sdk/ref-doc/PolylineGraphics.html">PolylineGraphics Doc</a>.
     */
    polylineGraphicsOptions: PropTypes.object,

    /**
     * The handler called once the operation is started
     * to request the user to indicate the vertex positions
     */
    onDrawStarted: PropTypes.func, 

    /**
     * The handler called once the operation is ended
     * after the user has indicated all the vertex position.
     * This function will have as parameter the drawed entity.
     */
    onDrawEnded: PropTypes.func,

    /**
     * The handler called if the draw operation is 
     * cancelled by the user through the "esc" key.
     */
    onDrawAborted: PropTypes.func,

    /**
     * The button children: text or JSX element.
     */
    children: PropTypes.node
};


export default DrawPolylineButton;