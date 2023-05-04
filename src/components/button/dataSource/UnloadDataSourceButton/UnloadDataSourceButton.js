import { useCallback, useState, useEffect } from 'react';
import { Button } from 'antd';
import {defined} from 'cesium';

/**
 * Button to remove all the entities from a specific data source
 */
const UnloadDataSourceButton = ({
    ds,
    disabled = false,
    children,
    ...otherProps
}) => {
    
    const [disabledState, setDisabledState] = useState(disabled);

    const onClickHandler = useCallback((event) => {
        if(defined(ds) ) {
            ds.entities.removeAll();
        }
    }, [ds]);

    /**
     * Event Handler for the event 'collectionChanged' fired when the 
     * collection is changed: entities are added, removed or changed.
     * @param {Cesium.EntityCollection} collection The collection that triggered the event.
     * @param {Cesium.Entity[]} added The array of Entity instances that have been added to the collection.
     * @param {Cesium.Entity[]} removed The array of Entity instances that have been removed from the collection.
     * @param {Cesium.Entity[]} changed The array of Entity instances that have been modified.
     */
    const onCollectionChangedHandler = useCallback((collection, added, removed, changed) => {
        const isEnabled = !disabled && defined(ds) && ds.entities.values.length > 0;
        setDisabledState(!isEnabled);
    }, [disabled, ds]);

     /**
     * Method defined to register the event handles fired
     * if the entity collection in the datasource changes
     */
     useEffect(() => {
        if(defined(ds)) {
            ds.entities.collectionChanged.addEventListener(onCollectionChangedHandler);
        }
        return () => {
            if(defined(ds)) {
                ds.entities.collectionChanged.removeEventListener(onCollectionChangedHandler);
            }
        }
        
    }, [ds, onCollectionChangedHandler]);

    return(
        <Button {...otherProps} onClick={onClickHandler} disabled={disabledState}>
            {children}
        </Button>
    );

};

export default UnloadDataSourceButton;