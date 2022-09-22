import {useCallback, useState, useEffect} from 'react';
import {Tree} from 'antd';
import {defined} from 'cesium';
import ImageryLayerTreeDataFormat from '../../../../core/format/imageryLayerTree/ImageryLayerTreeDataFormat';

/**
 * The tree to show the imagery layers.
 * 
 * @visibleName Imagery Layer Tree
 */
const ImageryLayerTree = ({
    viewer,
	  rootName,
    checkable = true,
    onExpand = false,
    onCheck,
    ...otherProps
}) => {

    const [currentTreeData, setCurrentTreeData] = useState([]);
    const [checkedKeys, setCheckedKeys] = useState([]);

  /**
   * Get the flat array of visible layers.
   *
   * @return The visible keys
   */
     const getVisibleKeys = useCallback((treeData) => {
        const format = new ImageryLayerTreeDataFormat();
        const flatArray = format.asFlatArray(treeData);
        console.log('flat array', flatArray);
        const visibleArray= flatArray.filter(node=> defined(node.layer) && node.layer.show === true);
        const checkedKeys = visibleArray.map(node => node.key);
        console.log('checkedKeys', checkedKeys);
        return checkedKeys;

    }, []);

    const rebuildTreeNodes = useCallback(() => {
        if(viewer) {
            const format = new ImageryLayerTreeDataFormat();
            const newTreeData = format.writeTreeDataLayer(viewer, rootName); 
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
     * Sets the layer visibility once the user check/uncheck the 
     * check box in the tree layer component. Calls itself
     * recursively for group layers.
     * 
     * @param {Object} node  The checked/unchecked tree data node
     * @param {boolean} isVisible To set the layer visibility
     */
     const setLayerVisibility = useCallback((node, isVisible) => {
        if (defined(node.children)) {
          node.children.forEach((childNode) => {
            setLayerVisibility(childNode, isVisible);
          });
        } 
        else {
            if (defined(node.layer)) {
                console.log('set layer visibility', isVisible);
                node.layer.show = isVisible;
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
        setLayerVisibility(node, checked);
        setCheckedKeys(getVisibleKeys(currentTreeData));
        onCheck && onCheck(checkedKeys, e);

    }, [setLayerVisibility, onCheck, currentTreeData, getVisibleKeys]);

    /**
     * Callback called once a layer is added
     */
    const onCesiumLayerAdded = useCallback((layer, index) => {
      rebuildTreeNodes();
    }, [rebuildTreeNodes]);

    /**
     * Callback called once a layer is removed
     */
     const onCesiumLayerRemoved = useCallback((layer, index) => {
      rebuildTreeNodes();
    }, [rebuildTreeNodes]);

    /**
     * Callback called once a layer is moved
     */
     const onCesiumLayerMoved = useCallback((layer, index) => {
      rebuildTreeNodes();
    }, [rebuildTreeNodes]);

    /**
     * Callback called once a layer visibility is changed
     */
     const onCesiumLayerShownOrHidden = useCallback((layer, index) => {
      setCheckedKeys(getVisibleKeys(currentTreeData));
      //rebuildTreeNodes();
    }, [ currentTreeData, getVisibleKeys]);


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
      viewer && viewer?.imageryLayers?.layerAdded.addEventListener(onCesiumLayerAdded);
      viewer && viewer?.imageryLayers?.layerRemoved.addEventListener(onCesiumLayerRemoved);
      viewer && viewer?.imageryLayers?.layerMoved.addEventListener(onCesiumLayerMoved);
      viewer && viewer?.imageryLayers?.layerShownOrHidden.addEventListener(onCesiumLayerShownOrHidden);
      return () => {
        viewer && viewer?.imageryLayers?.layerAdded.removeEventListener(onCesiumLayerAdded);
        viewer && viewer?.imageryLayers?.layerRemoved.removeEventListener(onCesiumLayerRemoved);
        viewer && viewer?.imageryLayers?.layerMoved.removeEventListener(onCesiumLayerMoved);
        viewer && viewer?.imageryLayers?.layerShownOrHidden.removeEventListener(onCesiumLayerShownOrHidden);
      }

    }, [onCesiumLayerAdded, onCesiumLayerRemoved, onCesiumLayerMoved, onCesiumLayerShownOrHidden, viewer]);

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

export default ImageryLayerTree;