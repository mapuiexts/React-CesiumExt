import { useCallback } from "react";
import { Menu, Dropdown } from 'antd';
import { defined } from 'cesium';
import NewGeoJsonDataSourceButton from '../../../button/dataSource/NewGeoJsonDataSourceButton/NewGeoJsonDataSourceButton';


const DataSourceContextMenu = ({
    viewer,
    dataSource,
    children,
    ...otherProps
}) => {

   

    const dataSources = viewer.dataSources;

    const buildMenu = useCallback(() => {
        return (
            <Menu
                items={[
                //New DataSource:
                !defined(dataSource) &&
                {
                    label: <NewGeoJsonDataSourceButton size="small" type="text">New GeoJson DataSource</NewGeoJsonDataSourceButton>,
                    key: 'NEW_GEOJSON_DS',
                }
                ]}
            />
        );
    }, [dataSource]);

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