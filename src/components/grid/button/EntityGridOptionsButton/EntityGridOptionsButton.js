import { useMemo } from 'react';
import { Button, Dropdown} from 'antd';
import UnloadDataSourceButton from '../../../button/dataSource/UnloadDataSourceButton/UnloadDataSourceButton';
import FlyToDataSourceButton from '../../../button/dataSource/FlyToDataSourceButton/FlyToDataSourceButton';
import { defined } from 'cesium';

const EntityGridOptionsButton = ({
    viewer,
    ds,
    selectedEntities,
    children="Options",
    menuPropsFunc,
    ...otherProps
}) => {

    const menu = useMemo(() => {
        const menuProps = {items:[]};
        //clear options
        const clearItems = {
            key: 'CLEAR',
            label: 'Clear',
            children:[]
        };
        clearItems.children.push({
            key: 'CLEAR_ALL',
            label: <UnloadDataSourceButton size="small" type="text" ds={ds}>Clear All</UnloadDataSourceButton>
        });
        menuProps.items.push(clearItems);
        //zoom options
        const zoomItems = {
            key: 'ZOOM',
            label: 'Zoom',
            children:[]
        };
        zoomItems.children.push({
            key: 'ZOOM_ALL',
            label: <FlyToDataSourceButton size="small" type="text" viewer={viewer} ds={ds}>Zoom All</FlyToDataSourceButton>
        });
        menuProps.items.push(zoomItems);

        if(defined(menuPropsFunc)) {
            const additionalItems = menuPropsFunc(viewer, ds, selectedEntities);
            menuProps.items.push(additionalItems);
        }

        return menuProps;
    }, [ds, viewer, menuPropsFunc, selectedEntities]);

    return (
        <Dropdown menu = {menu} placement="bottomLeft" trigger="click">
            <Button type="primary" {...otherProps}>{children}</Button>
        </Dropdown>
    );
};

export default EntityGridOptionsButton;