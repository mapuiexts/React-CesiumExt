import React, {useCallback, useEffect, useRef, useState} from 'react';
import { defined, Entity } from 'cesium';
import {intersects} from 'ol/format/filter';
import { Button } from 'antd';
import useResourceWfsGetFeature from '../../../../hooks/wfs/useResourceWfsGetFeature';
import OLPolygonFormat from '../../../../core/format/openLayers/geometry/OLPolygonFormat';
import DrawPolygon from '../../../../core/interaction/draw/DrawPolygon';


const WfsGetFeatureByPolygonButton = ({
    viewer,
    ds, 
    wfsResourceOptions,
    wfsGetFeatureOptions, 
    msg, 
    onLoad,
    onError,
    ...otherProps
}) => {

    const wfsGetFeature = useResourceWfsGetFeature();
    const interactionRef = useRef(null);
    const [filter, setFilter] = useState(null);
    

    /**
     * method executed after the polygon is drawed
     * on the map.
     * This method will build the openlayers polygon
     * filter to be sent in the wfs request.
     */
    const interactionEndedHandler = useCallback((graphics) => {
        console.log('Interaction ended', graphics);
        const entity = new Entity({
			polygon : graphics
		});
        const geom = new OLPolygonFormat().WriteOLGeometry(entity);
        const localGetFeatureOptions = {...ds?._wfs?.wfsGetFeature, ...wfsGetFeatureOptions};
        console.log('ol polygon', geom);
        interactionRef.current.interactionEnded.removeEventListener(interactionEndedHandler);
        interactionRef.current = null;
        const polygonFilter = intersects(
            localGetFeatureOptions.geometryName, 
            geom,
            localGetFeatureOptions.srsName
        );
        setFilter(polygonFilter);
        
    }, [wfsGetFeatureOptions, ds?._wfs?.wfsGetFeature]);

    /**
     * method executed after the user clicks in the button.
     * This method will start the interaction to request the
     * user to draw the polygon on the map.
     */
    const onClickHandler = useCallback(() => {
        if(!defined(interactionRef.current)) {
            interactionRef.current = new DrawPolygon(viewer, viewer.entities);
            interactionRef.current.interactionEnded.addEventListener(interactionEndedHandler);
            interactionRef.current.start();
        }
    },[viewer, interactionEndedHandler]);


    /**
     * Method executed after the polygon filter is built based
     * on the polygon drawed on the map.
     * This method will send a wfs request with the 
     * polygon filter.
     */
    useEffect(()=> {
        if(defined(filter)) {
            setFilter(null);
            const wfsGetFeatureFilteredOptions = {...ds?._wfs?.wfsGetFeature, ...wfsGetFeatureOptions, filter};
            //send request
            const resource = ds?._wfs?.resource;
            wfsGetFeature.sendPostRequest({
                resource: resource, 
                wfsResourceOptions: wfsResourceOptions, 
                wfsGetFeatureOptions: wfsGetFeatureFilteredOptions
            });
        }

    }, [filter, wfsGetFeature, ds?._wfs?.resource, ds?._wfs?.wfsGetFeature, wfsGetFeatureOptions, wfsResourceOptions]);

    /**
     * Method executed after the wfs geojson response is returned.
     * This method will load in the prop dataSource the returned
     * response and the loaded entities will be visible on the 
     * cesium viewer. 
     */
    useEffect(() => {
        if(defined(wfsGetFeature.response) && !wfsGetFeature.isLoading) {
            //load datasource if provided
            defined(ds) && ds.load(wfsGetFeature.response, ds._loadOptions).then((dataSource)=> {
                console.log('datasource', dataSource);
                //const entities = dataSource.entities.values;
                viewer && viewer.flyTo(dataSource.entities);
                // for (let i = 0; i < entities.length; i++) {
                //     const entity = entities[i];
                //     console.log('entity', entity);
                //     if(defined(entity.billboard)) {
                //         entity.billboard.heightReference = HeightReference.CLAMP_TO_GROUND;
                //     }
                // }
            });
            defined(onLoad) && onLoad(wfsGetFeature.response);
            wfsGetFeature.clearRequest();
        }
    }, [ds, wfsGetFeature, viewer, onLoad]);

    /**
     * Method executed if an error is returned from the wfs response
     */
    useEffect(() => {
        if(defined(wfsGetFeature.error) && !wfsGetFeature.isLoading) {
            console.log(wfsGetFeature.error);
            defined(onError) && onError(wfsGetFeature.error);
            wfsGetFeature.clearRequest();
        }
    }, [wfsGetFeature,  onError]);

    return(
        <Button {...otherProps} onClick={onClickHandler} 
        >
            {otherProps.children}
        </Button>
    );
};

export default WfsGetFeatureByPolygonButton