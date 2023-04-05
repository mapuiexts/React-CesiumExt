import React, {useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import WfsGeoJsonDataSource from '../../../../core/packages/engine/DataSources/WfsGeoJsonDataSource';
import {Button} from 'antd';
import Window from "../../../window/base/Window/Window";
import WfsGeoJsonDataSourceForm from '../../../form/dataSource/WfsGeoJsonDataSourceForm';
import WfsGeoJsonDataSourceFormat from '../../../../core/format/dataSource/WfsGeoJsonDataSourceFormat';
import { defined, Viewer } from 'cesium';

/**
 * Component button to create a new GeoJson datasource for Wfs Requests.
 * Once the user clicks this button, a window will be shown and the
 * user will be able to add the parameters for the new datasource creation.
 * 
 * @visibleName New Wfs GeoJson DataSource Button
 */
const NewWfsGeoJsonDataSourceButton = ({
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
        const format = new WfsGeoJsonDataSourceFormat();
        setInitialValues(format.writeJsonDefaultValues());
    };
 
     /**
      * Callback called once the user clicks the submit button
      * in the dialog
      */
     const onFinish = useCallback((values) => {
        //create new datasource
        const ds = new WfsGeoJsonDataSource(values.name);
        //update datasource with the custom attributes: resource, wfsOptions and style
        const format = new WfsGeoJsonDataSourceFormat();
        format.readJson(values, ds);
        viewer.dataSources.add(ds);
        defined(onNewDataSource) && onNewDataSource(ds);
        //hide window
        setInitialValues(null);

     }, [viewer, onNewDataSource]);

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
                    <WfsGeoJsonDataSourceForm
                        initialValues={initialValues}
                        onFinish={onFinish}
                    />
                </Window>
            }
        </React.Fragment>
     );
};

NewWfsGeoJsonDataSourceButton.propTypes = {
    /**
     * The Cesium Viewer on where the datasource
     * will be created.
     */
    viewer: PropTypes.PropTypes.instanceOf(Viewer),

    /**
     * The properties for the window component 
     * that is show for the datasource creation.
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

export default NewWfsGeoJsonDataSourceButton;