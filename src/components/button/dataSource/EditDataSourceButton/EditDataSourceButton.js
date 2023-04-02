import {useState, useCallback} from 'react';
import { defined } from 'cesium';
import {Button} from 'antd';
import Window from "../../../window/base/Window/Window";
import EditDataSourceForm from '../../../form/dataSource/EditDataSourceForm';

const EditDataSourceButton = ({
    ds,
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
                visibleWnd && defined(ds) &&
                <Window
                    title={children}
                    collapsible
                    onClose={onCloseWindow} 
                    visible={visibleWnd}
                    {...windowProps} 
                >
                    <EditDataSourceForm
                        ds={ds}
                        onFinish={onFinish}
                    />
                </Window>
            }
        </>
    );
};

export default EditDataSourceButton;