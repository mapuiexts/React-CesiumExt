import { useCallback } from "react";
import { Menu, Dropdown } from 'antd';
import { defined, GpxDataSource, KmlDataSource, GeoJsonDataSource, CzmlDataSource } from 'cesium';
import NewGeoJsonDataSourceButton from '../../../button/dataSource/NewGeoJsonDataSourceButton/NewGeoJsonDataSourceButton';
import NewCzmlDataSourceButton from "../../../button/dataSource/NewCzmlDataSourceButton/NewCzmlDataSourceButton";
import NewGpxDataSourceButton from "../../../button/dataSource/NewGpxDataSourceButton/NewGpxDataSourceButton";
import FlyToDataSourceButton from "../../../button/dataSource/FlyToDataSourceButton/FlyToDataSourceButton";
import RemoveDataSourceButton from "../../../button/dataSource/RemoveDataSourceButton/RemoveDataSourceButton";
import LoadDataSourceFromResourceButton from "../../../button/dataSource/LoadDataSourceFromResourceButton/LoadDataSourceFromResourceButton";
import LoadDataSourceFromXmlDataButton from "../../../button/dataSource/LoadDataSourceFromXmlDataButton/LoadDataSourceFromXmlDataButton";
import LoadDataSourceFromJsonDataButton from '../../../button/dataSource/LoadDataSourceFromJsonDataButton/LoadDataSourceFromJsonDataButton'; 
import UnloadDataSourceButton from "../../../button/dataSource/UnloadDataSourceButton/UnloadDataSourceButton";
import EditDataSourceButton from "../../../button/dataSource/EditDataSourceButton/EditDataSourceButton";
import WfsGetFeatureButton from "../../../button/wfs/WfsGetFeatureButton/WfsGetFeatureButton";
import WfsGetFeatureByPolygonButton from "../../../button/wfs/WfsGetFeatureByPolygonButton/WfsGetFeatureByPolygonButton";
import NewWfsConfigDataSourceButton from '../../../button/dataSource/NewWfsConfigDataSourceButton/NewWfsConfigDataSourceButton';

const wfsUrl = 'https://geoservices.informatievlaanderen.be/overdrachtdiensten/Adressen/wfs';
const wfsResourceOptions = {url: 'https://geoservices.informatievlaanderen.be/overdrachtdiensten/Adressen/wfs'};
const wfsOptions = {
  //srsName: 'urn:x-ogc:def:crs:EPSG:4326',
  srsName: 'EPSG:4326',
  featureNS: 'informatievlaanderen.be/Adressen',
  featurePrefix: 'Adressen',
  featureTypes: ['Adrespos'],
  geometryName: 'adrespositie',
  outputFormat: 'application/json',
  maxFeatures: 200
};

const DataSourceContextMenu = ({
    viewer,
    ds,
    children,
    ...otherProps
}) => {


    const buildMenu = useCallback(() => {
        return (
            <Menu
                items={[
                //New DataSource:
                !defined(ds) &&
                {
                    label: <NewGeoJsonDataSourceButton size="small" type="text" viewer={viewer}>New GeoJson DataSource</NewGeoJsonDataSourceButton>,
                    key: 'NEW_GEOJSON_DS',
                },
                !defined(ds) &&
                {
                    label: <NewCzmlDataSourceButton size="small" type="text" viewer={viewer}>New Czml DataSource</NewCzmlDataSourceButton>,
                    key: 'NEW_CZML_DS',
                },
                !defined(ds) && 
                {
                    label: <NewGpxDataSourceButton size="small" type="text" viewer={viewer}>New Gpx DataSource</NewGpxDataSourceButton>,
                    key: 'NEW_GPX_DS',
                },
                defined(ds) && ds.entities.values.length > 0 &&
                {
                    label: <FlyToDataSourceButton size="small" type="text" viewer={viewer} ds={ds}>Fly to DataSource Entities</FlyToDataSourceButton>,
                    key: 'FLY_TO_DS'
                },
                defined(ds) &&
                {
                    label: <LoadDataSourceFromResourceButton size="small" type="text" viewer={viewer} ds={ds}>Load DataSource from Url</LoadDataSourceFromResourceButton>,
                    key: 'LOAD_DS_FROM_RESOURCE',
                },
                defined(ds) && ((ds instanceof GpxDataSource) || (ds instanceof KmlDataSource)) &&
                {
                    label: <LoadDataSourceFromXmlDataButton size="small" type="text" viewer={viewer} ds={ds}>Load Data</LoadDataSourceFromXmlDataButton>,
                    key: 'LOAD_DS_FROM_XML_DATA',
                },
                defined(ds) && ((ds instanceof GeoJsonDataSource) || (ds instanceof CzmlDataSource)) &&
                {
                    label: <LoadDataSourceFromJsonDataButton size="small" type="text" viewer={viewer} ds={ds}>Load Data</LoadDataSourceFromJsonDataButton>,
                    key: 'LOAD_DS_FROM_JSON_DATA',
                },
                defined(ds) && 
                {
                    label: <UnloadDataSourceButton size="small" type="text" ds={ds}>Unload DataSource</UnloadDataSourceButton>,
                    key: 'UNLOAD_DS',
                },
                defined(ds) &&
                {
                    label: <EditDataSourceButton size="small" type="text" ds={ds}>Edit DataSource</EditDataSourceButton>,
                    key: 'EDIT_DS',
                },
                defined(ds) &&
                {
                    label: <RemoveDataSourceButton size="small" type="text" ds={ds} dsCollection={viewer.dataSources}>Remove DataSource</RemoveDataSourceButton>,
                    key: 'REMOVE_DS',
                },
                defined(ds) && ((ds instanceof GeoJsonDataSource)) &&
                {
                    label: <WfsGetFeatureByPolygonButton size="small" type="text" viewer={viewer} ds={ds} >Filter by Polygon</WfsGetFeatureByPolygonButton>,
                    key: 'LOAD_DS_FROM_WFS_GET_FEATURE',
                },
                defined(ds) && ((ds instanceof GeoJsonDataSource)) &&
                {
                    label: <NewWfsConfigDataSourceButton size="small" type="text" ds={ds} >Configure Wfs</NewWfsConfigDataSourceButton>,
                    key: 'WFS_CONFIG_DS',
                },
                ]}
            />
        );
    }, [ds, viewer]);

    return (
        <Dropdown 
            overlay={buildMenu()} 
            trigger={['contextMenu']}
            {...otherProps}
        >
            {children}
        </Dropdown>
    );
        
};

export default DataSourceContextMenu;