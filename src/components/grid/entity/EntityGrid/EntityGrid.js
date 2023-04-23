import { defined, JulianDate, Color, Viewer, 
    DataSource, GeoJsonDataSource, CustomDataSource,
    CzmlDataSource, GpxDataSource, KmlDataSource } from 'cesium';
import { useState, useCallback, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { AgGridReact } from 'ag-grid-react';
import usePrevious from '../../../../hooks/common/usePrevious';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-balham.css';
import './EntityGrid.css';

const defaultSelectedColor = Color.YELLOW.withAlpha(0.5);

/**
 * Grid Component to show the Cesium Entities stored in a datasource.
 * 
 * @visibleName Entity Grid
 */
const EntityGrid = ({
    viewer,
    ds,
    columnDefs = null,
    rowSelection= 'multiple', 
    className='ag-theme-balham',
    onGridReady,
    onRowClicked,
    onEntitySelectionChanged,
    selectedColor = defaultSelectedColor,
    ...otherProps
}) => {

    const [currentColumnDefs, setCurrentColumnDefs] = useState(columnDefs);
    const [rowData, ] = useState([]);
    const [gridApi, setGridApi] = useState(null);
    const [, setGridColumnApi] = useState();
    const [selectedFeatures, setSelectedFeatures] = useState([]);

    const previousColumnDefs = usePrevious(columnDefs);
    if(columnDefs !== previousColumnDefs && columnDefs !== currentColumnDefs) {
        setCurrentColumnDefs(columnDefs);
    }

    /**
     * callback used to pass as attribute for ag-grid
     * to retrieve the row based on a defined id
     * 
     * Usage: const rowNode = gridOptions.api.getRowNode(key);
     */
    const getRowId =  useCallback((params) => {
        return params.data.key;
        //usage: var rowNode = gridOptions.api.getRowNode('aa');
    }, []);


    /**
     * Generate the grid row data in json format from
     * all the entities present in the collection
     * 
     * @param {Cesium.Entity[]} entities The entities to generate row data.
     * @return {Object[]} The array containing the row data
     */
    const buildRowDataFromEntities = useCallback((entities) => {
        const data = [];
        const time = JulianDate.now();
        entities.forEach(entity => {
            const properties = entity.properties;
            if(defined(properties)) {
                const propertiesObj = properties.propertyNames 
                .reduce((obj, key) => {
                    obj[key] = properties[key].getValue(time);
                    return obj;
                }, {});
        
                data.push({
                    key: entity.id,
                    //__feature:feature,
                    ...propertiesObj
                });
            }
        });
        return data;
    }, []);
    
    const UpdateGridFromEntities = useCallback((entities) => {
        if(defined(entities) && entities.length > 0) {
            const data = buildRowDataFromEntities(entities);
            gridApi.applyTransactionAsync({update: data});
            //gridApi.applyTransaction({update: data});
            
            gridApi.refreshClientSideRowModel('filter');
        }
    }, [gridApi, buildRowDataFromEntities]);


    /**
     * Event handler to 'definitionChanged' events of the underlying Cesium Entity. 
     * All changes on the object will be reflected in the row grid.
     * See: https://www.ag-grid.com/documentation/react/data-update-single-row-cell/
     * 
     * @param {Cesium.Entity} entity The Cesium Entity having a property changed.
     * @param {String} propertyName The name of the property changed.
     */
    const onEntityPropertiesChangedHandler = useCallback((entity, propertyName) => {
        if(propertyName === 'properties') {
            UpdateGridFromEntities([entity]);
        }
    }, [UpdateGridFromEntities]);
    

    /**
     * Method to register the entity 'definitionChanged' event handler in all
     * the entities in the array.
     * 
     * @param {Cesium.Entity[]} entities Array of entities on which the handler
     * will be registered.
     */

    const registerEntityPropertyChange = useCallback((entities) => {
        entities.forEach(entity => {
            entity.definitionChanged.addEventListener(onEntityPropertiesChangedHandler);
        });
    }, [onEntityPropertiesChangedHandler]);

    /**
     * Method to unregister the entity 'definitionChanged' event handler in all
     * the entities in the array.
     * 
     * @param {Cesium.Entity[]} entities Array of entities on which the handler
     * will be unregistered
     */
    const unRegisterEntityPropertyChange = useCallback((entities) => {
        entities.forEach(entity => {
            entity.definitionChanged.removeEventListener(onEntityPropertiesChangedHandler);
        });
    }, [onEntityPropertiesChangedHandler]);

    /**
     * This method will add the entities in the grid
     * See: https://www.ag-grid.com/javascript-grid-data-update-high-frequency/
     * @param {Cesium.Entity[]} entities The entities to be added in the grid
     */
    const addEntitiesToGrid = useCallback((entities) => {
        if(defined(entities) && entities.length > 0 && defined(gridApi)) {
            const data = buildRowDataFromEntities(entities);
            //gridApi.applyTransactionAsync({add: data});
            gridApi.applyTransaction({add: data});
            //refresh the row model
            gridApi.refreshClientSideRowModel('filter');
            registerEntityPropertyChange(entities);
        }
    }, [buildRowDataFromEntities, registerEntityPropertyChange, gridApi]);

    /**
     * This method will remove the entities in the grid
     * See: https://www.ag-grid.com/javascript-grid-data-update-high-frequency/
     * @param {Cesium.Entity[]} entities The entities to be removed from the grid
     */
    const RemoveEntitiesFromGrid = useCallback((entities) => {
        if(defined(entities) && entities.length > 0) {
            const data = entities.map((entity) => {
                const row = gridApi.getRowNode(entity.id);
                if(defined(row)) return row.data;
                return undefined;
            });
            //gridApi.applyTransactionAsync({remove: data});
            gridApi.applyTransaction({remove: data});
            //refresh the row model
            gridApi.refreshClientSideRowModel('filter');
            unRegisterEntityPropertyChange(entities);
        }
    }, [gridApi, unRegisterEntityPropertyChange]);

   


    /**
     * Event Handler for the event 'collectionChanged' fired when the 
     * collection is changed: entities are added, removed or changed.
     * This method will add/remove/update entities in the grid for all the
     * added/removed/updated entities in the collection.
     * @param {Cesium.EntityCollection} collection The collection that triggered the event.
     * @param {Cesium.Entity[]} added The array of Entity instances that have been added to the collection.
     * @param {Cesium.Entity[]} removed The array of Entity instances that have been removed from the collection.
     * @param {Cesium.Entity[]} changed The array of Entity instances that have been modified.
     */
    const onCollectionChangedHandler = useCallback((collection, added, removed, changed) => {
        addEntitiesToGrid(added);
        RemoveEntitiesFromGrid(removed);
    }, [addEntitiesToGrid, RemoveEntitiesFromGrid]);


    /**
     * If the attribute "columnDefs" is not provided for this component,
     * buid the columnDefs based on the properties of the entity
     * in the vector layer
     */
    const buildColumnDefs = useCallback((dataSource) => {
        if((!defined(currentColumnDefs) || currentColumnDefs.length === 0)
            && defined(dataSource)) {
            const entities = dataSource.entities.values;
            if(defined(entities) && entities.length > 0) {
                //retrieve the first entity and its properties
                const entity = entities[0];
                const properties = entity.properties;
                if(defined(properties)) {
                    const propertyNames = properties.propertyNames;
                    const gridColumnDefs = [];
                    //build grid properties ignoring geometry property
                    propertyNames.forEach((item) => {
                        gridColumnDefs.push({
                            field: item,
                            sortable:true,
                            filter:true,
                            resizable:true
                        });
                    });
                    setCurrentColumnDefs(gridColumnDefs);
                }
            }
        }
    }, [currentColumnDefs]);

    /**
     * Event Handler fired when the grid is ready.
     * This handler will initialize the grid api 
     * in the state
     */
    const onInternalGridReady = useCallback((params) => {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
        params.api.sizeColumnsToFit();
        defined(onGridReady) && onGridReady(params);
    }, [onGridReady]);

   

    /**
     * Event handler called when the selection has been changed.
     * This handler will highlight in the viewer the selected 
     * entity and un-highlight the unselected ones.
     * @param {*} evt The SelectionChangedEvent
     */
    const onInternalSelectionChanged = useCallback((evt) => {
        //retrieve the selected features
        let newSelectedRows = null;
        if(!defined(gridApi)) {
            newSelectedRows = evt.api.getSelectedRows();
        }
        else {
            newSelectedRows = gridApi.getSelectedRows();
        }
        const newSelectedFeatures = newSelectedRows.map(row=>{
            const entity = ds.entities.getById(row.key);
            const feature = {entity: entity};
            const filteredArray = selectedFeatures.filter((oldFeature => oldFeature.entity === feature.entity));
            if(filteredArray.length === 0) {
                if(defined(entity.polygon)) {
                    feature.polygon = {material: entity.polygon.material};
                }
                if(defined(entity.polyline)) {
                    feature.polyline = {material: entity.polyline.material};
                }
                if(defined(entity.polylineVolume)) {
                    feature.polylineVolume = {material: entity.polylineVolume.material};
                }
                if(defined(entity.billboard)) {
                    feature.billboard = {color: entity.billboard.color};
                }
                if(defined(entity.point)) {
                    feature.point = {color: entity.point.color};
                }
            }
            else {
                if(defined(entity.polygon)) {
                    feature.polygon = filteredArray[0].polygon;
                }
                if(defined(entity.polyline)) {
                    feature.polyline = filteredArray[0].polyline;
                }
                if(defined(entity.polylineVolume)) {
                    feature.polylineVolume = filteredArray[0].polylineVolume;
                }
                if(defined(entity.billboard)) {
                    feature.billboard = filteredArray[0].billboard;
                }
                if(defined(entity.point)) {
                    feature.point = filteredArray[0].point;
                }
            }
            return feature;
        });


        //TODO: unhighlight the previous features not present in current new selected features
        selectedFeatures.forEach(feature=> {
            const found = newSelectedFeatures.find(newFeature => newFeature.entity === feature.entity);
            if(!defined(found)) {
                if(defined(feature.polygon)) {
                    feature.entity.polygon.material = feature.polygon.material;
                }
                if(defined(feature.polyline)) {
                    feature.entity.polyline.material = feature.polyline.material;
                }
                if(defined(feature.polylineVolume)) {
                    feature.entity.polylineVolume.material = feature.polylineVolume.material;
                }
                if(defined(feature.billboard)) {
                    feature.entity.billboard.color = feature.billboard.color;
                }
                if(defined(feature.point)) {
                    feature.entity.point.color = feature.point.color;
                }
            }
        });

        //TODO: //highlight the new selected features not present in the previous selection
        newSelectedFeatures.forEach(feature=> {
            const found = selectedFeatures.find(oldFeature => oldFeature.entity === feature.entity);
            if(!defined(found)) {
                if(defined(feature.polygon)) {
                    feature.entity.polygon.material = selectedColor;
                }
                if(defined(feature.polyline)) {
                    feature.entity.polyline.material = selectedColor;
                }
                if(defined(feature.polylineVolume)) {
                    feature.entity.polylineVolume.material = selectedColor;
                }
                if(defined(feature.billboard)) {
                    feature.entity.billboard.color = selectedColor;
                }
                if(defined(feature.point)) {
                    feature.entity.point.color = selectedColor;
                }
            }
        });

        //update state
        setSelectedFeatures(newSelectedFeatures);

        //fire event
        //onSelectionChanged && onSelectionChanged(evt);
        onEntitySelectionChanged && onEntitySelectionChanged(newSelectedRows.map((row) => ds.entities.getById(row.key)));

    }, [gridApi, ds, onEntitySelectionChanged, selectedColor, selectedFeatures]);

    /**
     * Build the column definitions and the row data based on
     * the features present in the vector layer and its properties
     */
    
    useEffect(() => {
        let entities = null;
        if(defined(ds)) {
            buildColumnDefs(ds);
            entities = ds.entities.values;
            //adding entities to grid and registeren them for the property changes
            addEntitiesToGrid(entities);
        }
        return () => {
            if(defined(entities)) unRegisterEntityPropertyChange(entities);
        }
    }, [buildColumnDefs, unRegisterEntityPropertyChange, addEntitiesToGrid, ds]);
    

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
    

    const defaultColDef = useMemo(() => {
        return {
            sortable: true,
            resizable: true,
            filter: true,
            flex: 1,
            minWidth: 100,
            headerComponentParams: {
                menuIcon: 'fa-bars'
            }
        };
    }, []);

    return(
        viewer &&
        <div className='rcesiumext-entitygrid'>
            <AgGridReact
                {...otherProps}
                className={className}
                onGridReady={onInternalGridReady}
                onSelectionChanged={onInternalSelectionChanged}
                onRowClicked={onRowClicked}
                rowSelection={rowSelection}
                enableCellTextSelection
                getRowId={getRowId}
                columnDefs={currentColumnDefs}
                defaultColDef={defaultColDef}
                rowData={rowData}
                
            />
        </div>
    );

};

EntityGrid.propTypes = {
    /**
     * The Cesium Viewer on where the entities in
     * the grid will be visualized.
     */
    viewer: PropTypes.instanceOf(Viewer),

    /**
     * The Cesium Datasource on where the entities in
     * the grid are stored.
     */
    ds: PropTypes.oneOfType([
            PropTypes.instanceOf(DataSource),
            PropTypes.instanceOf(GeoJsonDataSource),
            PropTypes.instanceOf(CustomDataSource),
            PropTypes.instanceOf(CzmlDataSource),
            PropTypes.instanceOf(GpxDataSource),
            PropTypes.instanceOf(KmlDataSource),
    ]),

    /**
     * Array of <a href="https://www.ag-grid.com/react-grid/grid-properties">Column Definitions</a>.
     * If it is empty, the properties from the first item in the grid will be shown.
     */
    columnDefs:  PropTypes.array,

    /**
     * Allow a single or multiple row selection in the grid.
     */
    rowSelection: PropTypes.oneOf(['single', 'multiple']),

    /**
     * The class name to provide different themes.
     * Check the  <a href="https://www.ag-grid.com/react-grid/themes-provided">available themes</a>
     * for details about available themes.
     */
    className: PropTypes.string,

    /**
     * Event Handler for the event fired once the grid was
     * initialised.
     */
    onGridReady: PropTypes.func,

     /**
     * Event Handler for the event fired once a row in the
     * grid is selected.
     */
    onRowClicked: PropTypes.func,

    /**
     * Event Handler for the event fired once the user selects 
     * one or more rows in the grid. See example below to check
     * how it works.
     */
    onEntitySelectionChanged: PropTypes.func,

    /**
     * The color applied to the selected entity(ies) in the grid
     */
    selectedColor:  PropTypes.instanceOf(Color)

};

export default EntityGrid;