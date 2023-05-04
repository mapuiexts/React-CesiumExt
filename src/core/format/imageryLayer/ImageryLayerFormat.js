import {defined, ImageryLayer} from 'cesium';

class ImageryLayerFormat {

    /**
     * Convert a Cesium Imagery Layer to a json object,
     * @param {Cesium.ImageryLayer} layer 
     * @returns a Json object representing the layer
     */
    writeJson(layer) {
        const json = {};

        /* readonly rectangle*/
        json.rectangle = layer.rectangle;
        /* alpha */
        json.alpha = layer.alpha;
        /* nightAlpha */
        json.nightAlpha = layer.nightAlpha;
        /* dayAlpha */
        json.dayAlpha = layer.dayAlpha;
        /* brightness */
        json.brightness = layer.brightness;
        /* contrast */
        json.contrast = layer.contrast;
        /* hue */
        json.hue = layer.hue;
        /* saturation */
        json.saturation = layer.saturation;
        /* gamma */
        json.gamma = layer.gamma;
        /* splitDirection */
        json.splitDirection = layer.splitDirection;
        /* minificationFilter */
        json.minificationFilter = layer.minificationFilter;
        /* magnificationFilter */
        json.magnificationFilter = layer.magnificationFilter;
        /* show */
        json.show = layer.show;
        /* maximumAnisotropy not available */
        /* minimumTerrainLevel  not available */
        /* maximumTerrainLevel not available */
        /* cutoutRectangle */
        json.cutoutRectangle = layer.cutoutRectangle;
        /* colorToAlpha */
        json.colorToAlpha = layer.colorToAlpha;
        /* colorToAlphaThreshold */
        json.colorToAlphaThreshold = layer.colorToAlphaThreshold;

        return json;
    }

    /**
     * Provides a json object with the default values
     * @returns json with default values
     */
    writeJsonDefaultValues(providerOpts) {
        const json = {};
         /* readonly rectangle => default provided by ImageryLayer*/
         /* alpha */
        json.alpha = 1.0;
        /* nightAlpha */
        json.nightAlpha = 1.0;
        /* dayAlpha */
        json.dayAlpha = 1.0;
        /* brightness */
        json.brightness = ImageryLayer.DEFAULT_BRIGHTNESS;
        /* contrast */
        json.contrast = ImageryLayer.DEFAULT_CONTRAST;
        /* hue */
        json.hue = ImageryLayer.DEFAULT_HUE;
        /* saturation */
        json.saturation = ImageryLayer.DEFAULT_SATURATION;
        /* gamma */
        json.gamma = ImageryLayer.DEFAULT_GAMMA;
        /* splitDirection */
        json.splitDirection = ImageryLayer.DEFAULT_SPLIT;
        /* minificationFilter */
        json.minificationFilter = ImageryLayer.DEFAULT_MINIFICATION_FILTER;
        /* magnificationFilter */
        json.magnificationFilter = ImageryLayer.DEFAULT_MAGNIFICATION_FILTER;
        /* show */
        json.show = true;
        /* maximumAnisotropy not available */
        /* minimumTerrainLevel  not available */
        /* maximumTerrainLevel not available */
        /* cutoutRectangle no default value  */
        /* colorToAlpha no default value */
        /* colorToAlphaThreshold */
        json.colorToAlphaThreshold = ImageryLayer.DEFAULT_APPLY_COLOR_TO_ALPHA_THRESHOLD;

        return json;
    }

    readJson(json, layer) {
        if(!defined(json)) return;
        /* skip readonly rectangle*/
        /* alpha */
        'alpha' in json && (layer.alpha = json.alpha);
        /* nightAlpha */
        'nightAlpha' in json && (layer.nightAlpha = json.nightAlpha);
        /* dayAlpha */
        'dayAlpha' in json && (layer.dayAlpha = json.dayAlpha);
        /* brightness */
        'brightness' in json && (layer.brightness = json.brightness);
        /* contrast */
        'contrast' in json && (layer.contrast = json.contrast);
        /* hue */
        'hue' in json && (layer.hue = json.hue);
        /* saturation */
        'saturation' in json && (layer.saturation = json.saturation);
        /* gamma */
        'gamma' in json && (layer.gamma = json.gamma);
        /* splitDirection */
        'splitDirection' in json && (layer.splitDirection = json.splitDirection);
        /* minificationFilter */
        'minificationFilter' in json && (layer.minificationFilter = json.minificationFilter);
        /* magnificationFilter */
        'magnificationFilter' in json && (layer.magnificationFilter = json.magnificationFilter);
        /* show */
        'show' in json && (layer.show = json.show);
        /* maximumAnisotropy not available */
        /* minimumTerrainLevel  not available */
        /* maximumTerrainLevel not available */
        /* cutoutRectangle */
        'cutoutRectangle' in json && (layer.cutoutRectangle = json.cutoutRectangle);
        /* colorToAlpha */
        'colorToAlpha' in json && (layer.colorToAlpha = json.colorToAlpha);
        /* colorToAlphaThreshold */
        'colorToAlphaThreshold' in json && (layer.colorToAlphaThreshold = json.colorToAlphaThreshold);
    }

};

export default ImageryLayerFormat;