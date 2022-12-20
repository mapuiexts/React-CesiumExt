
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
class PixelTransform {

    /**
     * Method to convert the screen coordinate to 
     * @param {*} viewer 
     * @param {*} windowPosition 
     * @param {*} cartesianResult 
     */
     toCartesian(viewer, windowPosition, cartesianResult) { }
    

};

export default PixelTransform;