import React from 'react';
import './ButtonControlContainer.css';

const ButtonControlContainer = ({
    children,
    ...otherProps
}) => {

    const arrayChildren = React.Children.toArray(children);
    const newProp = {
        className: 'cesium-button',
        style: {position:'relative'}
    };

    return (
        <div className="react-cesiumext-button-control-container" {...otherProps}>
            {React.Children.map(arrayChildren, child => {
                return React.cloneElement(child, newProp)
            })}
            
        </div>
    );
};

export default ButtonControlContainer;
