
import { useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { defined, Viewer } from 'cesium';
import {Button} from 'antd';
import DrawPoint from '../../../../core/interaction/draw/DrawPoint';

/**
 * Button Component to draw a point.
 * 
 * @visibleName Draw Point Button
 */
const DrawPointButton = ({
    viewer,
    pointGraphicsOptions,
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
        onDrawEnded && onDrawEnded(entity);
        end();
    }, [end, onDrawEnded]);

    const start = useCallback(() => {
        if(defined(viewer) && !viewer.isDestroyed()) {
            if(!defined(interactionRef.current)) {
                interactionRef.current = new DrawPoint(viewer, viewer.entities, pointGraphicsOptions);
                interactionRef.current.interactionStarted.addEventListener(interactionStartedHandler);
                interactionRef.current.interactionAborted.addEventListener(interactionAbortedHandler);
                interactionRef.current.interactionEnded.addEventListener(interactionEndedHandler);
                interactionRef.current.start();
                setIsRunning(true);
            }
        }
    }, [interactionStartedHandler, interactionEndedHandler, interactionAbortedHandler, viewer, pointGraphicsOptions]);

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
    );
};

DrawPointButton.propTypes = {
    /**
     * The Cesium Viewer on where the point will be drawed.
     */
    viewer: PropTypes.instanceOf(Viewer),


    /**
     * The pointGraphics options.
     * See <a href="https://cesium.com/learn/ion-sdk/ref-doc/PointGraphics.html">PointGraphics Doc</a>.
     */
    pointGraphicsOptions: PropTypes.object,

    /**
     * The handler called once the operatis is started
     * to request the user to indicate the point position
     */
    onDrawStarted: PropTypes.func, 

    /**
     * The handler called once the operation is ended
     * after the user has indicated the point position.
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

export default DrawPointButton;