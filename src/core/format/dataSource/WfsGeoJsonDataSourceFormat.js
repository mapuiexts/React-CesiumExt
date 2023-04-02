import { Color, defined}  from 'cesium';
import DataSourceFormat from "./DataSourceFormat";
import ResourceFormat from '../resource/ResourceFormat';
import WfsGetFeatureOptionsFormat from '../wfs/WfsGetFeatureOptionsFormat';

class WfsGeoJsonDataSourceFormat extends DataSourceFormat {

    /**
     * Convert a  WfsGeoJsonDataSource to a json object,
     * @param {WfsGeoJsonDataSource} dataSource 
     * @returns a Json object representing the GeoJson dataSource
     */
    writeJson(dataSource) {
        const json = super.writeJson(dataSource);
        
        if(defined(dataSource.style)) {
            json.style = {};
            json.style.clampToGround = dataSource.style.clampToGround;
            if(defined(dataSource.style.fill)) {
                const red = dataSource.style.fill.red;
                const green = dataSource.style.fill.green;
                const blue = dataSource.style.fill.blue;
                json.style.fill = new Color(red, green, blue, 1.0).toCssHexString();
                json.style.alphaFill = dataSource.style.fill.alpha;
            }
            json.style.markerColor = dataSource.style.markerColor?.toCssHexString();
            json.style.markerSize = dataSource.style.markerSize;
            json.style.markerSymbol = dataSource.style.markerSymbol;
            json.style.stroke = dataSource.style.stroke?.toCssHexString();
            json.style.strokeWidth = dataSource.style.strokeWidth;
        }

        if(defined(dataSource.resource)) {
            const resourceFormat = new ResourceFormat();
            const resourceJson = resourceFormat.writeJson(dataSource.resource);
            json.resource = resourceJson;
        }

        if(defined(dataSource.wfsGetFeature)) {
            const wfsOptionsFormat = new WfsGetFeatureOptionsFormat();
            json.wfsGetFeature = wfsOptionsFormat.writeJson(dataSource.wfsGetFeature);
        }

        return json;
    }

    /**
     * Provides a json object with the default values
     * @returns json with default values
     */
    writeJsonDefaultValues() {
        const json = super.writeJsonDefaultValues();
        //add style default values
        json.style = {};
        json.style.clampToGround = true;
        json.style.fill = Color.YELLOW.toCssHexString();
        json.style.alphaFill = 0.6;
        json.style.markerColor = Color.ROYALBLUE.toCssHexString();
        json.style.markerSize = 48;
        json.style.markerSymbol = undefined;
        json.style.stroke = Color.YELLOW.toCssHexString();
        json.style.strokeWidth = 2;
        //add resource default values
        const resourceFormat = new ResourceFormat();
        json.resource = resourceFormat.writeJsonDefaultValuesForWfs();
        //add wfs get feature options default values
        const wfsOptionsFormat = new WfsGetFeatureOptionsFormat();
        json.wfsGetFeature = wfsOptionsFormat.writeJsonDefaultValues();
        
        return json;
    }

    /**
     * Read the json object and update the GeoJson dataSource
     * @param {Object} json the json object to be read
     * @param {WfsGeoJsonDataSource} dataSource the cesium GeoJson dataSource to be updated
     */
    readJson(json, dataSource) {
        super.readJson(json, dataSource, true);
        console.log('json.style', json.style);
        console.log('dataSource.style', dataSource.style);
        //update dataSource with style
        if(!defined(json) && !defined(json.style)) return;
        if(!defined(dataSource.style)) dataSource.style = {};
        'clampToGround' in json.style && (dataSource.style.clampToGround = json.style.clampToGround);
        'fill' in json.style 
            && (dataSource.style.fill = Color.fromAlpha(Color.fromCssColorString(json.style.fill, dataSource.style.fill), json.style.alphaFill, dataSource.style.fill) );
        //'markerColor' in json.style 
            /*&&*/ (dataSource.style.markerColor = Color.fromCssColorString(json.style.markerColor, dataSource.style.markerColor));
        
        'markerSize' in json.style 
            && (dataSource.style.markerSize = json.style.markerSize);
        'markerSymbol' in json.style && 
            (dataSource.style.markerSymbol = json.style.markerSymbol);
        'stroke' in json.style 
            && (dataSource.style.stroke = Color.fromCssColorString(json.style.stroke, dataSource.style.stroke));
        'strokeWidth' in json.style 
            && (dataSource.style.strokeWidth = json.style.strokeWidth);
        //update dataSource with new resource
        const resourceFormat = new ResourceFormat();
        dataSource.resource = resourceFormat.readJson(json.resource);
        //update datasource with the wfs get feature options
        const wfsOptionsFormat = new WfsGetFeatureOptionsFormat();
        dataSource.wfsGetFeature = wfsOptionsFormat.readJson(json.wfsGetFeature);
    }

    /**
     * Retrieve the loadOptions from json object 
     * representing the GeoJsonDataSource
     * @param {*} json 
     */
    /*
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
    */

};

export default WfsGeoJsonDataSourceFormat;