import {useCallback} from 'react';
import PropTypes from 'prop-types';
import {Button} from 'antd';
import useTrackCoordinateUI from '../../../../hooks/UI/coordinate/useTrackCoordinateUI';
import PixelTransform from '../../../../core/coordinate/PixelTransform';
import { defined, Viewer } from 'cesium';


/**
 * Button Component to show the coordinate from
 * the current mouse position.
 * 
 * @visibleName Track Coordinate Button
 */
const TrackCoordinateButton = ({
    viewer,
    snap,
    children,
    onCoordinateChange,
    onEnd,
    onAbort,
    ...otherProps
}) => {

    const trackUI = useTrackCoordinateUI({viewer, snap, onCoordinateChange, onEnd, onAbort});

    const onClick = useCallback(() => {
        trackUI.start();
    },[trackUI]);

    
  return (
    <>
        <Button {...otherProps} onClick={onClick}>{children}</Button>
        { defined(trackUI.overlay) && trackUI.overlay }
    </>
    );

};

TrackCoordinateButton.propTypes = {
    /**
     * The Cesium Viewer on where the coordinate
     * will be tracked.
     */
    viewer: PropTypes.instanceOf(Viewer),

    /**
     * The snap instance to make a tranformation from
     * pixel position to coordinate
     */
    snap: PropTypes.instanceOf(PixelTransform),

    /**
     * Hander function called when coordinate is changed 
     * based on the mouse position.
     */
    onCoordinateChange: PropTypes.func,

    /**
     * Method handler called when the operation is stopped using a
     * mouse double-click
     */
    onEnd: PropTypes.func,

    /**
     * Method handler called when the operation is stopped using
     * a esc key.
     */
    onAbort: PropTypes.func,

    /**
     * The button children: text or JSX element.
     */
    children: PropTypes.node
};

export default TrackCoordinateButton;