
import { Dropdown } from "antd";
import { useMemo } from "react";
import {defined} from 'cesium';
import RemoveImageryLayerButton from "../../../button/imageryLayer/RemoveImageryLayerButton/RemoveImageryLayerButton";
import EditImageryLayerButton from "../../../button/imageryLayer/EditImageryLayerButton/EditImageryLayerButton";
import NewOSMImageryLayerButton from "../../../button/imageryLayer/NewOSMImageryLayerButton/NewOSMImageryLayerButton";
import NewWmsImageryLayerButton from '../../../button/imageryLayer/NewWmsImageryLayerButton/NewWmsImageryLayerButton';
import NewIonImageryLayerButton from "../../../button/imageryLayer/NewIonImageryLayerButton/NewIonImageryLayerButton";


const ImageryLayerContextMenu = ({
    viewer,
    layer,
    children,
    menuPropsFunc,
    ...otherProps
}) => {

  const imageryLayers = viewer.imageryLayers;
  const menuProps = useMemo(() => {
    if(defined(menuPropsFunc)) {
      return menuPropsFunc(viewer, layer);
    }
    else {
      return(
        {
          items: [
            //Edit Layer:
            defined(layer) &&
            {
              label: <EditImageryLayerButton size="small" type="text" layer={layer}>Edit Layer</EditImageryLayerButton>,
              key: 'EDIT_LYR',
            },
            //Remove Layer
            defined(layer) &&
            {
              label: <RemoveImageryLayerButton size="small" type="text" layer={layer} imageryLayers={imageryLayers}>Remove Layer</RemoveImageryLayerButton>,
              key: 'REMOVE_LYR',
            },
            //New Layers:
            !defined(layer) &&
            {
              label: <NewWmsImageryLayerButton size="small" type="text" viewer={viewer}>New WMS Layer</NewWmsImageryLayerButton>,
              key: 'NEW_WMS_LYR',
            },
            !defined(layer) &&
            {
              label: <NewOSMImageryLayerButton size="small" type="text" viewer={viewer}>New OSM Layer</NewOSMImageryLayerButton>,
              key: 'NEW_OSM_LYR',
            },
            !defined(layer) &&
            {
              label: <NewIonImageryLayerButton size="small" type="text" viewer={viewer}>New Ion Layer</NewIonImageryLayerButton>,
              key: 'NEW_ION_LYR',
            },
          ]
        }
      )
    }

  }, [menuPropsFunc, layer, imageryLayers, viewer]);

  return (
      <div onClick={(e) => e.stopPropagation()}>
        <Dropdown 
            {...otherProps}
            menu={menuProps} 
            trigger={['contextMenu']}
        >
            {children}
        </Dropdown>
      </div>
  );

};

export default ImageryLayerContextMenu;