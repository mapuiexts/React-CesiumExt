import DataSourceFormat from "./DataSourceFormat";

class CzmlDataSourceFormat extends DataSourceFormat {

    /**
     * Convert a Cesium CzmlDataSource to a json object,
     * @param {Cesium.CzmlDataSource} dataSource 
     * @returns a Json object representing the Czml dataSource
     */
    writeJson(dataSource) {
        const json = super.writeJson(dataSource);
        return json;
    }

    /**
     * Provides a json object with the default values
     * @returns json with default values
     */
    writeJsonDefaultValues() {
        const json = super.writeJsonDefaultValues();
        return json;
    }

    /**
     * Read the json object and update the GeoJson dataSource
     * @param {Object} json the json object to be read
     * @param {Cesium.CzmlDataSource} dataSource the cesium Czml dataSource to be updated
     */
    readJson(json, dataSource) {
        super.readJson(json, dataSource, false);
    }

};

export default CzmlDataSourceFormat;

