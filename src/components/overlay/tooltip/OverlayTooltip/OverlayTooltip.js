import { useRef, useEffect, useState, useCallback } from "react";
import ReactDOM from 'react-dom';
import {ScreenSpaceEventHandler, ScreenSpaceEventType, defined} from 'cesium';
import './OverlayTooltip.css';


/**
 * Component to show a tooltip in the cesium viewer located in the
 * current mouse position
 * @returns 
 */
const OverlayTooltip = ({
    viewer,
    visible = false,
    offsetX = 10,
    offsetY = -10,
    children,
    ...otherProps
}) => {
    const tooltipRef = useRef(null);
    const [style, setStyle] = useState({});
    const screenSpaceEventHandlerRef = useRef(null);
    
    /**
     * Handler to update the tooltip position when the mouse
     * position changes
     */
    const mouseMoveHandler = useCallback((movement) => {
        if(visible) {
            const newStyle = {
                left: offsetX + movement.endPosition.x + 'px',
                top:  offsetY + movement.endPosition.y + 'px',
                display: 'block'
            };
            setStyle(newStyle);
            tooltipRef && tooltipRef.current.focus()
        }
    }, [visible, offsetX, offsetY]);

    /**
     * Create the Screen Event handler to handle the mouse position
     */
    useEffect(() => {
        if(viewer && visible && !defined(screenSpaceEventHandlerRef.current)) {
            console.log('new  ScreenSpaceEventHandler ');
            screenSpaceEventHandlerRef.current = new ScreenSpaceEventHandler(viewer.scene.canvas);
        }

        return () => {
            if(defined(screenSpaceEventHandlerRef.current)) {
                console.log('destroy  ScreenSpaceEventHandler ');
                screenSpaceEventHandlerRef.current.destroy();
                screenSpaceEventHandlerRef.current = null;
            }
        }

    }, [viewer, visible]);

    /**
     * Register the Mouse Move Event handler 
     */
    useEffect(() => {
        if(viewer && visible && defined(screenSpaceEventHandlerRef.current)) {
            screenSpaceEventHandlerRef.current.setInputAction(mouseMoveHandler, ScreenSpaceEventType.MOUSE_MOVE);
        }

        return () => {
            if(defined(screenSpaceEventHandlerRef.current) && !screenSpaceEventHandlerRef.current.isDestroyed()) {
                screenSpaceEventHandlerRef.current.removeInputAction(ScreenSpaceEventType.MOUSE_MOVE);
            }
        }
    }, [visible, mouseMoveHandler, viewer]);

    return(
        visible &&
        ReactDOM.createPortal(
            <div autoFocus {...otherProps} style={style} ref={tooltipRef} className="rcesiumext-overlay-tooltip"> 
                {children}
            </div>,
            document.querySelector('body')
        )
    );
}

export default OverlayTooltip;