import { Color, defined}  from 'cesium';
import DataSourceFormat from "./DataSourceFormat";

class GeoJsonDataSourceFormat extends DataSourceFormat {

    /**
     * Convert a Cesium GeoJsonDataSource to a json object,
     * @param {Cesium.GeoJsonDataSource} dataSource 
     * @returns a Json object representing the GeoJson dataSource
     */
    writeJson(dataSource) {
        const json = super.writeJson();
        json.clampToGround = dataSource.clampToGround;
        json.fill = dataSource.fill.toCssHexString();
        json.alphaFill = dataSource.fill.alpha;
        json.markerColor = dataSource.markerColor.toCssHexString();
        json.markerSize = dataSource.markerSize;
        json.markerSymbol = dataSource.markerSymbol;
        json.stroke = dataSource.stroke.toCssHexString();
        json.strokeWidth = dataSource.strokeWidth;

        return json;
    }

    /**
     * Provides a json object with the default values
     * @returns json with default values
     */
    writeJsonDefaultValues() {
        const json = super.writeJsonDefaultValues();
        json.clampToGround = false;
        json.fill = Color.YELLOW.toCssHexString();
        json.alphaFill = 0.6;
        json.markerColor = Color.ROYALBLUE.toCssHexString();
        json.markerSize = 48;
        json.markerSymbol = undefined;
        json.stroke = Color.YELLOW.toCssHexString();
        json.strokeWidth = 2;

        return json;
    }

    /**
     * Read the json object and update the GeoJson dataSource
     * @param {Object} json the json object to be read
     * @param {Cesium.GeoJsonDataSource} dataSource the cesium GeoJson dataSource to be updated
     */
    readJson(json, dataSource) {
        if(!defined(json)) return;
        'clampToGround' in json && (dataSource.clampToGround = json.clampToGround);
        'fill' in json && (dataSource.fill = Color.fromAlpha(Color.fromCssColorString(json.fill, dataSource.fill), json.alphaFill, dataSource.fill) );
        'markerColor' in json && (dataSource.markerColor = Color.fromCssColorString(json.markerColor, dataSource.markerColor));
        'markerSize' in json && (dataSource.markerSize = json.markerSize);
        'markerSymbol' in json && (dataSource.markerSymbol = json.markerSymbol);
        'stroke' in json && (dataSource.stroke = Color.fromCssColorString(json.stroke, dataSource.stroke));
        'strokeWidth' in json && (dataSource.strokeWidth = json.strokeWidth);
    }

};

export default GeoJsonDataSourceFormat;