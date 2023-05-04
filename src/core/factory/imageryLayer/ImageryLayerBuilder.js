import ImageryLayerFactory from "./ImageryLayerFactory";
 
/**
 * Class to build the layesr based in the options defined
 * by react-cesiumext library.
 */
class ImageryLayerBuilder {
    constructor(factory = new ImageryLayerFactory()) {
        this._factory = factory;
    }

    /**
     * Build all the layers defined in the options parameter.
     * The options format is defined by react-cesiumext library.
     * See in the asset folder some examples.
     * @deprecated
     * @param {*} options 
     * @param {*} layerCollection 
     */
    build(options, layerCollection) {
        const layers = options.layers;
        //create the layer in the reverse order so that 
        //the first one will be on the top.
        for(let idx=layers.length - 1; idx >=0; --idx) {
            const layer = this._factory.buildLayer(layers[idx]);
            layerCollection.add(layer);
        }
    }

    /**
     * Build assynchronously all the layers defined in the options parameter.
     * The options format is defined by react-cesiumext library.
     * See in the asset folder some examples.
     * @param {*} options 
     * @param {*} layerCollection 
     */
    async buildAsync(options, layerCollection) {
        const layers = options.layers;
        //create the layer in the reverse order so that 
        //the first one will be on the top.
        for(let idx=layers.length - 1; idx >=0; --idx) {
            const layer = await this._factory.buildLayerAsync(layers[idx]);
            layerCollection.add(layer);
        }
    }
};

export default ImageryLayerBuilder;