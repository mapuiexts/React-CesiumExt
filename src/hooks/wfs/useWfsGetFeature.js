import { useState, useCallback } from 'react'
import WFS from 'ol/format/WFS';

const useWfsGetFeature = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);

    const sendRequest = useCallback((url, wfsOptions, fetchOptions = {
        method: 'POST', 
        contentType: 'application/xml',

    }) => {
        //build WFS request
        const featureRequest = new WFS().writeGetFeature(wfsOptions);
        const data = new XMLSerializer().serializeToString(featureRequest);
        //log for testing
        console.log('WFS GetFeature Request:');
        console.log(data);
        //format fetch options with the content type
        setIsLoading(true);
        setError(null);
        fetchOptions = {
            method: 'POST',
            contentType: 'application/xml', 
            body: data,
            ...fetchOptions,
        };
        //fetch data
        fetch(url, fetchOptions)
        .then(response => {
            if(!response.ok) {
               throw new Error(response);
            }
            const outputFormat = wfsOptions.outputFormat.toUpperCase();
            if(outputFormat === 'APPLICATION/JSON')
                return response.json();
            else
                return response.text();
        })
        .then(responseData => {
            console.log('WFS GetFeature Response:', responseData);
            let outputFormat = wfsOptions.outputFormat;
            if(outputFormat) outputFormat = outputFormat.toUpperCase();
            if(outputFormat === 'APPLICATION/JSON') {
                setResponse(responseData);
            }
            else {
                const xml = (new window.DOMParser()).parseFromString(responseData, "text/xml")
                setResponse(xml);
            }
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
	
    return [
        sendRequest,
        clearRequest,
        response,
        isLoading,
        error
    ];
};

export default useWfsGetFeature;