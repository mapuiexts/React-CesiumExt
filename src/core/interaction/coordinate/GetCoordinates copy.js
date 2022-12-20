import { 
    ScreenSpaceEventHandler,
    Ray, Event, Cartesian3, ScreenSpaceEventType, defined 
} from 'cesium';
import DefaultPixelTransform from '../../coordinate/DefaultPixelTransform';

/**
 * Class to retrive one or more coordinates 
 * based on the mouse click event
 */
class GetCoordinates {

    /**
     * Construct
     * @param {} viewer The Cesium Viewer
     */
    constructor(viewer, pixelTransform = new DefaultPixelTransform()) {
        this._viewer = viewer;
        this._pixelTransform = pixelTransform;
        this._screenSpaceEventHandler = null;
        this._coordinateAdded = new Event();
        this._interactionStarted = new Event();
        this._interactionAborted = new Event();
        this._interactionEnded = new Event();
        this._currentPositionChanged = new Event();

        this._coordinates = [];
        this._rayScratch = null;
        this._curCartesianPosition = null;
        this._isRunning = false;

        this._leftClickHandler = this._getLeftClickHandler();
        this._leftDblClickHandler = this._getLeftDblClickHandler();
        this._mouseMoveHandler = this._getMouseMoveHandler();
        this._escKeyHandler = this._getEscKeyHandler();

    }

    start() {
        if(!defined(this._screenSpaceEventHandler)) {
            this._rayScratch = new Ray();
            this._curCartesianPosition = new Cartesian3();
            this._isRunning = true;
            this._coordinates = [];
            //create event handler and register callbacks
            this._screenSpaceEventHandler = new ScreenSpaceEventHandler(this._viewer.scene.canvas);
            this._screenSpaceEventHandler.setInputAction(this._leftClickHandler, ScreenSpaceEventType.LEFT_CLICK);
            this._screenSpaceEventHandler.setInputAction(this._leftDblClickHandler, ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
            this._screenSpaceEventHandler.setInputAction(this._mouseMoveHandler, ScreenSpaceEventType.MOUSE_MOVE);
            document.addEventListener('keydown', this._escKeyHandler);
            
            this._interactionStarted.raiseEvent();
        }
    }

    end() {
        if(defined(this._screenSpaceEventHandler)) {
            this.clear();
            this._interactionEnded.raiseEvent();
        }
    }

    abort() {
        if(defined(this._screenSpaceEventHandler)) {
            this.clear();
            this._interactionAborted.raiseEvent();
        }
    }

    clear() {
        if(defined(this._screenSpaceEventHandler)) {
            this._rayScratch = null;
            this._curCartesianPosition = null;
            this._isRunning = false;
            this._coordinates = [];

            this._screenSpaceEventHandler.removeInputAction(this._leftClickHandler, ScreenSpaceEventType.LEFT_CLICK);
            this._screenSpaceEventHandler.removeInputAction(this._leftDblClickHandler, ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
            this._screenSpaceEventHandler.removeInputAction(this._mouseMoveHandler, ScreenSpaceEventType.MOUSE_MOVE);
            document.removeEventListener('keydown', this._escKeyHandler);
            this._screenSpaceEventHandler.destroy();
            this._screenSpaceEventHandler = null;
        }
    }

    /**
     * return true if the interaction is running
     */
    get isRunning() {
        return this._isRunning;
    }

    /**
     * return the retrieved coordinates
     */
    get coordinates() {
        return this._coordinates
    }

    /**
     * An event that is fired when the 
     * interaction has started
     */
    get interactionStarted() {
        return this._interactionStarted;
    }

    /**
     * An event that is fired when the
     * interaction is aborted by calling
     * direclty the method abort() or 
     * pressing the ESC key.
     */
    get interactionAborted() {
        return this._interactionAborted;
    }

    /**
     * An event that is fired when the interaction
     * is ended by calling the method end()
     */
    get interactionEnded() {
        return this._interactionEnded;
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
     * The evvent 'coordinateAdded' will be fired with the added
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
            const position = that._pixelTransform.toCartesian(that._viewer, positionedEvent.position);
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
            const position = that._pixelTransform.toCartesian(that._viewer, motionEvent.endPosition, this._curCartesianPosition);
            defined(position) && this._currentPositionChanged.raiseEvent(that, position);
        };
    }

    _getEscKeyHandler() {
        const that = this;
        return (evt) => {
            if(evt.keyCode === 27) {
                that.abort();
            }
        }
    }

    /**
     * snap the cursor to ground or entity
     * REMARK: to be added to a Snap concrete class
     * 
     * @param {*} viewer 
     * @param {*} windowPosition 
     * @param {*} cartesianResult 
     * @param {*} callback 
     */
    /*
    _getPositionFromScreenCoordinate(viewer, windowPosition, cartesianResult) {
		const scene = viewer.scene;
		const pickedObject = scene.pick(windowPosition);
		let position = defined(cartesianResult) ? cartesianResult : new Cartesian3();
		if (defined(pickedObject) && (pickedObject instanceof Cesium3DTileFeature || pickedObject.primitive instanceof Cesium3DTileset)) {
			scene.render();
			position = scene.pickPosition(windowPosition, position);
		} else {
			this._rayScratch = scene.camera.getPickRay(windowPosition, this._rayScratch);
			position = scene.globe.pick(this._rayScratch, scene, position);
		}
        return position;
	}
    */
    
};

export default GetCoordinates;