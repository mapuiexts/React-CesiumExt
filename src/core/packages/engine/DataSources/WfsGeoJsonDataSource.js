import { GeoJsonDataSource } from "cesium";

class WfsGeoJsonDataSource extends GeoJsonDataSource {
    constructor(name, /*resource, wfsOptions,*/ style = WfsGeoJsonDataSource.defaultStyle) {
        super(name);
        this._resource = undefined;
        this._style = style;
        this._wfsGetFeature = undefined;
    }

    get resource() {
        return this._resource;
    }

    set resource(value) {
        this._resource = value;
    }

    get style() {
        return this._style;
    }

    set style(value) {
        this._style = value;
    }

    get wfsGetFeature() {
        return this._wfsGetFeature;
    }

    set wfsGetFeature(value) {
        this._wfsGetFeature = value;
    }
};
/*
WfsGeoJsonDataSource.defaultStyle = {
    markerSize: 48,
    markerSymbol: undefined,
    markerColor: Color.ROYALBLUE.toCssHexString(),
    stroke: GeoJsonDataSource.stroke,
    strokeWidth: GeoJsonDataSource.strokeWidth,
    fill: GeoJsonDataSource.fill,
    clampToGround: GeoJsonDataSource.clampToGround
};
*/

export default WfsGeoJsonDataSource;