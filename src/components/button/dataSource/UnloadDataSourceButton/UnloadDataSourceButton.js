import { useCallback } from 'react';
import { Button } from 'antd';
import {defined, DeveloperError} from 'cesium';

/**
 * Button to remove all the entities from a specific data source
 */
const UnloadDataSourceButton = ({
    ds,
    children,
    ...otherProps
}) => {
    const onClickHandler = useCallback((event) => {
        if(defined(ds) ) {
            ds.entities.removeAll();
        }
        else {
            throw new DeveloperError('Property ds should be provided');
        }
    }, [ds]);

    return(
        <Button {...otherProps} onClick={onClickHandler}>
            {children}
        </Button>
    );

};

export default UnloadDataSourceButton;