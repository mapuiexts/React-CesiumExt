import { defined, Color}  from 'cesium';
import DataSourceFormat from "./DataSourceFormat";

class GpxDataSourceFormat extends DataSourceFormat {

    /**
     * Convert a Cesium GpxDataSource to a json object,
     * @param {Cesium.GpxDataSource} dataSource 
     * @returns a Json object representing the Gpx dataSource
     */
    writeJson(dataSource) {
        const json = super.writeJson(dataSource);
        
        if(defined(dataSource._loadOptions)) {
            json._loadOptions = {};
            json._loadOptions.clampToGround = dataSource._loadOptions.clampToGround;
            json._loadOptions.waypointImage = dataSource._loadOptions.waypointImage;
            json._loadOptions.trackImage = dataSource._loadOptions.trackImage;
            json._loadOptions.trackColor = dataSource._loadOptions.trackColor.toCssHexString();
            json._loadOptions.routeColor = dataSource._loadOptions.routeColor.toCssHexString();
        }

        return json;
    }

    /**
     * Provides a json object with the default values
     * @returns json with default values
     */
    writeJsonDefaultValues() {
        const json = super.writeJsonDefaultValues();
        
        json._loadOptions = {};
        json._loadOptions.clampToGround = true;
        json._loadOptions.waypointImage = undefined;
        json._loadOptions.trackImage = undefined;
        json._loadOptions.trackColor = Color.YELLOW.toCssHexString();
        json._loadOptions.routeColor = Color.RED.toCssHexString();

        return json;
    }

    /**
     * Read the json object and update the GeoJson dataSource
     * @param {Object} json the json object to be read
     * @param {Cesium.GeoJsonDataSource} dataSource the cesium GeoJson dataSource to be updated
     */
    readJson(json, dataSource) {
        super.readJson(json, dataSource, false);
        
        if(!defined(json) && !defined(json._loadOptions)) return;
        'clampToGround' in json._loadOptions && (dataSource._loadOptions.clampToGround = json._loadOptions.clampToGround);
        'waypointImage' in json._loadOptions && (dataSource._loadOptions.waypointImage = json._loadOptions.waypointImage);
        'trackImage' in json._loadOptions && (dataSource._loadOptions.trackImage = json._loadOptions.trackImage);
        'trackColor' in json._loadOptions 
            && (dataSource._loadOptions.trackColor = Color.fromCssColorString(json._loadOptions.trackColor, dataSource._loadOptions.trackColor));
        'routeColor' in json._loadOptions 
            && (dataSource._loadOptions.routeColor = Color.fromCssColorString(json._loadOptions.routeColor, dataSource._loadOptions.routeColor));
    }

    /**
     * Retrieve the loadOptions from json object 
     * representing the GpxDataSource
     * @param {*} json 
     */
    getLoadOptions(json) {
        const loadOptions =  {...json._loadOptions};
        loadOptions.trackColor = Color.fromCssColorString(loadOptions.trackColor);
        loadOptions.routeColor = Color.fromCssColorString(loadOptions.routeColor);

        return loadOptions;
    }
};

export default GpxDataSourceFormat;