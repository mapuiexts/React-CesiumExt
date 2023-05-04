import {useCallback} from 'react';
import {GeoJsonDataSource, CzmlDataSource, GpxDataSource, defined} from 'cesium';
import WfsGeoJsonDataSource from '../../../core/packages/engine/DataSources/WfsGeoJsonDataSource';
import DataSourceForm from './DataSourceForm';
import WfsGeoJsonDataSourceForm from './WfsGeoJsonDataSourceForm';
import GeoJsonDataSourceForm from './GeoJsonDataSourceForm';
import GpxDataSourceForm from './GpxDataSourceForm';
import CzmlDataSourceForm from './CzmlDataSourceForm';
import DataSourceFormat from '../../../core/format/dataSource/DataSourceFormat';
import WfsGeoJsonDataSourceFormat from '../../../core/format/dataSource/WfsGeoJsonDataSourceFormat';
import GeoJsonDataSourceFormat from '../../../core/format/dataSource/GeoJsonDataSourceFormat';
import GpxDataSourceFormat from '../../../core/format/dataSource/GpxDataSourceFormat';
import CzmlDataSourceFormat from '../../../core/format/dataSource/CzmlDataSourceFormat';

const EditDataSourceForm = ({
    ds,
    onFinish,
    onFinishFailed,
    ...otherProps
}) => {

    let DSForm = null;
    let format = null;
    let jsonDataSource = null;
   
    if(defined(ds)) {
        if(ds instanceof WfsGeoJsonDataSource ) {
            DSForm = WfsGeoJsonDataSourceForm;
            format = new WfsGeoJsonDataSourceFormat();
        }
        else if (ds instanceof GeoJsonDataSource ) {
            DSForm = GeoJsonDataSourceForm;
            format = new GeoJsonDataSourceFormat();
        }
        else if(ds instanceof GpxDataSource ) {
            DSForm = GpxDataSourceForm;
            format = new GpxDataSourceFormat();
        }
        else if(ds instanceof CzmlDataSource ) {
            DSForm = CzmlDataSourceForm;
            format = new CzmlDataSourceFormat();
        }
        else {
            DSForm = DataSourceForm;
            format = new DataSourceFormat();
        }

        if(defined(DSForm)) {
            jsonDataSource = format.writeJson(ds);
        }
    }

    const internalOnFinish = useCallback((values) => {
        //update layer and its provider
        format.readJson(values, ds);
        onFinish && onFinish(values);
        

    }, [ds, format, onFinish]);

    return (
        defined(DSForm) &&
        <DSForm 
            {...otherProps}
            initialValues={jsonDataSource}
            onFinish={internalOnFinish}
            onFinishFailed={onFinishFailed}
            onClick={(e) => e.stopPropagation()}
            mode="edit"
        />
    );
};

export default EditDataSourceForm;