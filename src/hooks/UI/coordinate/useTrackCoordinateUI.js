import { useState, useRef, useCallback, useMemo } from 'react';
import { Row, Col } from 'antd';
import { defined, Cartographic, Cartesian3, Ellipsoid, Math } from 'cesium'
import TrackCoordinate from '../../../core/interaction/coordinate/TrackCoordinate';
import OverlayTooltip from '../../../components/overlay/tooltip/OverlayTooltip/OverlayTooltip';


const useTrackCoordinateUI = ({
    viewer, 
    snap,
    onCoordinateChange,
    onEnd,
    onAbort
}) => {

    const interactionRef = useRef(null);
    const [curCoordinate, setCurCoordinate] = useState(null);
    const [isRunning, setIsRunning] = useState(false);
    const scratchCartographicPosition = useRef(new Cartographic());
    const scratchCartesianPosition = useRef(new Cartesian3());

    let end = null;
    const interactionAbortedHandler = useCallback(() => {
        end();
        onAbort && onAbort();
    }, [end, onAbort]);

    const interactionEndedHandler = useCallback(() => {
        end();
        onEnd && onEnd();
    }, [end, onEnd]);

    const clearRequest = useCallback(() => {
        setCurCoordinate(null);
        setIsRunning(false);
    }, []);

    const currentPositionChangedHandler = useCallback((interaction, position) => {
        if(defined(position)) {
            position.clone(scratchCartesianPosition.current);
            setCurCoordinate([
                position.x,
                position.y,
                position.height
            ]);
        }
        else {
            setCurCoordinate(null);
        }
        onCoordinateChange && onCoordinateChange(position)
    }, [onCoordinateChange]);

    const start = useCallback(() => {
        if(!defined(interactionRef.current)) {
            interactionRef.current = new TrackCoordinate(viewer, snap);
            interactionRef.current.interactionAborted.addEventListener(interactionAbortedHandler);
            interactionRef.current.interactionEnded.addEventListener(interactionEndedHandler);
            interactionRef.current.currentPositionChanged.addEventListener(currentPositionChangedHandler);
            interactionRef.current.start();
            setIsRunning(true);
        }

    }, [interactionAbortedHandler, interactionEndedHandler, currentPositionChangedHandler, viewer, snap]);

    end = useCallback(() => {
        if(defined(interactionRef.current)) {
            interactionRef.current.interactionAborted.removeEventListener(interactionAbortedHandler);
            interactionRef.current.interactionEnded.removeEventListener(interactionEndedHandler);
            interactionRef.current.currentPositionChanged.removeEventListener(currentPositionChangedHandler);
            interactionRef.current = null;
            clearRequest();
        }
    }, [interactionAbortedHandler, interactionEndedHandler, currentPositionChangedHandler, clearRequest]);

    

    const overlay = useMemo(() => {
        if(defined(curCoordinate)) {
            Cartographic.fromCartesian(scratchCartesianPosition.current, Ellipsoid.WGS84, scratchCartographicPosition.current);
            if(defined(scratchCartographicPosition.current)) {
                return (
                    <OverlayTooltip viewer={viewer} visible={true} offsetY={-100}>
                        <div style={{width: 192}}>
                            <Row>
                                <Col span={8}>LONG:</Col>
                                <Col span={16}>{Math.toDegrees(scratchCartographicPosition.current.longitude).toFixed(4)}</Col>

                            </Row>
                            <Row>
                                <Col span={8}>LAT:</Col>
                                <Col span={16}>{Math.toDegrees(scratchCartographicPosition.current.latitude).toFixed(4)}</Col>
                            </Row>
                            <Row>
                                <Col span={8}>Height:</Col>
                                <Col span={16}>{scratchCartographicPosition.current.height.toFixed(2)}</Col>
                            </Row>

                        </div>
                    </OverlayTooltip>
                );
            }
            else {
                scratchCartographicPosition.current = new Cartographic();
                return null;
            }
        }
        else
            return null;

    }, [curCoordinate, viewer]);

    return {
        start,
        clearRequest,
        overlay,
        curCoordinate,
        isRunning
    };
};

export default useTrackCoordinateUI;