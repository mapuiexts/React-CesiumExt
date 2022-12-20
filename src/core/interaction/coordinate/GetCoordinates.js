import { Ray, Event, Cartesian3, defined } from 'cesium';
import DefaultPixelTransform from '../../coordinate/DefaultPixelTransform';
import PointerInteraction from '../Pointer';

/**
 * Class to retrive one or more coordinates 
 * based on the mouse click event
 */
class GetCoordinates extends PointerInteraction {

    /**
     * Construct
     * @param {} viewer The Cesium Viewer
     */
    constructor(viewer, pixelTransform = new DefaultPixelTransform()) {
        super(viewer);
        const options = {};
        options.leftClickHandler = this._getLeftClickHandler();
        options.leftDblClickHandler = this._getLeftDblClickHandler();
        options.mouseMoveHandler = this._getMouseMoveHandler();
        this.setOptions(options);

        this._coordinateAdded = new Event();
        this._currentPositionChanged = new Event();

        this._coordinates = [];
        this._rayScratch = null;
        this._curCartesianPosition = null;
        this._isRunning = false;
        this._pixelTransform = pixelTransform;
    }

    start() {
        this._rayScratch = new Ray();
        this._curCartesianPosition = new Cartesian3();
        this._coordinates = [];
        super.start();
        this.interactionStarted.raiseEvent();
    }

    end() {
        super.end();
    }

    abort() {
        super.abort();
    }

    clear() {
        super.clear();
        this._rayScratch = null;
        this._curCartesianPosition = null;
        this._coordinates = [];
    }

    /**
     * return the retrieved coordinates
     */
    get coordinates() {
        return this._coordinates
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
    _addCoordinate(coordinate) {
        this._coordinates.push(coordinate);
        this._coordinateAdded.raiseEvent(coordinate);
    }

    /**
     * Method to return the callback to handle the mouse left click
     * to add a new coordinate.
     * @returns callback to handle the mouse left click
     */
    _getLeftClickHandler() {
        const that = this;
        return (positionedEvent) => {
            const position = that._pixelTransform.toCartesian(that.viewer, positionedEvent.position);
            defined(position) && that._addCoordinate(position);
        };
    }

    /**
     * Method to return a callback to handle the mouse double click:
     * The execution will be ended.
     * @returns callback to handle the mouse double click
     */
    _getLeftDblClickHandler() {
        const that = this;
        return (twoPointEvent) => {
            that.end();
        };
    }

    /**
     * Method to return a callback to handle the mouse move:
     * A event will be fired with the current position
     * @returns callback to handle the mouse move
     */
    _getMouseMoveHandler() {
        const that = this;
        return (motionEvent) => {
            const position = that._pixelTransform.toCartesian(that.viewer, motionEvent.endPosition, this._curCartesianPosition);
            defined(position) && this._currentPositionChanged.raiseEvent(that, position);
        };
    }

    
};

export default GetCoordinates;