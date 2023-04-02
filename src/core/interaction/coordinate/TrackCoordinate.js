import { Event, Cartesian3, defined } from 'cesium';
import DefaultPixelTransform from '../../coordinate/DefaultPixelTransform';
import PointerInteraction from '../Pointer';

/**
 * Class to retrieve the coordinate
 * from the mouse position
 */
class TrackCoordinate extends PointerInteraction {

    /**
     * Construct
     * @param {} viewer The Cesium Viewer
     */
    constructor(viewer,  pixelTransform = new DefaultPixelTransform()) {
        super(viewer);
        this._currentPositionChanged = new Event();
        this._curCartesianPosition = null;
        this._isRunning = false;
        this._pixelTransform = pixelTransform;
    }

    /**
     * Method to start the interaction
     */
    start() {
        super.start();
        this._curCartesianPosition = new Cartesian3();
    }

    /**
     * Method to end the interaction
     */
    end() {
        super.end();
        this.interactionEnded.raiseEvent();
    }

    /**
     * Method to abort the interaction
     */
    abort() {
        super.abort();
    }

    /**
     * Method to cleanup the interaction
     */
    clear() {
        this._curCartesianPosition = null;
        super.clear();
    }


    get currentPosition() {
        return this._curCartesianPosition;
    }


    /**
     * An interaction that is fired when the current
     * position is changed through the mouse move
     */
    get currentPositionChanged() {
        return this._currentPositionChanged;
    }


    /**
     * Method to return a callback to handle the mouse move:
     * A event will be fired with the current position
     * @returns callback to handle the mouse move
     */
    getMouseMoveHandler() {
        const that = this;
        return (motionEvent) => {
            const prevPosition = that._curCartesianPosition;
            const position = that._pixelTransform.toCartesian(that.viewer, motionEvent.endPosition, that._curCartesianPosition);
            if(defined(position)) {
                that._currentPositionChanged.raiseEvent(that, position);
            } 
            else {
                that._curCartesianPosition = prevPosition;
            }
        };
    }
};

export default TrackCoordinate;