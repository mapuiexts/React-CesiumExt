import { Entity, PolylineGraphics, PolygonGraphics, PolygonHierarchy, CallbackProperty, Color } from 'cesium';
import Draw from './Draw';


/**
 * Class to Draw a polygon from the user mouse interaction
 * (a) A single left click will add a vertex to the polygon
 * (b) A double click will end the operation
 * (c) The <esc> key will abort the operation
 */
class DrawPolygon extends Draw {

    constructor(
        viewer, 
        entities, 
        minNumberOfPositions = 3,
        maxNumberOfPositions = null,
        polygonGraphicsOptions = {
            material: Color.RED.withAlpha(0.3),
            outline: true,
            outlineColor: Color.BLUE
        },
        outlineGraphicsOptions = {
            material: Color.BLUE,
        }
        
    ) {
        super(viewer, entities, minNumberOfPositions, maxNumberOfPositions);
        this._viewer = viewer;
        this._polygonOptions = polygonGraphicsOptions;
        this._outlineOptions = outlineGraphicsOptions;

        this._positionsInteraction = null;
        this._vertices = [];
        this._numberOfAddedPositions = 0;
        //event handlers
        this._coordinateAddedHandler = this._getCoordinateAddedHandler();
        this._currentPositionChangedHandler = this._getCurrentPositionChangedHander();
    }

    start() {
        if(!this.isRunning) {
            super.start();
            this._vertices = [];
            this._numberOfAddedPositions = 0;
            this.coordinateAdded.addEventListener(this._coordinateAddedHandler)
            this.currentPositionChanged.addEventListener(this._currentPositionChangedHandler);
            this.interactionStarted.raiseEvent();
        }
    }

    clear() {
        this._vertices = [];
        this._numberOfAddedPositions = 0;
        this.coordinateAdded.removeEventListener(this._coordinateAddedHandler);
        this.currentPositionChanged.removeEventListener(this._currentPositionChangedHandler);
        super.clear();
    }


    /**
     * create the initial entity having the polygon and 
     * the outline polyline.
     * 
     * @returns the Cesium Entity
     */
    _initializeEntity() {
        const entity = this._entities.add({
            polygon: new PolygonGraphics(this._polygonOptions),
			polyline : new PolylineGraphics(this._outlineOptions)
		});
        entity.polygon.hierarchy = new CallbackProperty(this._getPolygonHierarchyCallback(), false);
        entity.polyline.positions = new CallbackProperty(this._getOutlinePositionsCallback(), false);
		return entity;
    }

    /**
     * Clone the polyline graphics to be sent to the 
     * caller when the operation is finished.
     * @returns the Cesium PolylineGraphics
     */
    _cloneEntityGraphics() {
		//remove the scratch cartesian, if available
        if(this._vertices.length > this._numberOfAddedPositions) {
			this._vertices.pop();
		}
        const clonedPositions = this._vertices.slice(0);
		const graphics = this._entity.polygon;
        graphics.hierarchy = new PolygonHierarchy(clonedPositions);
        const resultEntity = new Entity({polygon: graphics});
		
		return resultEntity;
    }

    /**
     * Handler to add a vertex to the poligon every time
     * a new coordinated is added
     * @returns 
     */
    _getCoordinateAddedHandler() {
        const that = this;
        return (position) => {
            //remove the current mouse position, if available
            if(that._vertices.length > that._numberOfAddedPositions) {
                that._vertices.pop();
            }
            //add the new input position
            that._vertices.push(position);
            that._numberOfAddedPositions += 1;

        }
    }

    /**
     * Handler to add to the polygon vertices the
     * current mouse position.
     * @returns 
     */
    _getCurrentPositionChangedHander() {
        const that = this;
        return (draw, position) => {
            if(that.positions.length > 0) {
                if(that._vertices.length > that._numberOfAddedPositions) {
                    that._vertices.pop();
                }
                //add the current mouse position
                that._vertices.push(position);
            }
        }
    }


    /**
     * method to return the callback to allow
     * the polyline to be redraw during mouse moving
     * @returns the callback
     */
    _getOutlinePositionsCallback() {
        const that = this;
        return  function(time, result) {
            result = that._vertices;
			return result;
		};
    }

    /**
     * Method to return the callback to allow
     * the polygon hierarchy to be redraw
     * during the mouse moving
     * @returns 
     */
    _getPolygonHierarchyCallback() {
        const that = this;
		return function(time, result) {
            result = new PolygonHierarchy(that._vertices);
			return result
		};
	}

};

export default DrawPolygon;