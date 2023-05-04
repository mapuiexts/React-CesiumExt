import {useCallback, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Tree} from 'antd';
import {defined, Viewer} from 'cesium';
import DataSourceTreeDataFormat from '../../../../core/format/dataSourceTree/DataSourceTreeDataFormat';


/**
 * The tree to show the data sources present
 * in the Cesium Viewer
 * 
 * @visibleName DataSource Tree
 */
const DataSourceTree = ({
    viewer,
	rootName,
    checkable = true,
    onExpand = false,
    selectable = false,
    onCheck,
    menuPropsFunc,
    ...otherProps
}) => {

    const [currentTreeData, setCurrentTreeData] = useState([]);
    const [checkedKeys, setCheckedKeys] = useState([]);

    /**
   * Get the flat array of visible dataSources.
   *
   * @return The visible dataSource keys
   */
    const getVisibleKeys = useCallback((treeData) => {
        const format = new DataSourceTreeDataFormat();
        const flatArray = format.asFlatArray(treeData);
        const visibleArray= flatArray.filter(node=> defined(node.dataSource) && node.dataSource.show === true);
        const checkedKeys = visibleArray.map(node => node.key).sort();
        return checkedKeys;
    }, []);

    const isArraysEqual = (a, b) => {
        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length !== b.length) return false;
      
        // If you don't care about the order of the elements inside
        // the array, you should sort both arrays here.
        // Please note that calling sort on an array will modify that array.
        // you might want to clone your array first.
      
        for (var i = 0; i < a.length; ++i) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    };

    /**
     * Rebuild the tree data.
     * Usually called if the dataSource is changed, so the
     * changes will be reflected in the tree data
     */
    const rebuildTreeNodes = useCallback(() => {
        if(defined(viewer) && !viewer.isDestroyed()) {
           
            const format = new DataSourceTreeDataFormat();
            const newTreeData = format.writeTreeData(viewer, rootName, menuPropsFunc); 
            setCurrentTreeData(newTreeData);
            setCheckedKeys((prevCheckedKeys) => {
                const curCheckedKeys = getVisibleKeys(newTreeData);
                if(isArraysEqual(prevCheckedKeys, curCheckedKeys)) {
                    return prevCheckedKeys;
                }
                else {
                    return curCheckedKeys;
                }
            });
        }
    }, [viewer, rootName, getVisibleKeys, menuPropsFunc]);

    // const rebuildTreeNodes = useCallback(() => {
    //     if(viewer) {
    //         //setCheckedKeys(getVisibleKeys(currentTreeData));
    //         const format = new DataSourceTreeDataFormat();
    //         const newTreeData = format.writeTreeData(viewer, rootName); 
    //         setCurrentTreeData(newTreeData);
    //     }
    // }, [viewer, rootName]);

    /**
     * The callback method to be called after the tree
     * is expanded.
     * This method will call rebuildTreeNodes to avoid
     * sync issues.
     * 
     * @param {string[]} expandedKeys The expanded keys
     * @param {Object} info The info about the expanded keys.
     *                      check ant-d doc for more details
     */
    const onExpandTree = useCallback((expandedKeys, info) => {
        rebuildTreeNodes();

        if (onExpand) {
            onExpandTree(expandedKeys, info);
        }
    }, [onExpand, rebuildTreeNodes]);

    /**
     * Sets the dataSource visibility once the user check/uncheck the 
     * check box in the dataSource Tree component. Calls itself
     * recursively for group.
     * 
     * @param {Object} node  The checked/unchecked tree data node
     * @param {boolean} isVisible To set the layer visibility
     */
    const setVisibility = useCallback((node, isVisible) => {
        if (defined(node.children)) {
          node.children.forEach((childNode) => {
            setVisibility(childNode, isVisible);
          });
        } 
        else {
            if (defined(node.dataSource)) {
                node.dataSource.show = isVisible;
            }
        }
    }, []);

    /**
     * Callback Method to be called once the check box is
     * checked in the tree view.
     * @param {Array(string)} checkedKeys 
     * @param {{checked:bool}} e 
     */
    const onInternalCheck = useCallback((checkedKeys,  e) => {
        const { node, checked } = e;
        setVisibility(node, checked);
        setCheckedKeys(getVisibleKeys(currentTreeData));
        onCheck && onCheck(checkedKeys, e);

    }, [setVisibility, onCheck, currentTreeData, getVisibleKeys]);

    /**
     * callback called once the datasource name is changed
     */
    const onDataSourceChanged = useCallback((ds) => {
        rebuildTreeNodes();
    }, [rebuildTreeNodes]);

    /**
     * Callback called once new dataSource is added
     */
    const onDataSourceAdded = useCallback((dsCol, ds) => {
        ds.changedEvent.addEventListener(onDataSourceChanged);
        rebuildTreeNodes();

    }, [rebuildTreeNodes, onDataSourceChanged]);

    /**
     * Callback called once a dataSource is removed
     */
    const onDataSourceRemoved = useCallback((dsCol, ds) => {
        ds.changedEvent.removeEventListener(onDataSourceChanged);
        rebuildTreeNodes();
    }, [rebuildTreeNodes, onDataSourceChanged]);

    /**
     * Callback called once a dataSource is moved
     */
    const onDataSourceMoved = useCallback((dataSource, index) => {
        rebuildTreeNodes();
    }, [rebuildTreeNodes]);

    useEffect(() => {
        setCheckedKeys(getVisibleKeys(currentTreeData));
    }, [currentTreeData, getVisibleKeys]);

    /**
     * rebuild the tree nodes
     */
    useEffect(() => {
        rebuildTreeNodes();
    }, [rebuildTreeNodes]);


    //register/unregister cesium events for the datasource collection
    useEffect(() => {
        if(defined(viewer) && !viewer.isDestroyed() && defined(viewer.dataSources) && !viewer.dataSources.isDestroyed()) {
            viewer && viewer.dataSources.dataSourceAdded.addEventListener(onDataSourceAdded);
            viewer && viewer.dataSources.dataSourceRemoved.addEventListener(onDataSourceRemoved );
            viewer && viewer.dataSources.dataSourceMoved.addEventListener(onDataSourceMoved);
            return () => {
                const dataSources = defined(viewer) && !viewer.isDestroyed() ? viewer.dataSources : null;
                if(defined(dataSources) && !dataSources.isDestroyed()) {
                    dataSources?.dataSourceAdded.removeEventListener(onDataSourceAdded);
                    dataSources?.dataSourceRemoved.removeEventListener(onDataSourceRemoved);
                    dataSources?.dataSourceMoved.removeEventListener(onDataSourceMoved);
                }
            }
        }
      }, [onDataSourceAdded, onDataSourceRemoved, onDataSourceMoved, viewer]);

    /**
     * Register in the existing dataSources to handler to react to 
     * the datasource changes
     */
    useEffect(() => {
        const format = new DataSourceTreeDataFormat();
        const flatArray = format.asFlatArray(currentTreeData);
        flatArray.forEach((node) => {
            defined(node.dataSource) && node.dataSource.changedEvent.addEventListener(onDataSourceChanged);
        });
        
        return () => {
            const flatArray = format.asFlatArray(currentTreeData);
            flatArray.forEach((node) => {
                defined(node.dataSource) && node.dataSource.changedEvent.removeEventListener(onDataSourceChanged);
            });
        }
    }, [currentTreeData, onDataSourceChanged]);

      return (
        <Tree
            {...otherProps}

            treeData={currentTreeData}
            checkable={checkable}
            //selectable={selectable}
            //onExpand={onExpandTree}
            onCheck = {onInternalCheck}
            checkedKeys={checkedKeys} 
        />
    );
};

DataSourceTree.propTypes = {
    /**
     * The Cesium Viewer with the collection of layers.
     */
    viewer: PropTypes.instanceOf(Viewer),
 
    /**
     * The root name in the tree view
     * for the layers
     */
    rootName: PropTypes.string,
   
    /**
     * @ignore
     */
    onExpand: PropTypes.bool,
  
    /**
     * Event handler called once the user checks a 
     * checkbox in the layer tree
     */
    onCheck: PropTypes.func,
  
    /**
     * function used to build the menu context.
     * If not provided, a default menu context will
     * be provided for the dataSource.
     * This function receives as parameter the
     * Cesium Viewer and DataSource
     * returns the antd menu props.
     */
    menuPropsFunc: PropTypes.func,
  };

export default DataSourceTree;