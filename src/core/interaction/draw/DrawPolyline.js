import { PolylineGraphics, CallbackProperty, Color, defined } from 'cesium';
import Draw from './Draw';


/**
 * Class to Draw a polyline from the user mouse interaction
 * (a) A single left click will add a vertex to to polyline
 * (b) A double click will and the vertex and end the drawing polyline
 * (c) The <esc> key will abort the operation
 */
class DrawPolyline extends Draw {

    constructor(
        viewer, 
        entities, 
        minNumberOfPositions = 2,
        maxNumberOfPositions = null,
        polylineOptions = {
            material : Color.RED,
			width: 2.0,
            clampToGround: true
        }
        
    ) {
        super(viewer, entities, minNumberOfPositions, maxNumberOfPositions);
        this._viewer = viewer;
        this._polylineOptions = polylineOptions;

        this._positionsInteraction = null;
        this._polylineVertices = [];
        this._numberOfAddedPositions = 0;
        //event handlers
        this._coordinateAddedHandler = this._getCoordinateAddedHandler();
        this._currentPositionChangedHandler = this._getCurrentPositionChangedHander();
    }

    start() {
        if(!this.isRunning) {
            super.start();
            this._polylineVertices = [];
            this._numberOfAddedPositions = 0;
            this.coordinateAdded.addEventListener(this._coordinateAddedHandler)
            this.currentPositionChanged.addEventListener(this._currentPositionChangedHandler);
            this.interactionStarted.raiseEvent();
        }
    }

    end() {
        super.end();
    }

    clear() {
        this._polylineVertices = [];
        this._numberOfAddedPositions = 0;
        this.coordinateAdded.removeEventListener(this._coordinateAddedHandler);
        this.currentPositionChanged.removeEventListener(this._currentPositionChangedHandler);
        super.clear();
    }


    /**
     * create the initial entity having the polylineGraphic.
     * 
     * @returns the Cesium Entity
     */
    _initializeEntity() {
        const entity = this._entities.add({
			polyline : new PolylineGraphics(this._polylineOptions)
		});
        entity.polyline.positions = new CallbackProperty(this._getPolylinePositionsCallback(), false);
		return entity;
    }

    /**
     * Clone the polyline graphics to be sent to the 
     * caller when the operation is finished.
     * @returns the Cesium PolylineGraphics
     */
    _cloneEntityGraphics() {
		const clonedPositions = this._polylineVertices.slice(0);
		//remove the scratch cartesian, if available
        if(clonedPositions.length > this.positions.length) {
			clonedPositions.pop();
		}
		
		var graphics = this._entity.polyline.clone();
		graphics.positions = clonedPositions;
		
		return graphics;
    }

    _getCoordinateAddedHandler() {
        const that = this;
        return (position) => {
            //remove the current mouse position, if available
            if(that._polylineVertices.length > that._numberOfAddedPositions) {
                that._polylineVertices.pop();
            }
            //add the new input position
            that._polylineVertices.push(position);
            that._numberOfAddedPositions += 1;

        }
    }

    _getCurrentPositionChangedHander() {
        const that = this;
        return (draw, position) => {
            console.log('current position changed', draw, position);
            if(that.positions.length > 0) {
                if(that._polylineVertices.length > that._numberOfAddedPositions) {
                    that._polylineVertices.pop();
                }
                //add the current mouse position
                that._polylineVertices.push(position);
            }
        }
    }


    /**
     * method to return the callback to allow
     * the polyline to be drawn during mouse move
     * @returns the callback
     */
    _getPolylinePositionsCallback() {
        const that = this;
        return  function(time, result) {
            result = that._polylineVertices;
			return result;
		};
    }

};

export default DrawPolyline;