
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

      return json;
    }

    /**
     * Updates the provider with the values in the json object
     * @param {Object} json json object with the provider properties 
     * @param {*} provider the provider to be updated
     */
     readJson(json, provider) {
        
     }
}

export default ImageryProviderFormat;