import { defined, Cartesian3, Cartographic, Cesium3DTileFeature,Cesium3DTileset, sampleTerrainMostDetailed, Ray } from 'cesium';
import PixelTransform from './PixelTransform';

/**
 * Abstract class to convert the screen coordinate in pixel to
 * ECEF cartesian coordinate (https://en.wikipedia.org/wiki/Earth-centered,_Earth-fixed_coordinate_system).
 * The screen coordinate is provided throug the user interaction in the map with the mouse, but different
 * interpretation is possible in 3D world. For instance:
 * (a) for the pixel position, I want the position in the ground
 * (b) for the pixel position, I want the position for the picked entity
 * (c) for the pixel position, give me the position for the picked entity. 
 *     If entity not provided, give me the ground position
 * (d) etc ....
 * So, the derived class should implement a specific interpretation.
 */
 class ClampToGroundPixelTransform extends PixelTransform {

    constructor() {
		super();
        this._rayScratch = new Ray();
        this._scratchCartographicPosition = new Cartographic();
        this._scratchCartesianPosition = new Cartesian3();
    }

    /**
     * Method to convert the screen coordinate to a position in the ground
     * REMARK: please, see https://groups.google.com/forum/#!topic/cesium-dev/p-Rcg0JeH7Y
     * @param {*} viewer 
     * @param {*} windowPosition 
     * @param {*} cartesianResult 
     * @returns Position or Promise
     */
    toCartesian(viewer, windowPosition, cartesianResult) { 
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

    /**
	* Utility method to retrieve the cartesian position in ECEF system
	* based on the input pixel position
	* REMARK: please, see https://groups.google.com/forum/#!topic/cesium-dev/p-Rcg0JeH7Y
	*/
	getPositionFromScreenCoordinate(viewer, windowPosition, cartesianResult) {
		var ellipsoid = viewer.scene.globe.ellipsoid;
		var scene = viewer.scene;
        let position = defined(cartesianResult) ? cartesianResult : new Cartesian3();
		//calculate position in the ground
		var terrainProvider = viewer.terrainProvider;
		//if terrain is ellipsoid, so, height is always zero
		if(!defined(terrainProvider.availability)) {
			//retrieved cartesian picked position in the ellipsoid.
			//in the ellipsoid, the height will always be zero
			position = viewer.camera.pickEllipsoid(windowPosition, ellipsoid, position);
			return position;
		}
		//retrieve the position in the terrain, so height can be different than zero
		else {
			//retrieve cartesian for the intercepted ray
			this._rayScratch = scene.camera.getPickRay(windowPosition, this._rayScratch);
			this._scratchCartesianPosition = scene.globe.pick(this._rayScratch, scene, this._scratchCartesianPosition);
			if(defined(this._scratchCartesianPosition)) {
                position = this._scratchCartesianPosition.clone(position);
				return position;
			}
			//get related cartographic position
			this._scratchCartographicPosition = Cartographic.fromCartesian(this._scratchCartesianPosition, ellipsoid, this._scratchCartographicPosition);
			//get the detailed position in the terrain: request at the maximum available tile level for a terrain dataset
			var positions = [this._scratchCartographicPosition];
            //a function returning a promise
            const func = (position) => {
                return (
                    sampleTerrainMostDetailed(terrainProvider, positions).then((updatedPositions) => {
                        var longitude = updatedPositions[0].longitude;
                        var latitude = updatedPositions[0].latitude;
                        var height = updatedPositions[0].height;
                        position = Cartesian3.fromRadians(longitude, latitude, height, ellipsoid, position);
                        return position
        
                    })
                );
            }
            return func;
			
		}
	}
};

export default ClampToGroundPixelTransform;