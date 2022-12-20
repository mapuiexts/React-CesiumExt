
import { useState, useCallback, useRef } from 'react';
import { defined } from 'cesium';
import {Button} from 'antd';
import DrawPolyline from '../../../../../core/interaction/draw/DrawPolyline';


const DrawPolylineButton = ({
    viewer,
    children,
    ...otherProps
}) => {

    const interactionRef = useRef(null);
    const [, setIsRunning] = useState(false);

    let end = null;
    const interactionStartedHandler = useCallback(() => {
        console.log('Interaction started');
       
    }, []);

    const coordinateAddedHandler = useCallback((coordinate) => {
        console.log('coordinate added', coordinate);
    }, [])

    const interactionEndedHandler = useCallback((graphics) => {
        console.log('Interaction ended', graphics);
        const entity = viewer.entities.add({
			polyline : graphics
		});
        end();
        
    }, [end, viewer]);

    const start = useCallback(() => {
        if(!defined(interactionRef.current)) {
            interactionRef.current = new DrawPolyline(viewer, viewer.entities, 3, null);
            interactionRef.current.interactionStarted.addEventListener(interactionStartedHandler);
            interactionRef.current.coordinateAdded.addEventListener(coordinateAddedHandler);
            interactionRef.current.interactionEnded.addEventListener(interactionEndedHandler);
            interactionRef.current.start();
            setIsRunning(true);
        }
    }, [coordinateAddedHandler, interactionStartedHandler, interactionEndedHandler, viewer]);

    end = useCallback(() => {
        if(defined(interactionRef.current)) {
            interactionRef.current.interactionStarted.removeEventListener(interactionStartedHandler);
            interactionRef.current.coordinateAdded.removeEventListener(coordinateAddedHandler);
            interactionRef.current.interactionEnded.removeEventListener(interactionEndedHandler);
           // interactionRef.current.end();
            interactionRef.current = null;
            setIsRunning(false);
        }
    }, [coordinateAddedHandler, interactionStartedHandler, interactionEndedHandler]);

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

export default DrawPolylineButton;