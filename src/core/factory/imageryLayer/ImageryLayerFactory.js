import {
    defined, 
    DeveloperError,
    ImageryLayer,
    ArcGisMapServerImageryProvider,
    BingMapsImageryProvider,
    OpenStreetMapImageryProvider,
    WebMapServiceImageryProvider, 
    IonImageryProvider,
    createGuid
} from 'cesium';

class ImageryLayerFactory {
    /**
     * Build the layer based on the options
     * Depracated method. Use the async method.
     * @deprecated
     * @param {*} options 
     * @returns 
     */
    buildLayer(options) {
        const type = options.type;
        const providerOpts = options.provider;
        const layerOpts = options.options;
        const title = options.title;
        const key = options.key;

        if(defined(type) && defined(providerOpts) && defined(layerOpts)) {
            let provider = null;
            switch(type) {
                case 'ArcGisMapServer':
                    provider = new ArcGisMapServerImageryProvider(providerOpts);
                    break;
                case 'BingMaps':
                    provider = new BingMapsImageryProvider(providerOpts);
                    break;
                case 'OpenStreetMap':
                    provider = new OpenStreetMapImageryProvider(providerOpts);
                    break;
                case 'WebMapService':
                    provider = new WebMapServiceImageryProvider(providerOpts);
                    break;
                case 'Ion':
                    provider = new IonImageryProvider(providerOpts);
                    break;
                default:
                    break;
            }
            if(defined(provider)) {
                const layer = new ImageryLayer(provider, layerOpts);
                defined(title) ? layer._title = title : layer._title = layer.imageryProvider.constructor.name;
                defined(key) ? layer._key = key : layer._key = createGuid();
                return layer;
            }
            return null;
        }
        else {
            throw new DeveloperError(
                "parameter must have the keys: type, options and provider"
            );
        }
    };

    async buildLayerAsync(options) {
        const type = options.type;
        const allProviderOpts = options.provider;
        const {url, assetId, ...providerOpts} = allProviderOpts;
        const layerOpts = options.options;
        const title = options.title;
        const key = options.key;

        if(defined(type) && defined(allProviderOpts) && defined(layerOpts)) {
            let provider = null;
            switch(type) {
                case 'ArcGisMapServer':
                    provider = await ArcGisMapServerImageryProvider.fromUrl(url, providerOpts);
                    break;
                case 'BingMaps':
                    provider = await BingMapsImageryProvider.fromUrl(url, providerOpts);
                    break;
                case 'OpenStreetMap':
                    provider = new OpenStreetMapImageryProvider(allProviderOpts);
                    break;
                case 'WebMapService':
                    provider = new WebMapServiceImageryProvider(allProviderOpts);
                    break;
                case 'Ion':
                    provider = await IonImageryProvider.fromAssetId(assetId, providerOpts);
                    break;
                default:
                    break;
            }
            if(defined(provider)) {
                const layer = new ImageryLayer(provider, layerOpts);
                defined(title) ? layer._title = title : layer._title = layer.imageryProvider.constructor.name;
                defined(key) ? layer._key = key : layer._key = createGuid();
                return layer;
            }
            return null;
        }
        else {
            throw new DeveloperError(
                "parameter must have the keys: type, options and provider"
            );
        }
    }
};

export default ImageryLayerFactory;