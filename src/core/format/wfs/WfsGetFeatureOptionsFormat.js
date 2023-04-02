import { defined } from "cesium";
import { isString } from "../../type/type";

class WfsGetFeatureOptionsFormat {

    writeJson(json) {
        return json;
    }

    /**
     * Provides a json object with the default values
     * @returns json with default values
     */
    writeJsonDefaultValues() {
        const json = {
            srsName: 'EPSG:4326',
            maxFeatures: 2000,
            outputFormat: 'application/json'
        };
                
        return json;
    }

    readJson(inputJson) {
        const json = {...inputJson};
        //format feature types
        if(defined(inputJson.featureTypes) && isString(inputJson.featureTypes)) {
            let featureTypes = inputJson.featureTypes.split(',');
            featureTypes = featureTypes.map((item) => item.trim());
            json.featureTypes = featureTypes;
        }

        //format property Names
        if(defined(inputJson.propertyNames) && isString(inputJson.propertyNames)) {
            let propertyNames = inputJson.propertyNames.split(',');
            propertyNames = propertyNames.map((item) => item.trim());
            json.featureTypes = propertyNames;
        }

        return json;
    }

};

export default WfsGetFeatureOptionsFormat;