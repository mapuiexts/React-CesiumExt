import {useCallback, useState, useEffect} from 'react';
import {Tree} from 'antd';
import {defined} from 'cesium';
import DataSourceTreeDataFormat from '../../../../core/format/dataSourceTree/DataSourceTreeDataFormat';


/**
 * The tree to show the data sources.
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
        console.log('flat array', flatArray);
        const visibleArray= flatArray.filter(node=> defined(node.dataSource) && node.dataSource.show === true);
        const checkedKeys = visibleArray.map(node => node.key);
        console.log('checkedKeys', checkedKeys);
        return checkedKeys;
    }, []);

    /**
     * Rebuild the tree data.
     * Usually called if the dataSource is changed, so the
     * changes will be reflected in the tree data
     */
    const rebuildTreeNodes = useCallback(() => {
        if(viewer) {
            const format = new DataSourceTreeDataFormat();
            const newTreeData = format.writeTreeData(viewer, rootName); 
            setCurrentTreeData(newTreeData);
        }
    }, [viewer, rootName]);

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
            if (defined(node.layer)) {
                console.log('set dataSource visibility', isVisible);
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
     * Callback called once new dataSource is added
     */
    const onDataSourceAdded = useCallback((dataSource, index) => {
        rebuildTreeNodes();
    }, [rebuildTreeNodes]);

    /**
     * Callback called once a dataSource is removed
     */
    const onDataSourceRemoved = useCallback((dataSource, index) => {
        rebuildTreeNodes();
    }, [rebuildTreeNodes]);

    /**
     * Callback called once a dataSource is moved
     */
    const onDataSourceMoved = useCallback((dataSource, index) => {
        rebuildTreeNodes();
    }, [rebuildTreeNodes]);


    /**
     * rebuild the tree nodes
     */
    useEffect(() => {
        rebuildTreeNodes();
    }, [rebuildTreeNodes]);


    useEffect(() => {
        setCheckedKeys(getVisibleKeys(currentTreeData));
    }, [currentTreeData, getVisibleKeys]);

    //register/unregister cesium events
    useEffect(() => {
        viewer && viewer?.dataSources?.dataSourceAdded.addEventListener(onDataSourceAdded);
        viewer && viewer?.dataSources?.dataSourceRemoved.addEventListener(onDataSourceRemoved );
        viewer && viewer?.dataSources?.dataSourceMoved.addEventListener(onDataSourceMoved);
        return () => {
            viewer && viewer?.dataSources?.dataSourceAdded.removeEventListener(onDataSourceAdded);
            viewer && viewer?.dataSources?.dataSourceRemoved.removeEventListener(onDataSourceRemoved);
            viewer && viewer?.dataSources?.dataSourceMoved.removeEventListener(onDataSourceMoved);
        }
  
      }, [onDataSourceAdded, onDataSourceRemoved, onDataSourceMoved, viewer]);

      return (
        <Tree
            {...otherProps}

            treeData={currentTreeData}
            checkable={checkable}
            //onExpand={onExpandTree}
            onCheck = {onInternalCheck}
            checkedKeys={checkedKeys} 
        />
    );
};

export default DataSourceTree;