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
    }
};

export default ImageryLayerFactory;