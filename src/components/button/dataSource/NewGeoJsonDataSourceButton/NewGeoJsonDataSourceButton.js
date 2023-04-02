import React, {useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import { GeoJsonDataSource } from 'cesium';
import {Button} from 'antd';
import Window from "../../../window/base/Window/Window";
import GeoJsonDataSourceForm from '../../../form/dataSource/GeoJsonDataSourceForm';
import GeoJsonDataSourceFormat from '../../../../core/format/dataSource/GeoJsonDataSourceFormat';
import { defined, Viewer } from 'cesium';

/**
 * Component button to create a new Cesium GeoJson datasource.
 * Once the user clicks this button, a window will be shown and the
 * user will be able to add the parameters for the new datasource creation.
 * 
 * @visibleName New GeoJson DataSource Button
 */
const NewGeoJsonDataSourceButton = ({
    viewer,
    children,
    windowProps,
    onNewDataSource,
    ...otherProps
}) => {

    const [initialValues, setInitialValues] = useState(null);

     /**
      * Handler to close the Window once the OK button
      * on this window is clicked
      */
     const onCloseWindow = () => {
         setInitialValues(null);
     };
 
     /**
      * Handler to show the Window once the button is Clicked
      */
    const onShowWindow = () => {
        const format = new GeoJsonDataSourceFormat();
        setInitialValues(format.writeJsonDefaultValues());
    };
 
     /**
      * Callback called once the user clicks the submit button
      * in the dialog
      */
     const onFinish = useCallback((values) => {
        const loadOptions = new GeoJsonDataSourceFormat().getLoadOptions(values);
        const ds = new GeoJsonDataSource(values.name);
        ds.show = values.show;
        ds._loadOptions = loadOptions;
        const dataSources = viewer.dataSources;
        dataSources.add(ds);
        defined(onNewDataSource) && onNewDataSource(ds);
        //hide window
        setInitialValues(null);

     }, [viewer.dataSources, onNewDataSource]);

     return (
        <React.Fragment>
            <Button onClick={onShowWindow} {...otherProps}>{children}</Button>
            {
                defined(initialValues) &&
                <Window
                    title={children}
                    collapsible
                    onClose={onCloseWindow} 
                    visible={defined(initialValues)}
                    {...windowProps} 
                >
                    <GeoJsonDataSourceForm
                        initialValues={initialValues}
                        onFinish={onFinish}
                    />
                </Window>
            }
        </React.Fragment>
     );
};

NewGeoJsonDataSourceButton.propTypes = {
    /**
     * The Cesium Viewer on where the datasource
     * will be created.
     */
    viewer: PropTypes.PropTypes.instanceOf(Viewer),

    /**
     * The properties for the window component 
     * that is show for the creation of the layer.
     * See  components.window.base.Window for more
     * details about the available properties.
     */
    windowProps: PropTypes.object,

    /**
     * Method handler called once the datasource is
     * created. This function will have as parameter
     * the newly created datasource.
     */
    onNewDataSource: PropTypes.func,

    /**
     * The button children: text or JSX element.
     */
    children: PropTypes.node

};

export default NewGeoJsonDataSourceButton;