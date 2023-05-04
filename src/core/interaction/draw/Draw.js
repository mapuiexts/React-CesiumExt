import { Event, Cartesian3, defined, DeveloperError } from 'cesium';
import DefaultPixelTransform from '../../coordinate/DefaultPixelTransform';
import PointerInteraction from '../Pointer';

/**
 * Base class to draw a cesium graphics 
 * based on the mouse click event
 */
class Draw extends PointerInteraction {

    /**
     * Construct
     * @param {} viewer The Cesium Viewer
     */
    constructor(viewer, entities, minNumberOfPositions, maxNumberOfPositions, pixelTransform = new DefaultPixelTransform()) {
        super(viewer);
       
        this._coordinateAdded = new Event();
        this._currentPositionChanged = new Event();
        this._interactionEndFailed = new Event();

        this._entities = entities;
        this._entity = null;
        this._positions = [];
        this._curCartesianPosition = null;
        this._isRunning = false;
        this._pixelTransform = pixelTransform;
        this._minNumberOfPositions = minNumberOfPositions;
        this._maxNumberOfPositions = maxNumberOfPositions;
    }

    /**
     * Method to start the interaction
     */
    start() {
        super.start();
        this._entity = this._initializeEntity();
        this._curCartesianPosition = new Cartesian3();
        this._positions = [];
    }

    /**
     * Method to end the interaction
     */
    end() {
        if(defined(this._minNumberOfPositions) && this.positions.length < this._minNumberOfPositions) {
            this._interactionEndFailed.raiseEvent(this);
        }
        else {
            const graphics = this._cloneEntityGraphics();
            super.end();
            this.interactionEnded.raiseEvent(graphics);
        }
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
        defined(this._entity) && this._entities.remove(this._entity);
        this._entity = null;
        this._curCartesianPosition = null;
        this._positions = [];
        super.clear();
    }

    /**
     * return the retrieved cartesian positions
     */
    get positions() {
        return this._positions
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
     * An event that is fired when a coordinate is added.
     * Event handlers are passed the data source that was added.
     */
    get coordinateAdded() {
        return this._coordinateAdded;
    }

    /**
     * Method to add a coordinate.
     * The event 'coordinateAdded' will be fired with the added
     * coordinate.
     * @param {*} coordinate Coordinate to be added
     */
    addCoordinate(position) {
        this.positions.push(position);
        this._coordinateAdded.raiseEvent(position);
        if(defined(this._maxNumberOfPositions) && this.positions.length === this._maxNumberOfPositions) {
            this.end();
        }
    }

    _cloneEntityGraphics() {
        throw new DeveloperError('_cloneEntityGraphics method must be implemented by concrete class');
    }

    _initializeEntity() {
        throw new DeveloperError('_initializeEntity method must be implemented by concrete class');
    }

    /**
     * Method to return the callback to handle the mouse left click
     * to add a new coordinate.
     * @returns callback to handle the mouse left click
     */
    getLeftClickHandler() {
        const that = this;
        return (positionedEvent) => {
            const position = that._pixelTransform.toCartesian(that.viewer, positionedEvent.position);
            //dbl click will fire this event two times. So, making sure the position is not added two times
            if(defined(position) && (this.positions.length === 0 || !this.positions[this.positions.length -1].equals(position))) {
                defined(position) && that.addCoordinate(position);
            }
        };
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

export default Draw;