
import { useState, useCallback, useRef } from 'react';
import {Viewer} from 'cesium';
import PropTypes from 'prop-types';
import { defined } from 'cesium';
import {Button} from 'antd';
import DrawLabel from '../../../../core/interaction/draw/DrawLabel';

/**
 * Button Component to draw a label.
 * 
 * @visibleName Draw Label Button
 */
const DrawLabelButton = ({
    viewer,
    text,
    labelGraphicsOptions,
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

    const interactionEndedHandler = useCallback((entity) => {
        onDrawEnded && onDrawEnded(entity);
        end();
        
    }, [end, onDrawEnded]);

    const interactionAbortedHandler = useCallback(() => {
        end();
        onDrawAborted && onDrawAborted();
       
    }, [onDrawAborted, end]);

    const start = useCallback(() => {
        if(defined(viewer) && !viewer.isDestroyed()) {
            if(!defined(interactionRef.current)) {
                interactionRef.current = new DrawLabel(viewer, viewer.entities, text, labelGraphicsOptions);
                interactionRef.current.interactionStarted.addEventListener(interactionStartedHandler);
                interactionRef.current.interactionEnded.addEventListener(interactionEndedHandler);
                interactionRef.current.interactionAborted.addEventListener(interactionAbortedHandler);
                interactionRef.current.start();
                setIsRunning(true);
            }
        }
    }, [interactionStartedHandler, interactionEndedHandler, interactionAbortedHandler, viewer, text, labelGraphicsOptions]);

    end = useCallback(() => {
        if(defined(interactionRef.current)) {
            interactionRef.current.interactionStarted.removeEventListener(interactionStartedHandler);
            interactionRef.current.interactionEnded.removeEventListener(interactionEndedHandler);
            interactionRef.current.interactionAborted.removeEventListener(interactionAbortedHandler);
            interactionRef.current = null;
            setIsRunning(false);
        }
    }, [interactionStartedHandler, interactionEndedHandler, interactionAbortedHandler]);

    const onClickHandler = useCallback(() => {
        defined(interactionRef.current) && interactionRef.current.start();
        start();
    }, [start]);
    
    return (
        viewer &&
        <Button {...otherProps} onClick={onClickHandler}>
            {children}
        </Button>
    );
};


DrawLabelButton.propTypes = {
    /**
     * The Cesium Viewer on where the label will be drawed.
     */
    viewer: PropTypes.instanceOf(Viewer),

    /**
     * The label text
     */
    text: PropTypes.string.isRequired,

    /**
     * The labelGraphics options.
     * See <a href="https://cesium.com/learn/ion-sdk/ref-doc/LabelGraphics.html">LabelGraphics Doc</a>.
     */
    labelGraphicsOptions: PropTypes.object,

    /**
     * The handler called once the operation is started
     * to request the user to indicate the label position
     */
    onDrawStarted: PropTypes.func, 

    /**
     * The handler called once the operation is ended
     * after the user has indicated the label position.
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

export default DrawLabelButton;