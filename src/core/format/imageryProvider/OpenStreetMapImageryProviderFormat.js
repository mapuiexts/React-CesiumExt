import {WebMercatorTilingScheme} from 'cesium';
import UrlTemplateImageryProviderFormat from "./UrlTemplateImageryProviderFormat";

class OpenStreetMapImageryProviderFormat extends UrlTemplateImageryProviderFormat {

    /**
     * Convert a Cesium OSM Imagery Provider to a json object,
     * @param {Cesium.OpenStreetMapImageryProvider} provider 
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
        json.url = 'https://a.tile.openstreetmap.org';
        json.fileExtension = 'png';
        json.credit = 'MapQuest, Open Street Map and contributors, CC-BY-SA'
        json.tilingScheme = new WebMercatorTilingScheme();

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

export default OpenStreetMapImageryProviderFormat;