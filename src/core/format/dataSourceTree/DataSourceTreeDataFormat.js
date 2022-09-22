import DataSourceContextMenu from '../../../components/contextMenu/dataSource/DataSourceContextMenu/DataSourceContextMenu';
import { createGuid, defined} from 'cesium';


/**
 * class to create the tree data to be used in 
 * the DataSource Tree component.
 */
class DataSourceTreeDataFormat {

    /**
     * Method to create a tree data from the cesium DataSource Collection
     * @param {Cesium.Viewer} viewer The Cesium viewer having Layer collection
     * @param {function} titleFunc A function to generate the datasource title for each node.
     */
     writeTreeData(
        viewer, 
        rootName = 'DataSources') {
        
        const dataSources = viewer.dataSources;
        console.log ('datasources:', dataSources);
        //create the root group layer
        const key = '_ROOT';
        const treeData = {
            key: key,
            title: <DataSourceContextMenu viewer={viewer} ><strong onClick={(e) => e.preventDefault()}>{rootName}</strong></DataSourceContextMenu>,
            value: key,
            children: []
        };
        //add the dataSource nodes in reverse order
        for(let idx=dataSources.length - 1; idx >=0; --idx) {
            const ds = dataSources.get(idx);
            const name = defined(ds.name) ? ds.name : ds.constructor.name
            let key = null;
            if(defined(ds._key)) {
                key = ds._key
            }
            else {
                key = createGuid();
                ds._key = key;
            }
            const dsNode = {
                key: key,
                title: <DataSourceContextMenu viewer={viewer} dataSource={ds}><div>{name}</div></DataSourceContextMenu>,
                value: key,
                dataSource: ds
            }
            treeData.children.push(dsNode);
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

export default DataSourceTreeDataFormat

