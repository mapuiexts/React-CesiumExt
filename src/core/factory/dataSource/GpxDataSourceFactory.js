import { GpxDataSource, defined, Color } from "cesium";


/**
 * Class to create the GpxDataSource and store and store on it 
 * its load options
 */
class GpxDataSourceFactory {

    constructor() {
        this._defaultLoadOptions = {
            clampToGround: true,
            waypointImage: undefined,
            trackImage: undefined,
            trackColor: Color.YELLOW.clone(),
            routeColor: Color.RED.clone()
        }
    }

    create(loadOptions = null) {
        let options = loadOptions;
        if(!defined(options)) {
            options = this.defaultLoadOptions
        }
        const ds = new GpxDataSource();
        ds._loadOptions = options;

        return ds;
    }

    get defaultLoadOptions() {
        return this._defaultLoadOptions;
    }
};

export default GpxDataSourceFactory;