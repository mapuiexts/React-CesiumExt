import {Button} from 'antd';
import { useCallback } from 'react';

const FlyToButton = ({
    camera,
    flyToOptions,
    children,
    ...otherProps
}) => {

    const onClick = useCallback(() => {
        camera && camera.flyTo(flyToOptions);
    }, [camera, flyToOptions])

    return(
        <Button {...otherProps} onClick={onClick}>{children}</Button>
    );
};

export default FlyToButton;