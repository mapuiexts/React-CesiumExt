import { useMemo } from "react";
import { Dropdown } from 'antd';
import { defined, GpxDataSource, KmlDataSource, GeoJsonDataSource, CzmlDataSource } from 'cesium';
import WfsGeoJsonDataSource from "../../../../core/packages/engine/DataSources/WfsGeoJsonDataSource";
import NewGeoJsonDataSourceButton from '../../../button/dataSource/NewGeoJsonDataSourceButton/NewGeoJsonDataSourceButton';
import NewWfsGeoJsonDataSourceButton from "../../../button/dataSource/NewWfsGeoJsonDataSourceButton/NewWfsGeoJsonDataSourceButton";
import NewCzmlDataSourceButton from "../../../button/dataSource/NewCzmlDataSourceButton/NewCzmlDataSourceButton";
import NewGpxDataSourceButton from "../../../button/dataSource/NewGpxDataSourceButton/NewGpxDataSourceButton";
import FlyToDataSourceButton from "../../../button/dataSource/FlyToDataSourceButton/FlyToDataSourceButton";
import RemoveDataSourceButton from "../../../button/dataSource/RemoveDataSourceButton/RemoveDataSourceButton";
import LoadDataSourceFromResourceButton from "../../../button/dataSource/LoadDataSourceFromResourceButton/LoadDataSourceFromResourceButton";
import LoadDataSourceFromXmlDataButton from "../../../button/dataSource/LoadDataSourceFromXmlDataButton/LoadDataSourceFromXmlDataButton";
import LoadDataSourceFromJsonDataButton from '../../../button/dataSource/LoadDataSourceFromJsonDataButton/LoadDataSourceFromJsonDataButton'; 
import UnloadDataSourceButton from "../../../button/dataSource/UnloadDataSourceButton/UnloadDataSourceButton";
import EditDataSourceButton from "../../../button/dataSource/EditDataSourceButton/EditDataSourceButton";
import WfsGetFeatureByPolygonButton from "../../../button/wfs/WfsGetFeatureByPolygonButton/WfsGetFeatureByPolygonButton";


const DataSourceContextMenu = ({
    viewer,
    ds,
    menuPropsFunc,
    children,
    ...otherProps
}) => {

    const menuProps = useMemo(() => {
        //defined(ds) && console.log(ds.constructor.name, ds.constructor.name);
        //const typeName = defined(ds) ? ds.constructor.name : undefined;
        if(defined(menuPropsFunc)) {
          return menuPropsFunc(viewer, ds);
        }
        else {
            const props = {items:[]};
            //New dataSources
            if(!defined(ds)) {
                props.items.push({
                    label: <NewGeoJsonDataSourceButton size="small" type="text" viewer={viewer}>New GeoJson DataSource</NewGeoJsonDataSourceButton>,
                    key: 'NEW_GEOJSON_DS',
                });
            }
            if(!defined(ds)) {
                props.items.push({
                    label: <NewWfsGeoJsonDataSourceButton size="small" type="text" viewer={viewer}>New Wfs GeoJson DataSource</NewWfsGeoJsonDataSourceButton>,
                    key: 'NEW_WFS_GEOJSON_DS',
                });
            }
            if(!defined(ds)) {
                props.items.push({
                    label: <NewCzmlDataSourceButton size="small" type="text" viewer={viewer}>New Czml DataSource</NewCzmlDataSourceButton>,
                    key: 'NEW_CZML_DS',
                });
            }
            if(!defined(ds)) {
                props.items.push({
                    label: <NewGpxDataSourceButton size="small" type="text" viewer={viewer}>New Gpx DataSource</NewGpxDataSourceButton>,
                    key: 'NEW_GPX_DS',
                });
            }
            //Fly To
            if(defined(ds) /*&& ds.entities.values.length > 0*/) {
                props.items.push({
                    label: <FlyToDataSourceButton size="small" type="text" viewer={viewer} ds={ds}>Fly to Entities</FlyToDataSourceButton>,
                    key: 'FLY_TO_DS'
                });
            }
            //Load ds
            if(defined(ds) && !(ds instanceof WfsGeoJsonDataSource)) {
                props.items.push({
                    label: <LoadDataSourceFromResourceButton size="small" type="text" viewer={viewer} ds={ds}>Load from Url</LoadDataSourceFromResourceButton>,
                    key: 'LOAD_DS_FROM_RESOURCE',
                });
            }
            if(defined(ds) && ((ds instanceof GpxDataSource) || (ds instanceof KmlDataSource))) {
                props.items.push({
                    label: <LoadDataSourceFromXmlDataButton size="small" type="text" viewer={viewer} ds={ds}>Load Data</LoadDataSourceFromXmlDataButton>,
                    key: 'LOAD_DS_FROM_XML_DATA'
                });
            }
            if(defined(ds) && ((ds instanceof GeoJsonDataSource) || (ds instanceof CzmlDataSource))  && !(ds instanceof WfsGeoJsonDataSource)) {
                props.items.push({
                    label: <LoadDataSourceFromJsonDataButton size="small" type="text" viewer={viewer} ds={ds}>Load Data</LoadDataSourceFromJsonDataButton>,
                    key: 'LOAD_DS_FROM_JSON_DATA'
                });
            }
            if(defined(ds) && ((ds instanceof WfsGeoJsonDataSource))) {
                props.items.push({
                    label: <WfsGetFeatureByPolygonButton size="small" type="text" viewer={viewer} ds={ds} >Filter by Polygon</WfsGetFeatureByPolygonButton>,
                    key: 'LOAD_DS_FROM_WFS_GET_FEATURE_BY_POLYGON',
                });
            }
            //unload ds
            if(defined(ds)) {
                props.items.push({
                    label: <UnloadDataSourceButton size="small" type="text" ds={ds}>Unload DataSource</UnloadDataSourceButton>,
                    key: 'UNLOAD_DS'
                });
            }
            //edit ds
            if(defined(ds)) {
                props.items.push({
                    label: <EditDataSourceButton size="small" type="text" ds={ds}>Edit DataSource</EditDataSourceButton>,
                    key: 'EDIT_DS'
                });
            }
            //remove ds
            if(defined(ds)) {
                props.items.push({
                    label: <RemoveDataSourceButton size="small" type="text" ds={ds} dsCollection={viewer.dataSources}>Remove DataSource</RemoveDataSourceButton>,
                    key: 'REMOVE_DS',
                });
            }
            
            return(props);
        }
    }, [viewer, ds,  menuPropsFunc]);

    return (
        <Dropdown 
            {...otherProps}
            menu={menuProps} 
            trigger={['contextMenu']}
        >
            {children}
        </Dropdown>
    );
};

export default DataSourceContextMenu;