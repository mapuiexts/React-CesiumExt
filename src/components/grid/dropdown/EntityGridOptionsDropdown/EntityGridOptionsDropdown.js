import { useMemo } from 'react';
import { Button, Dropdown} from 'antd';
import UnloadDataSourceButton from '../../../button/dataSource/UnloadDataSourceButton/UnloadDataSourceButton';
import FlyToButton from '../../../button/viewer/FlyToButton/FlyToButton';
import { defined } from 'cesium';

const EntityGridOptionsDropdown = ({
    viewer,
    ds,
    selectedEntities,
    children="Options",
    menuPropsFunc,
    ...otherProps
}) => {

    const menu = useMemo(() => {
        const menuProps = {items:[]};
        const hasSelectedEntities = defined(selectedEntities) && selectedEntities.length > 0 ? true : false;
        //clear options
        const clearItems = {
            key: 'CLEAR',
            label: 'Clear',
            children:[]
        };
        clearItems.children.push({
            key: 'CLEAR_ALL',
            label: <UnloadDataSourceButton 
                        size="small" 
                        type="text" 
                        ds={ds}
                    >
                        Clear All
                    </UnloadDataSourceButton>
        });
        menuProps.items.push(clearItems);
        //zoom options
        const zoomItems = {
            key: 'ZOOM',
            label: 'Zoom',
            children:[]
        };
        zoomItems.children.push(
            {
                key: 'ZOOM_ALL',
                label:  <FlyToButton 
                            size="small" 
                            type="text" 
                            viewer={viewer} 
                            target={ds}
                        >
                            Zoom All
                        </FlyToButton>
            },
            {
                key: 'ZOOM_SELECTED',
                label:  <FlyToButton 
                            disabled={!hasSelectedEntities} 
                            size="small" 
                            type="text" 
                            viewer={viewer} 
                            target={selectedEntities}
                        >
                            Zoom To Selected Entity(ies)
                        </FlyToButton>
            }
        );
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

export default EntityGridOptionsDropdown;