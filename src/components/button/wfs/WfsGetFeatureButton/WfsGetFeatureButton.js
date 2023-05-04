import React, {useCallback, useEffect} from 'react';
import { defined, HeightReference } from 'cesium';
import { Button } from 'antd';
import useWfsGetFeature from '../../../../hooks/wfs/useWfsGetFeature';

const WfsGetFeatureButton = ({
    viewer,
    url,
    ds, 
    wfsOptions, 
    fetchOptions,
    msg, 
    onLoad,
    onError,
    ...otherProps
}) => {
    const [
            wfsSendRequest, 
            wfsClearRequest, 
            wfsResponse, 
            wfsIsLoading,
            wfsError
    ] = useWfsGetFeature();

    const onClickHandler = useCallback((event) => {
        //for testing
        //const filter = {};
        const wfsFilteredOptions = wfsOptions;
        //send request
        wfsSendRequest(url, wfsFilteredOptions, fetchOptions);
    }, [url, wfsOptions, wfsSendRequest, fetchOptions]);

    useEffect(() => {
        if(defined(wfsResponse) && !wfsIsLoading && defined(viewer) && !viewer.isDestroyed()) {
            //load datasource if provided
            defined(ds) && ds.load(wfsResponse,  ds._loadOptions).then((dataSource)=> {
                const entities = dataSource.entities.values;
                viewer && viewer.flyTo(dataSource.entities);
                for (let i = 0; i < entities.length; i++) {
                    const entity = entities[i];
                    if(defined(entity.billboard)) {
                        entity.billboard.heightReference = HeightReference.CLAMP_TO_GROUND;
                    }
                }
            });
            defined(onLoad) && onLoad(wfsResponse);
            wfsClearRequest();
        }
    }, [ds, wfsClearRequest, wfsIsLoading, wfsResponse, viewer, onLoad]);

    useEffect(() => {
        if(defined(wfsError) && !wfsIsLoading) {
            console.log(wfsError);
            defined(onError) && onError(wfsError);
            wfsClearRequest();
        }
    }, [wfsClearRequest, wfsIsLoading, wfsError, onError]);

    return(
        <Button {...otherProps} onClick={onClickHandler} 
        >
            {otherProps.children}
        </Button>
    );
};

export default WfsGetFeatureButton