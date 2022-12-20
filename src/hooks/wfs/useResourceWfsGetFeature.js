import { useState, useCallback } from 'react'
import { defined, Resource } from 'cesium';
import WFS from 'ol/format/WFS';

const useResourceWfsGetFeature = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);

    const sendPostRequest = useCallback(({
        resource, 
        wfsResourceOptions,
        wfsGetFeatureOptions
    }) => {

        const localResource = defined(resource) ? resource : new Resource(wfsResourceOptions);
        //build WFS request
        const featureRequest = new WFS().writeGetFeature(wfsGetFeatureOptions);
        const data = new XMLSerializer().serializeToString(featureRequest);
        //log for testing
        console.log('WFS GetFeature Request:');
        console.log(data);
        //format fetch options with the content type
        setIsLoading(true);
        setError(null);
        const resourceOpts = {
            headers: {
                contentType: 'application/xml', 
            },
            responseType: !defined(wfsGetFeatureOptions.outputFormat) || wfsGetFeatureOptions.outputFormat === 'application/json' ? 'json' : 'xml',
            ...wfsResourceOptions
        };
        //Resource.post(resourceOpts)
        localResource.post(data, resourceOpts)
        .then(response => {
            console.log('WFS GetFeature Response:', response);
            setResponse(response);
            setIsLoading(false);
        })
        .catch(error => {
            setError(error.message);
            setIsLoading(false);
        });

    }, []);

    const clearRequest = useCallback(() => {
        setIsLoading(false);
        setError(null);
        setResponse(null);
    }, []);
	
    return {
        sendPostRequest,
        clearRequest,
        response,
        isLoading,
        error
    };
};

export default useResourceWfsGetFeature;