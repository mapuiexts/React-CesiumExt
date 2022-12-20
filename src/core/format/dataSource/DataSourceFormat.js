import {defined} from 'cesium';

class DataSourceFormat {

    /**
     * Convert a Cesium DataSource to a json object,
     * @param {Cesium.DataSource} dataSource 
     * @returns a Json object representing the dataSource
     */
    writeJson(dataSource) {
        const json = {};
        json.name = dataSource.name;
        json.show = dataSource.show;

        return json;
    }

    /**
     * Provides a json object with the default values
     * @returns json with default values
     */
    writeJsonDefaultValues() {
        const json = {};
        json.name = undefined;
        json.show = true;
        
        return json;
    }

    /**
     * Read the json object and update the dataSource
     * @param {Object} json the json object to be read
     * @param {Cesium.DataSource} dataSource the cesium dataSource to be updated
     * @returns 
     */
    readJson(json, dataSource, nameIsUpdatable) {
        if(!defined(json)) return;
        nameIsUpdatable && 'name' in json && (dataSource.name = json.name);
        'show' in json && (dataSource.show = json.show);
    }

};

export default DataSourceFormat;