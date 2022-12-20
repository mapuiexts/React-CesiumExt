import { defined, Cartesian3, Cesium3DTileFeature,Cesium3DTileset,  Ray } from 'cesium';
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
 class DefaultPixelTransform extends PixelTransform {

    constructor() {
        super();
        this._rayScratch = new Ray();
    }

    /**
     * Method to convert the screen coordinate to cartesian
     * @param {*} viewer 
     * @param {*} windowPosition 
     * @param {*} cartesianResult 
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
};

export default DefaultPixelTransform;