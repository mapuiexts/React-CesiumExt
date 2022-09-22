
import {Rectangle} from 'cesium';

class ImageryProviderFormat {
   /**
    * Convert a Cesium Url Template Imagery Provider to a json object,
    * @param {Cesium.UrlTemplateImageryProvider} provider 
    * @returns a Json object representing the provider
    */
   writeJson(provider) {
      const json = {};
      /* readonly minimumLevel (Number) */
      json.minimumLevel = provider.minimumLevel;
      /* readonly maximumLevel (Number) */
      json.maximumLevel = provider.maximumLevel;

      json.rectangle = provider.rectangle;

      /* readonly tilingScheme (TilingScheme) */
      json.tilingScheme = provider.tilingScheme;
      /* not available ellipsoid (Ellipsoid) */
      /* readonly tileWidth (Number) */
      json.tileWidth = provider.tileWidth;
      /* readonly tileHeight (Number) */
      json.tileHeight = provider.tileHeight;

      /* readonly credit (Credit | String) */
      json.credit = provider.credit;

      json.defaultAlpha  = provider.defaultAlpha;
      json.defaultBrightness  = provider.defaultBrightness;
      json.defaultContrast = provider.defaultContrast;
      json.defaultDayAlpha = provider.defaultDayAlpha;
      json.defaultGamma = provider.defaultGamma;
      json.defaultHue = provider.defaultHue;
      json.defaultMagnificationFilter = provider.defaultMagnificationFilter;
      json.defaultMinificationFilter = provider.defaultMinificationFilter;
      json.defaultNightAlpha = provider.defaultNightAlpha;
      json.defaultSaturation = provider.defaultSaturation;

      return json;
     }

   /**
    * Provides a provider json object with the default values
    * @returns a provider json with default values
    */
   writeJsonDefaultValues() {
      const json = {};
      /* readonly minimumLevel (Number) */
      json.minimumLevel = 0;
      /* readonly maximumLevel (Number) */
      json.maximumLevel = undefined;

      json.rectangle = Rectangle.MAX_VALUE;

      /* readonly tilingScheme (TilingScheme) */
      json.tilingScheme = undefined;
      /* not available ellipsoid (Ellipsoid) */
      /* readonly tileWidth (Number) */
      json.tileWidth = 256;
      /* readonly tileHeight (Number) */
      json.tileHeight = 256;

      /* readonly credit (Credit | String) */
      json.credit = undefined;

      json.defaultAlpha  = undefined;
      json.defaultBrightness  = undefined;
      json.defaultContrast = undefined;
      json.defaultDayAlpha = undefined;
      json.defaultGamma = undefined;
      json.defaultHue = undefined;
      json.defaultMagnificationFilter = undefined;
      json.defaultMinificationFilter = undefined;
      json.defaultNightAlpha = undefined;
      json.defaultSaturation = undefined;

      return json;
    }

    /**
     * Updates the provider with the values in the json object
     * @param {Object} json json object with the provider properties 
     * @param {*} provider the provider to be updated
     */
     readJson(json, provider) {
        'defaultAlpha' in json && (provider.defaultAlpha = json.defaultAlpha);
        'defaultBrightness' in json && (provider.defaultBrightness = json.defaultBrightness);
        'defaultContrast' in json && (provider.defaultContrast = json.defaultContrast);
        'defaultDayAlpha' in json && (provider.defaultDayAlpha = json.defaultDayAlpha);
        'defaultGamma' in json && (provider.defaultGamma = json.defaultGamma);
        'defaultHue' in json && (provider.defaultHue = json.defaultHue);
        'defaultMagnificationFilter' in json && (provider.defaultMagnificationFilter = json.defaultMagnificationFilter);
        'defaultMinificationFilter' in json && (provider.defaultMinificationFilter = json.defaultMinificationFilter);
        'defaultNightAlpha' in json && (provider.defaultNightAlpha = json.defaultNightAlpha);
        'defaultSaturation' in json && (provider.defaultSaturation = json.defaultSaturation);
     }
}

export default ImageryProviderFormat;