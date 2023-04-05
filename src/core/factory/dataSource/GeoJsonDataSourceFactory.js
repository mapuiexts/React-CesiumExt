import { GeoJsonDataSource, defined, Color } from "cesium";


/**
 * Class to create the GeoJsonDataSource and store and store on it 
 * its load options
 */
class GeoJsonDataSourceFactory {

    constructor() {
        this._defaultLoadOptions = {
            clampToGround: true,
            fill: Color.fromAlpha(Color.YELLOW, 0.6),
            markerColor: Color.ROYALBLUE.clone(),
            markerSize: 48,
            markerSymbol: undefined,
            stroke: Color.YELLOW.clone(),
            strokeWidth: 2
        }
    }

    create(name, loadOptions = null) {
        let options = loadOptions;
        if(!defined(options)) {
            options = this.defaultLoadOptions
        }
        const ds = new GeoJsonDataSource(name);
        ds._loadOptions = options;

        return ds;
    }

    get defaultLoadOptions() {
        return this._defaultLoadOptions;
    }
};

export default GeoJsonDataSourceFactory;