import {WebMapServiceImageryProvider, GeographicTilingScheme, defined} from "cesium";
import UrlTemplateImageryProviderFormat from "./UrlTemplateImageryProviderFormat";

class WebMapServiceImageryProviderFormat extends UrlTemplateImageryProviderFormat {

    /**
     * Convert a Cesium WebMapService(wms) Imagery Provider to a json object,
     * @param {WebMapServiceImageryProvider} provider 
     * @returns a Json object representing the provider
     */
     writeJson(provider) {
        const json = super.writeJson(provider);
        /* readonly layers separated by comma (String) */
        json.layers = provider.layers;
        /* clock (Clock) */
        //json.clock = provider.clock;
        /* times (TimeIntervalCollection) */
        //json.times = provider.times;
        /* readonly getFeatureInfoUrl (Resource | String) */
        json.getFeatureInfoUrl = provider.getFeatureInfoUrl;

        return json;
    }

    /**
     * Provides a provider json object with the default values
     * @returns a provider json with default values
     */
     writeJsonDefaultValues() {
        const json = super.writeJsonDefaultValues();
        /* readonly layers separated by comma (String) */
        json.layers = undefined;
        /* not available parameters */
        json.parameters = JSON.stringify(WebMapServiceImageryProvider.DefaultParameters, null, 4);
        /* not available getFeatureInfoParameters */
        json.getFeatureInfoParameters = JSON.stringify(WebMapServiceImageryProvider.GetFeatureInfoDefaultParameters, null, 4);
        /* not available getFeatureInfoFormats  (Array.<GetFeatureInfoFormat>) */
        json.getFeatureInfoFormats = WebMapServiceImageryProvider.DefaultGetFeatureInfoFormats;
        /* readonly tilingScheme (TilingScheme) */
        json.tilingScheme = new GeographicTilingScheme();
        /* not available crs */
        json.crs = undefined;
        /* not available srs */
        json.src = undefined;
        /* not available subdomains (String | Array.<String>) */
        /* clock (Clock) */
        //json.clock = undefined;
        /* times (TimeIntervalCollection) */
        //json.times = undefined;
        /* readonly getFeatureInfoUrl (Resource | String) */
        json.getFeatureInfoUrl = undefined;

        return json;
     }

    /**
     * Updates the provider with the values in the json object
     * @param {Object} json json object with the provider properties 
     * @param {WebMapServiceImageryProvider} provider the provider to be updated
     */
    readJson(json, provider) {
        super.readJson(json, provider);

        //'clock' in json && (provider.clock = json.clock);
        //'times' in json && (provider.times = json.times);
        if(defined(json.crs) && !defined(json.srs)) provider.srs = json.crs;
        if(defined(json.srs) && !defined(json.crs)) provider.crs = json.srs;
    }

    formatJson(json) {
        json.parameters = JSON.parse(json.parameters);
        json.getFeatureInfoParameters = JSON.parse(json.getFeatureInfoParameters);
    }

};

export default WebMapServiceImageryProviderFormat;