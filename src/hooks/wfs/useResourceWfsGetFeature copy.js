import { useState, useCallback } from 'react'
import { Resource } from 'cesium';
import WFS from 'ol/format/WFS';

const useResourceWfsGetFeature = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);

    const sendPostRequest = useCallback((wfsResourceOptions, wfsOptions) => {
        //build WFS request
        const featureRequest = new WFS().writeGetFeature(wfsOptions);
        const data = new XMLSerializer().serializeToString(featureRequest);
        //log for testing
        console.log('WFS GetFeature Request:');
        console.log(data);
        //format fetch options with the content type
        setIsLoading(true);
        setError(null);
        const resourceOpts = {
            //url: url,
            data: data,
            headers: {
                contentType: 'application/xml', 
            },
            responseType: 'json',
            ...wfsResourceOptions
        };
        Resource.post(resourceOpts)
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