import {useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import {Button} from 'antd';
import { ImageryLayer } from 'cesium';
import Window from "../../../window/base/Window/Window";
import EditImageryLayerForm from '../../../form/imageryLayer/EditImageryLayerForm';

/**
 * Component button to edit a Imagery Layer.
 * Once the user clicks this button, a window will be shown and the
 * user will be able to edit the imagery layer properties.
 * 
 * @visibleName Edit Imagery Layer
 */
const EditImageryLayerButton = ({
    layer,
    windowProps,
    children,
    ...otherProps
}) => {
    const [visibleWnd, setVisibleWnd] = useState(false);


    /**
      * Handler to close the Window once the OK button
      * on this window is clicked
      */
     const onCloseWindow = () => {
        setVisibleWnd(false);
    };

    /**
      * Handler to show the Window once the button is Clicked
      */
     const onShowWindow = () => {
        setVisibleWnd(true);
    };

    /**
     * Callback called once the user clicks the submit button
     * in the dialog
     */
    const onFinish = useCallback((values) => {
        onCloseWindow();
    }, []);

    return (
        <>
            <Button onClick={onShowWindow} {...otherProps}>{children}</Button>
            {
                visibleWnd &&
                <Window
                    title={children}
                    collapsible
                    onClose={onCloseWindow} 
                    visible={visibleWnd}
                    {...windowProps} 
                >
                    <EditImageryLayerForm
                        layer={layer}
                        onFinish={onFinish}
                    />
                </Window>
            }
        </>
    );
};

EditImageryLayerButton.propTypes = {
    /**
     * The Cesium ImageryLayer to be edited
     */
    layer: PropTypes.instanceOf(ImageryLayer),

    /**
     * The properties for the window component 
     * that is show for the update of the layer.
     * See  components.window.base.Window for more
     * details about the available properties.
     */
    windowProps: PropTypes.object,

    /**
     * The button children: text or JSX element.
     */
    children: PropTypes.node
};

export default EditImageryLayerButton;