import DataSourceFormat from "./DataSourceFormat";

class CzmlDataSourceFormat extends DataSourceFormat {

    /**
     * Convert a Cesium CzmlDataSource to a json object,
     * @param {Cesium.GeoJsonDataSource} dataSource 
     * @returns a Json object representing the GeoJson dataSource
     */
    writeJson() {
        const json = super.writeJson();
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
     * @param {Cesium.GeoJsonDataSource} dataSource the cesium GeoJson dataSource to be updated
     */
    readJson(json, dataSource) {
        super.readJson(json, dataSource, false);
    }

};

export default CzmlDataSourceFormat;

