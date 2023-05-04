import { useState, useCallback } from "react";
import { Space } from "antd";
import PropTypes from 'prop-types';
import { Color, Viewer, defined,
    DataSource, GeoJsonDataSource, CustomDataSource,
    CzmlDataSource, GpxDataSource, KmlDataSource
 } from "cesium";
import EntityGrid from "../EntityGrid/EntityGrid";
import EntityGridOptionsDropdown from "../../dropDown/EntityGridOptionsDropdown/EntityGridOptionsDropdown";
import './DefaultEntityGrid.css'

/**
 * Grid Component to show the Cesium Entities stored in a datasource with
 * some additional default options menu to zoom and clear the entities
 * in the grid
 * 
 * @visibleName Default Entity Grid
 */
const DefaultEntityGrid = ({
    viewer,
    ds,
    columnDefs = null,
    rowSelection= 'multiple', 
    className='ag-theme-balham',
    onGridReady,
    onRowClicked,
    onEntitySelectionChanged,
    selectedColor = Color.YELLOW.withAlpha(0.5),
    ...otherProps
}) => {

    const [selectedEntities, setSelectedEntities] = useState([]);

    const onInternalEntitySelectionChanged = useCallback((entities) => {
        setSelectedEntities(entities);
        onEntitySelectionChanged && onEntitySelectionChanged(entities);
    }, [onEntitySelectionChanged]);

    return(
        defined(viewer) && !viewer.isDestroyed()
        ?
        <div className='rcesiumext-defaultentitygrid'>
            <Space wrap className='rcesiumext-defaultentitygrid-menubar-container'>
                <EntityGridOptionsDropdown viewer={viewer} ds={ds} selectedEntities={selectedEntities}/>
            </Space>
            <div className='rcesiumext-defaultentitygrid-content-container'>
                <EntityGrid
                    {...otherProps}
                    viewer={viewer}
                    ds={ds}
                    columnDefs={columnDefs}
                    rowSelection={rowSelection}
                    className={className}
                    onGridReady={onGridReady}
                    onRowClicked={onRowClicked}
                    onEntitySelectionChanged = {onInternalEntitySelectionChanged}
                    selectedColor={selectedColor}
                />
            </div>
        </div>
        :
        null
    );

};

DefaultEntityGrid.propTypes = {
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

export default DefaultEntityGrid