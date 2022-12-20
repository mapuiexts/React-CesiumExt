import { useCallback } from 'react';
import { Button } from 'antd';
import {defined, DeveloperError} from 'cesium';

const RemoveDataSourceButton = ({
    dsCollection,
    ds,
    destroy = true,
    children,
    ...otherProps
}) => {
    const onClickHandler = useCallback((event) => {
        if(defined(ds) && defined(dsCollection)) {
            dsCollection.remove(ds, destroy);
        }
        else {
            throw new DeveloperError('Parameters ds and dsCollection should not be null/undefined')
        }
    }, [ds, dsCollection, destroy]);

    return(
        <Button {...otherProps} onClick={onClickHandler}>
            {children}
        </Button>
    );

};

export default RemoveDataSourceButton;