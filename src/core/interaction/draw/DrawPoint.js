import { Entity, PointGraphics, HeightReference, CallbackProperty, Color, defined } from 'cesium';
import Draw from './Draw';


/**
 * Class to Draw a point from the user mouse interaction
 * (a) A single left click will draw the point and end the interaction
 * (b) The <esc> key will abort the operation
 */
class DrawPoint extends Draw {
    constructor(
        viewer, 
        entities, 
        pointOptions = {
            pixelSize: 10,
            color : Color.RED,
            outlineColor: Color.WHITE,
            outlineWidth: 1,
            heightReference: HeightReference.CLAMP_TO_GROUND
        }
        
    ) {
        super(viewer, entities, 1, 1);
        this._viewer = viewer;
        this._pointOptions = pointOptions;

        this._positionsInteraction = null;
        this._pointVertices = [];
        this._numberOfAddedPositions = 0;
        //event handlers
        this._coordinateAddedHandler = this._getCoordinateAddedHandler();
        this._currentPositionChangedHandler = this._getCurrentPositionChangedHander();
    }

    start() {
        if(!this.isRunning) {
            super.start();
            this._pointVertices = [];
            this._numberOfAddedPositions = 0;
            this.coordinateAdded.addEventListener(this._coordinateAddedHandler)
            this.currentPositionChanged.addEventListener(this._currentPositionChangedHandler);
            this.interactionStarted.raiseEvent();
        }
    }


    clear() {
        this._pointVertices = [];
        this._numberOfAddedPositions = 0;
        this.coordinateAdded.removeEventListener(this._coordinateAddedHandler);
        this.currentPositionChanged.removeEventListener(this._currentPositionChangedHandler);
        super.clear();
    }


    /**
     * create the initial entity having the PointGraphics.
     * 
     * @returns the Cesium Entity
     */
    _initializeEntity() {
        const entity = this._entities.add({
			point : new PointGraphics(this._pointOptions)
		});
        entity.position = new CallbackProperty(this._getPointPositionCallback(), false);
		return entity;
    }

    /**
     * Clone the entity with point graphics to be sent to the 
     * caller when the operation is finished.
     * @returns the Cesium Entity
     */
    _cloneEntityGraphics() {
		const clonedPositions = this._pointVertices.slice(0);
		//remove the scratch cartesian, if available
        if(clonedPositions.length > this.positions.length) {
			clonedPositions.pop();
		}
		
		var graphics = this._entity.point.clone();
        const resultEntity = new Entity({point: graphics});
        if(clonedPositions.length > 0) {
            resultEntity.position = clonedPositions[0];
        }
		
		return resultEntity;
    }

    _getCoordinateAddedHandler() {
        const that = this;
        return (position) => {
            //remove the current mouse position, if available
            if(that._pointVertices.length > that._numberOfAddedPositions) {
                that._pointVertices.pop();
            }
            //add the new input position
            that._pointVertices.push(position);
            that._numberOfAddedPositions += 1;

        }
    }

    _getCurrentPositionChangedHander() {
        const that = this;
        return (draw, position) => {
            console.log('current position changed', draw, position);
            //if(that.positions.length > 0) {
                if(that._pointVertices.length > that._numberOfAddedPositions) {
                    that._pointVertices.pop();
                }
                //add the current mouse position
                that._pointVertices.push(position);
            //}
        }
    }


    /**
     * method to return the callback to allow
     * the point to be drawn during mouse move
     * @returns the callback
     */
    _getPointPositionCallback() {
        const that = this;
        return  function(time, result) {
            let res = null;
            if(that._pointVertices.length > 0) {
                res = that._pointVertices[0];
            }
            result = res;
			return result;
		};
    }

};

export default DrawPoint;