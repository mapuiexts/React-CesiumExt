import { Color, defined}  from 'cesium';
import DataSourceFormat from "./DataSourceFormat";

class GeoJsonDataSourceFormat extends DataSourceFormat {

    /**
     * Convert a Cesium GeoJsonDataSource to a json object,
     * @param {Cesium.GeoJsonDataSource} dataSource 
     * @returns a Json object representing the GeoJson dataSource
     */
    writeJson(dataSource) {
        const json = super.writeJson(dataSource);
        
        if(defined(dataSource._loadOptions)) {
            json._loadOptions = {};
            json._loadOptions.clampToGround = dataSource._loadOptions.clampToGround;
            
            if(defined(dataSource._loadOptions.fill)) {
                const red = dataSource._loadOptions.fill.red;
                const green = dataSource._loadOptions.fill.green;
                const blue = dataSource._loadOptions.fill.blue;
                json._loadOptions.fill = new Color(red, green, blue, 1.0).toCssHexString();
                json._loadOptions.alphaFill = dataSource._loadOptions.fill.alpha;
            }

            json._loadOptions.markerColor = dataSource._loadOptions.markerColor?.toCssHexString();
            json._loadOptions.markerSize = dataSource._loadOptions.markerSize;
            json._loadOptions.markerSymbol = dataSource._loadOptions.markerSymbol;
            json._loadOptions.stroke = dataSource._loadOptions.stroke?.toCssHexString();
            json._loadOptions.strokeWidth = dataSource._loadOptions.strokeWidth;
        }

        return json;
    }

    /**
     * Provides a json object with the default values
     * @returns json with default values
     */
    writeJsonDefaultValues() {
        const json = super.writeJsonDefaultValues();
        
        json._loadOptions = {};
        json._loadOptions.clampToGround = true;
        json._loadOptions.fill = Color.YELLOW.toCssHexString();
        json._loadOptions.alphaFill = 0.6;
        json._loadOptions.markerColor = Color.ROYALBLUE.toCssHexString();
        json._loadOptions.markerSize = 48;
        json._loadOptions.markerSymbol = undefined;
        json._loadOptions.stroke = Color.YELLOW.toCssHexString();
        json._loadOptions.strokeWidth = 2;

        return json;
    }

    /**
     * Read the json object and update the GeoJson dataSource
     * @param {Object} json the json object to be read
     * @param {Cesium.GeoJsonDataSource} dataSource the cesium GeoJson dataSource to be updated
     */
    readJson(json, dataSource) {
        super.readJson(json, dataSource, true);
        
        if(!defined(json) && !defined(json._loadOptions)) return;
        if(!defined(dataSource._loadOptions)) dataSource._loadOptions = {};
        'clampToGround' in json._loadOptions && (dataSource._loadOptions.clampToGround = json._loadOptions.clampToGround);
        'fill' in json._loadOptions 
            && (dataSource._loadOptions.fill = Color.fromAlpha(Color.fromCssColorString(json._loadOptions.fill, dataSource._loadOptions.fill), json._loadOptions.alphaFill, dataSource._loadOptions.fill) );
        'markerColor' in json._loadOptions 
            && (dataSource._loadOptions.markerColor = Color.fromCssColorString(json._loadOptions.markerColor, dataSource._loadOptions.markerColor));
        'markerSize' in json._loadOptions 
            && (dataSource._loadOptions.markerSize = json._loadOptions.markerSize);
        'markerSymbol' in json._loadOptions && 
            (dataSource._loadOptions.markerSymbol = json._loadOptions.markerSymbol);
        'stroke' in json._loadOptions 
            && (dataSource._loadOptions.stroke = Color.fromCssColorString(json._loadOptions.stroke, dataSource._loadOptions.stroke));
        'strokeWidth' in json._loadOptions 
            && (dataSource._loadOptions.strokeWidth = json._loadOptions.strokeWidth);
    }

    /**
     * Retrieve the loadOptions from json object 
     * representing the GeoJsonDataSource
     * @param {*} json 
     */
    getLoadOptions(json) {
        const loadOptions =  {...json._loadOptions};
        //set 'fill' color
        loadOptions.fill = Color.fromCssColorString(loadOptions.fill);
        loadOptions.fill = loadOptions.fill.withAlpha(loadOptions.alphaFill, loadOptions.fill);
        //set 'markerColor' color
        loadOptions.markerColor = Color.fromCssColorString(loadOptions.markerColor);
        //set 'stroke' color
        loadOptions.stroke = Color.fromCssColorString(loadOptions.stroke);
        //delete 'alphaFill'
        delete loadOptions.alphaFill;

        return loadOptions;
    }

};

export default GeoJsonDataSourceFormat;