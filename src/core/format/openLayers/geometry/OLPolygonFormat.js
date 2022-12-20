
import { defined, Ellipsoid, Cartographic, Math } from 'cesium';
import Polygon from 'ol/geom/Polygon';


class OLPolygonFormat {

    /**
     * Method to read the Cesium Entity and extract
     * the openLayers Polygon geometry
     * @param {*} entity The Cesium Entity t
     * @param {*} ellipsoid the ellipsoid used to calculate the polygon vertices in degree
     * @returns The OpenLayers geometry
     */
    WriteOLGeometry(entity, ellipsoid = Ellipsoid.WGS84) {
        if(defined(entity.polygon)) {
            const hierarchy = entity.polygon.hierarchy;
            const result = [];
            this.writeOLRings(hierarchy, result, ellipsoid);
            const olPolygon = new Polygon(result);
            return olPolygon;
        }
        else {
            return null;
        }
    }

    /**
     * Method to retrieve an array of linear rings that define the polygon.
     * The first linear ring of the array defines the outer-boundary or 
     * surface of the polygon. Each subsequent linear ring defines a hole 
     * in the surface of the polygon. A linear ring is an array of vertices' coordinates 
     * where the first coordinate and the last are equivalent
     * 
     * @param {*} hierarchy 
     * @param {*} result Array of linear rings that define the OpenLayers polygon
     * @param {*} ellipsoid 
     */
    writeOLRings(hierarchy, result = [], ellipsoid = Ellipsoid.WGS84) {
        //retrieve a array of cartesians represent the polygon boundary
        const positions = hierarchy.getValue().positions;
        //convert boundary positions from cartesian to cartographic
        if(defined(positions && positions.length > 0)) {
            const wgs84Positions = [];
            positions.forEach((cartesian) => {
                const cartographicPosition = Cartographic.fromCartesian(cartesian, ellipsoid);
                if(defined(cartographicPosition)) {
                    const degreePosition = [
                        Math.toDegrees(cartographicPosition.latitude),
                        Math.toDegrees(cartographicPosition.longitude),
                    ];
                    wgs84Positions.push(degreePosition);
                }
            });
            if(wgs84Positions.length > 0) {
                wgs84Positions.push(wgs84Positions[0]);
                result.push(wgs84Positions);
            }
        }

        //retrieve the array of polygon hierarchies representing the holes
        const holes = hierarchy.getValue().holes;
        if(defined(holes && holes.length > 0)) {
            holes.forEach((childHierachy) => {
                this.writeOLRings(childHierachy, result, ellipsoid);
            });
        }
    }
};

export default OLPolygonFormat;