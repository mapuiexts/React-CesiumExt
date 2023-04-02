import {useCallback, useMemo} from 'react';
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

    //let DSForm = null;
    //let format = null;
    //let jsonDataSource = null;
    //const [format, setFormat] = useState(null);

    const internalOnFinish = useCallback((values) => {
        console.log(values);
        //update layer and its provider
        let newFormat = null;
        if(ds instanceof WfsGeoJsonDataSource ) {
            newFormat = new WfsGeoJsonDataSourceFormat();
        }
        else if(ds instanceof GeoJsonDataSource ) {
            newFormat = new GeoJsonDataSourceFormat();
        }
        else if(ds instanceof GpxDataSource ) {
            newFormat = new GpxDataSourceFormat();
        }
        else if(ds instanceof CzmlDataSource ) {
            newFormat = new CzmlDataSourceFormat();
        }
        else {
            newFormat = new DataSourceFormat();
        }
        newFormat.readJson(values, ds);
        console.log('edited datasource', ds);
        onFinish && onFinish(values);

    }, [ds, onFinish]);

    const component = useMemo(() => {
        if(defined(ds)) {
            let EditForm = null;
            let newFormat = null;
            if(ds instanceof WfsGeoJsonDataSource ) {
                EditForm = WfsGeoJsonDataSourceForm;
                newFormat = new WfsGeoJsonDataSourceFormat();
            }
            else if (ds instanceof GeoJsonDataSource ) {
                EditForm = GeoJsonDataSourceForm;
                newFormat = new GeoJsonDataSourceFormat();
            }
            else if(ds instanceof GpxDataSource ) {
                EditForm = GpxDataSourceForm;
                newFormat = new GpxDataSourceFormat();
            }
            else if(ds instanceof CzmlDataSource ) {
                EditForm = CzmlDataSourceForm;
                newFormat = new CzmlDataSourceFormat();
            }
            else {
                EditForm = DataSourceForm;
                newFormat = new DataSourceFormat();
            }
            //setFormat(newFormat);
            
            const jsonDataSource = newFormat.writeJson(ds);
            return(
                <EditForm 
                    {...otherProps}
                    initialValues={jsonDataSource}
                    onFinish={internalOnFinish}
                    onFinishFailed={onFinishFailed}
                    onClick={(e) => e.stopPropagation()}
                    mode="edit"
                />
            );
        }
        else {
            return null;
        }

    }, [ds, internalOnFinish, onFinishFailed, otherProps]);

   
    // console.log('ds', ds);
    // if(defined(ds)) {
    //     if(ds instanceof WfsGeoJsonDataSource ) {
    //         DSForm = WfsGeoJsonDataSourceForm;
    //         format = new WfsGeoJsonDataSourceFormat();
    //     }
    //     else if (ds instanceof GeoJsonDataSource ) {
    //         DSForm = GeoJsonDataSourceForm;
    //         format = new GeoJsonDataSourceFormat();
    //     }
    //     else if(ds instanceof GpxDataSource ) {
    //         DSForm = GpxDataSourceForm;
    //         format = new GpxDataSourceFormat();
    //     }
    //     else if(ds instanceof CzmlDataSource ) {
    //         DSForm = CzmlDataSourceForm;
    //         format = new CzmlDataSourceFormat();
    //     }
    //     else {
    //         DSForm = DataSourceForm;
    //         format = new DataSourceFormat();
    //     }

    //     if(defined(DSForm)) {
    //         jsonDataSource = format.writeJson(ds);
    //         console.log('json datasource for edit:', jsonDataSource);
    //     }
    // }

    

    return (
        component
        // defined(DSForm) &&
        // <DSForm 
        //     {...otherProps}
        //     initialValues={jsonDataSource}
        //     onFinish={internalOnFinish}
        //     onFinishFailed={onFinishFailed}
        //     onClick={(e) => e.stopPropagation()}
        //     mode="edit"
        // />
    );
};

export default EditDataSourceForm;