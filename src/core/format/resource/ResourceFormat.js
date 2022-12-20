import {defined, Resource} from 'cesium';

class ResourceFormat {

    /**
     * Convert a Cesium Resource to a json object,
     * @param {Cesium.Resource} resource 
     * @returns a Json object representing the dataSource
     */
    writeJson(resource) {
        const json = {};
        json.url = resource.url;
        json.headers = JSON.stringify(resource.headers, null, 4);
        json.queryParameters = JSON.stringify(resource.queryParameters, null, 4);

        return json;
    }

    /**
     * Provides a json object with the default values
     * @returns json with default values
     */
    writeJsonDefaultValues() {
        const json = {};
        json.url = undefined;
        json.headers = {
            contentType: 'application/json', 
        };
        json.headers = JSON.stringify(json.headers, null, 4);
        json.queryParameters = {};
        json.queryParameters = JSON.stringify(json.queryParameters, null, 4);
        //json.responseType= 'json';

        return json;
    }

    /**
     * Provides a json object with the default values
     * @returns json with default values
     */
    writeJsonDefaultValuesForWfs() {
        const json = {};
        json.url = undefined;
        json.headers = {
            contentType: 'application/xml', 
        };
        json.headers = JSON.stringify(json.headers, null, 4);
        json.queryParameters = {};
        json.queryParameters = JSON.stringify(json.queryParameters, null, 4);
        //json.responseType= 'json';

        return json;
    }

    /**
     * Provides a json object with the default values
     * @returns json with default values
     */
    writeWfsJsonDefaultValues() {
        const json = {};
        json.url = undefined;
        json.headers = {
            contentType: 'application/xml', 
        };
        json.queryParameters = undefined;
        //json.responseType= 'json';

        return json;
    }

    /**
     * Read the json object and create a new resource from it.
     * @param {Object} json the json options object to be read
     * @returns The newly created cesisum Resource
     */
    readJson(json) {
        if(!defined(json)) return undefined;
        const options = {...json}
        'headers' in options && (options.headers = JSON.parse(options.headers));
        'queryParameters' in options && (options.queryParameters = JSON.parse(options.queryParameters));
        const resource =  new Resource(options);
        return resource;
    }

};

export default ResourceFormat;