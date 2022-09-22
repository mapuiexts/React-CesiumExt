import ImageryLayerContextMenu from '../../../components/contextMenu/imageryLayer/ImageryLayerContextMenu/ImageryLayerContextMenu';
import { createGuid, defined} from 'cesium';


/**
 * class to create the tree data to be used in 
 * the ImageryLayerTree component.
 */
class ImageryLayerTreeDataFormat {

    /**
     * Method to create a tree data from the cesium Imagery Layer Collection
     * @param {Cesium.Viewer} viewer The Cesium viewer having Layer collection
     * @param {*} titleFunc A function to generate the layer title for each node.
     */
     writeTreeDataLayer(
        viewer, 
        rootName = 'Imagery Layers') {
        
        const layerCollection = viewer.imageryLayers;
        //create the root group layer
        const key = '_ROOT';
        const treeData = {
            key: key,
            title: <ImageryLayerContextMenu viewer={viewer} ><strong>{rootName}</strong></ImageryLayerContextMenu>,
            value: key,
            children: []
        };
        //add the layers node in reverse order
        for(let idx=layerCollection.length - 1; idx >=0; --idx) {
            const layer = layerCollection.get(idx);
            const title = defined(layer._title) ? layer._title : layer.imageryProvider.constructor.name
            let key = null;
            if(defined(layer._key)) {
                key = layer._key
            }
            else {
                key = createGuid();
                layer._key = key;
            }
            const layerNode = {
                key: key,
                title: <ImageryLayerContextMenu viewer={viewer} layer={layer}><div>{title}</div></ImageryLayerContextMenu>,
                value: key,
                layer: layer
            }
            treeData.children.push(layerNode);
        }

        return [treeData];
    }
    
    /**
     * Method to flat a tree node in a array.
     * The leaf tree data will have the ImageryLayer
     * @param {Array} children A children of a tree node
     * @returns The flat array
     */
    asFlatArray(children) {
        if(!defined(children)) return [];
        return(
            Array.prototype.concat.apply(
                children, 
                children.map(item => this.asFlatArray(item.children || []))
            ).reverse()
        );
    }

    
};

export default ImageryLayerTreeDataFormat

