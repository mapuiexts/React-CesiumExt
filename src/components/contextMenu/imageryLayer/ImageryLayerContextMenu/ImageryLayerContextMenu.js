
import { Dropdown, Menu } from "antd";
import { useCallback } from "react";
import {defined} from 'cesium';
import RemoveImageryLayerButton from "../../../button/imageryLayer/RemoveImageryLayerButton/RemoveImageryLayerButton";
import EditImageryLayerButton from "../../../button/imageryLayer/EditImageryLayerButton/EditImageryLayerButton";
//import FlyToButton from "../../../button/camera/FlyToButton/FlyToButton";
import NewOpenStreetMapImageryLayerButton from "../../../button/imageryLayer/NewOpenStreetMapImageryLayerButton/NewOpenStreetMapImageryLayerButton";
import NewWebMapServiceImageryLayerButton from '../../../button/imageryLayer/NewWebMapServiceImageryLayerButton/NewWebMapServiceImageryLayerButton';
import NewIonImageryLayerButton from "../../../button/imageryLayer/NewIonImageryLayerButton/NewIonImageryLayerButton";


const ImageryLayerContextMenu = ({
    viewer,
    layer,
    children,
    ...otherProps
}) => {

  const layerCollection = viewer.imageryLayers;
  const camera = viewer.camera;
  const buildMenu = useCallback(() => {
    return (
      <Menu
        items={[
          //Edit Layer:
          defined(layer) &&
          {
            label: <EditImageryLayerButton size="small" type="text" layer={layer}>Edit Layer</EditImageryLayerButton>,
            key: 'EDIT_LYR',
          },
          //Fly To Layer:
          // defined(layer) &&
          // {
          //   label:  <FlyToButton  camera={camera} 
          //                         flyToOptions={{destination: layer.rectangle}}
          //                         size="small" type="text"
          //           >
          //               Fly To Layer
          //           </FlyToButton>,
          //   key: 'FLY_TO_LYR',
          // },
          //Remove Layer
          defined(layer) &&
          {
            label: <RemoveImageryLayerButton size="small" type="text" layer={layer} layerCollection={layerCollection}>Remove Layer</RemoveImageryLayerButton>,
            key: 'REMOVE_LYR',
          },
          //New Layer:
          !defined(layer) &&
          {
            label: <NewWebMapServiceImageryLayerButton size="small" type="text" layerCollection={layerCollection}>New WMS Layer</NewWebMapServiceImageryLayerButton>,
            key: 'NEW_WMS_LYR',
          },
          !defined(layer) &&
          {
            label: <NewOpenStreetMapImageryLayerButton size="small" type="text" layerCollection={layerCollection}>New OSM Layer</NewOpenStreetMapImageryLayerButton>,
            key: 'NEW_OSM_LYR',
          },
          !defined(layer) &&
          {
            label: <NewIonImageryLayerButton size="small" type="text" layerCollection={layerCollection}>New Ion Layer</NewIonImageryLayerButton>,
            key: 'NEW_ION_LYR',
          },
        ]}
      />
    );

  }, [layer, layerCollection]);

  return (
      <Dropdown 
          overlay={buildMenu()} 
          trigger={['contextMenu']}
          // open={true}
          {...otherProps}
      >
          {children}
      </Dropdown>
  );

};

export default ImageryLayerContextMenu;