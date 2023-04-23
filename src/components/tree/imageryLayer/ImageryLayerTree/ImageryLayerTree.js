import {useCallback, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Tree} from 'antd';
import {defined, Viewer, CesiumWidget} from 'cesium';
import ImageryLayerTreeDataFormat from '../../../../core/format/imageryLayerTree/ImageryLayerTreeDataFormat';

/**
 * The tree to show the imagery layers 
 * present in the Cesium Viewer.
 * 
 * @visibleName Imagery Layer Tree
 */
const ImageryLayerTree = ({
    viewer,
	  rootName,
    onExpand = false,
    selectable = false,
    onCheck,
    menuPropsFunc,
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
        const checkedKeys = visibleArray.map(node => node.key).sort();
        console.log('checkedKeys', checkedKeys);
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

    const rebuildTreeNodes = useCallback(() => {
        if(viewer) {
            const format = new ImageryLayerTreeDataFormat();
            const newTreeData = format.writeTreeDataLayer(viewer, rootName, menuPropsFunc); 
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
        const imageryLayers = defined(viewer) && !viewer.isDestroyed() ? viewer.imageryLayers : null;
        if(defined(imageryLayers) && !imageryLayers.isDestroyed()) {
          imageryLayers.layerAdded.removeEventListener(onCesiumLayerAdded);
          imageryLayers.layerRemoved.removeEventListener(onCesiumLayerRemoved);
          imageryLayers.layerMoved.removeEventListener(onCesiumLayerMoved);
          imageryLayers.layerShownOrHidden.removeEventListener(onCesiumLayerShownOrHidden);
        }
      }

    }, [onCesiumLayerAdded, onCesiumLayerRemoved, onCesiumLayerMoved, onCesiumLayerShownOrHidden, viewer]);

    return (
        viewer &&
        <Tree
            {...otherProps}
            treeData={currentTreeData}
            checkable={true}
            selectable={selectable}
            //onExpand={onExpandTree}
            onCheck = {onInternalCheck}
            checkedKeys={checkedKeys} 
        />
    );

};

ImageryLayerTree.propTypes = {
  /**
   * The Cesium Viewer with the collection of layers.
   */
  viewer: PropTypes.oneOfType([
    PropTypes.instanceOf(Viewer),
    PropTypes.instanceOf(CesiumWidget)
  ]), 
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
   * be provided for the tree layer.
   * This function receives as parameter the
   * Cesium Viewer and Imagery Layer and should
   * returns the antd menu props.
   */
  menuPropsFunc: PropTypes.func,
};

export default ImageryLayerTree;