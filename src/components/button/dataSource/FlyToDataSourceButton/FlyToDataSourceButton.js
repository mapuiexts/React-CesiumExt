import { useCallback } from 'react';
import { Button } from 'antd';

/**
 * Button to Fly to the entities present in the data source
 */
const FlyToDataSourceButton = ({
    viewer,
    ds,
    children,
    ...otherProps
}) => {
    const onClickHandler = useCallback((event) => {
        viewer && viewer.flyTo(ds.entities);
    }, [ds, viewer]);

    return(
        <Button {...otherProps} onClick={onClickHandler}>
            {children}
        </Button>
    );
};

export default FlyToDataSourceButton;