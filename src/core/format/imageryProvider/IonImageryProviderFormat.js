import {Ion} from 'cesium';
import ImageryProviderFormat from './ImageryProviderFormat';

class IonImageryProviderFormat extends ImageryProviderFormat {

    /**
     * Convert a Cesium Ion Imagery Provider to a json object,
     * @param {Cesium.IonImageryProvider} provider 
     * @returns a Json object representing the provider
     */
    writeJson(provider) {
        const json = super.writeJson(provider);
        return json;
    }

    /**
     * Provides a provider json object with the default values
     * @returns a provider json with default values
     */
     writeJsonDefaultValues() {
        const json = super.writeJsonDefaultValues();
        json.accessToken = Ion.defaultAccessToken;
        json.server = Ion.defaultServer;

        return json;
     };

     /**
     * Updates the provider with the values in the json object
     * @param {Object} json json object with the provider properties 
     * @param {*} provider the provider to be updated
     */
    readJson(json, provider) {
        super.readJson(json, provider);
    }
};

export default IonImageryProviderFormat;