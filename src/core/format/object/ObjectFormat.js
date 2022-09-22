
class ObjectFormat {

    /**
     * Convert a Cesium Imagery Layer to a json object,
     * avoid a circular reference.
     * see: https://stackoverflow.com/a/31557814
     * @param {ImageryLayer} layer 
     * @returns a Json object representing the layer
     */
    writeJson(layer) {
        let simpleObject = {};
        for (let prop in layer ){
            // if (!object.hasOwnProperty(prop)){
            //     continue;
            // }
            // if (typeof(object[prop]) == 'object'){
            //     continue;
            // }
            // if (typeof(object[prop]) == 'function'){
            //     continue;
            // }
            simpleObject[prop] = layer[prop];
        }
        return simpleObject;

        //return JSON.stringify(simpleObject); // returns cleaned up JSON
    }

    /**
     * Method to read the json object and update the related properties in 
     * the layer
     * @param {json} json a json object with the properties to be set to the layer
     * @param {ImageryLayer} layer the Cesium ImageryLayer to be updated with the properties in the json object
     */
    readJson(json, layer) {
        for ( let prop in json) {
            layer[prop] = json[prop];
        }
    }
};

export default ObjectFormat;