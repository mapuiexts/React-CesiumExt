import { defined, ScreenSpaceEventHandler, ScreenSpaceEventType, Event } from "cesium";

/**
 * Base class that call defined handlers to handle the 
 * mouse and keyboard events
 */
class PointerInteraction {

    constructor(viewer) {
        this._viewer = viewer;
        this._screenSpaceEventHandler = null;

        // create events
        this._interactionStarted = new Event();
        this._interactionAborted = new Event();
        this._interactionEnded = new Event();

        //initialize handlers
        this._leftClickHandler = this.getLeftClickHandler();
        this._leftDblClickHandler = this.getLeftDblClickHandler();
        this._mouseMoveHandler = this.getMouseMoveHandler();
        this._keyHandler = this.getKeyHandler();
    }

    /**
     * Starts the interaction to listen the mouse/keyboard events
     * A event is fired to indicate it.
     */
    start() {
        if(!defined(this._screenSpaceEventHandler)) {
            this._isRunning = true;
            //create event handler and register callbacks
            this._screenSpaceEventHandler = new ScreenSpaceEventHandler(this._viewer.scene.canvas);
            this._screenSpaceEventHandler.setInputAction(this._leftClickHandler, ScreenSpaceEventType.LEFT_CLICK);
            this._screenSpaceEventHandler.setInputAction(this._leftDblClickHandler, ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
            this._screenSpaceEventHandler.setInputAction(this._mouseMoveHandler, ScreenSpaceEventType.MOUSE_MOVE);
            document.addEventListener('keydown', this._keyHandler);
            //fire event
            //this._interactionStarted.raiseEvent();
        }
    }

    /**
     * Ends the events to listen the mouse/keyboard events
     * A event is fired to indicate it
     */
    end() {
        if(defined(this._screenSpaceEventHandler)) {
            this.clear();
            //this._interactionEnded.raiseEvent();
        }
    }

    /**
     * Aborts the interaction
     */
    abort() {
        if(defined(this._screenSpaceEventHandler)) {
            this.clear();
            this._interactionAborted.raiseEvent();
        }
    }

    /**
     * clear the interaction by unregistering the event handlers.
     * Called automatically by the end() and abort() methods.
     */
    clear() {
        if(defined(this._screenSpaceEventHandler)) {
            this._isRunning = false;
            this._screenSpaceEventHandler.removeInputAction(this._leftClickHandler, ScreenSpaceEventType.LEFT_CLICK);
            this._screenSpaceEventHandler.removeInputAction(this._leftDblClickHandler, ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
            this._screenSpaceEventHandler.removeInputAction(this._mouseMoveHandler, ScreenSpaceEventType.MOUSE_MOVE);
            document.removeEventListener('keydown', this._keyHandler);
            this._screenSpaceEventHandler.destroy();
            this._screenSpaceEventHandler = null;
        }
    }

    /**
     * return the viewer
     */
     get viewer() {
        return this._viewer;
    }

    /**
     * return true if the interaction is running
     */
    get isRunning() {
        return this._isRunning;
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
     * interaction has ended
     */
     get interactionEnded() {
        return this._interactionEnded;
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
     * Method to return the callback to handle the mouse left click.
     * This callback has as parameter the Cesium.ScreenSpaceEventHandler.PositionedEvent
     * @returns callback to handle the mouse left click
     */
    getLeftClickHandler() {
        return (positionedEvent) => {};
    }


    /**
     * Method to return a callback to handle the mouse double click
     * This default implementation will end the execution.
     * @returns callback to handle the mouse double click
     */
    getLeftDblClickHandler() {
        const that = this;
        return (positionedEvent) => {
            console.log('left dbl click handler', positionedEvent);
            that.end();
        };
    }

    /**
     * Method to return a callback to handle the mouse move.
     * The returned callback has as parameter the Cesium.ScreenSpaceEventHandler.MotionEvent
     * @returns callback to handle the mouse move
     */
    getMouseMoveHandler() {
        return (motionEvent) => {};
    }

    /**
     * Event handler to handle the esc key.
     * This default implementation will abort the 
     * execution if the <esc> key is pressed
     * @returns 
     */
    getKeyHandler() {
        const that = this;
        return (evt) => {
            if(evt.keyCode === 27) {
                that.abort();
            }
        }
    }

};

export default PointerInteraction;