
import ImageryProviderFormat from './ImageryProviderFormat';
/**
 * Class to read/write the cesium UrlTemplateImageryProvider
 */
class UrlTemplateImageryProviderFormat extends ImageryProviderFormat  {
    /**
     * Convert a Cesium Url Template Imagery Provider to a json object,
     * @param {Cesium.UrlTemplateImageryProvider} provider 
     * @returns a Json object representing the provider
     */
    writeJson(provider) {
        const json = super.writeJson(provider);;
        
        /* readonly url (Resource | String) */
        json.url = provider.url;
        /* readonly pickFeaturesUrl (Resource | String) */
        //json.pickFeaturesUrl = provider.pickFeaturesUrl;
        /* readonly urlSchemeZeroPadding (Object) */
        json.urlSchemeZeroPadding = provider.urlSchemeZeroPadding;
        /* not available subdomains (String | Array.<String>) */
        //json.subdomains = provider.subdomains;
        
        /* readonly hasAlphaChannel  (Boolean) */
        json.hasAlphaChannel = provider.hasAlphaChannel;
        /* not available getFeatureInfoFormats  (Array.<GetFeatureInfoFormat>) */
        /* enablePickFeatures  (Boolean) */
        json.enablePickFeatures = provider.enablePickFeatures;
        /* not available customTags  (Object) */

        return json;
    }

    /**
     * Provides a provider json object with the default values
     * @returns a provider json with default values
     */
    writeJsonDefaultValues() {
        const json = super.writeJsonDefaultValues();
        /* readonly url (Resource | String) */
        json.url = undefined;
        /* readonly pickFeaturesUrl (Resource | String) */
        //json.pickFeaturesUrl = undefined;
        /* readonly urlSchemeZeroPadding (Object) */
        json.urlSchemeZeroPadding = undefined;
        /* not available subdomains (String | Array.<String>) */
        json.subdomains = 'abc';
        
        /* readonly rectangle (Rectangle) */
        //json.rectangle = provider.rectangle;
        
        /* readonly hasAlphaChannel  (Boolean) */
        json.hasAlphaChannel = true;
        /* not available getFeatureInfoFormats  (Array.<GetFeatureInfoFormat>) */
        /* enablePickFeatures  (Boolean) */
        json.enablePickFeatures = true;
        /* not available customTags  (Object) */

        return json;
    }


    /**
     * Updates the provider with the values in the json object
     * @param {Object} json json object with the provider properties 
     * @param {*} provider the provider to be updated
     */
    readJson(json, provider) {
        super.readJson(json, provider);
        /* skip readonly url (Resource | String) */
        /* skip readonly pickFeaturesUrl (Resource | String) */
        /* skip readonly urlSchemeZeroPadding (Object) */
        /* skip not available subdomains (String | Array.<String>) */
        /* skip readonly credit (Credit | String) */
        /* skip readonly minimumLevel (Number) */
        /* skip readonly maximumLevel (Number) */
        /* skip readonly rectangle (Rectangle) */
        /* skip readonly tilingScheme (TilingScheme) */
        /* skip not available ellipsoid property (Ellipsoid) */
        /* skip readonly tileWidth (Number) */
        /* skip readonly tileHeight (Number) */
        /* skip readonly hasAlphaChannel  (Boolean) */
        /* skip not available getFeatureInfoFormats property  (Array.<GetFeatureInfoFormat>) */

        /* enablePickFeatures  (Boolean) */
        'enablePickFeatures' in json && (provider.enablePickFeatures = json.enablePickFeatures);
    }
};

export default UrlTemplateImageryProviderFormat;
