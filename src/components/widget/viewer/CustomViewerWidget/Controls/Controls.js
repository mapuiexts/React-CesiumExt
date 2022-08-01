const Controls = ({
    children,
    ...otherProps
}) => {
    return (
        <div className="cesium-viewer-toolbar" {...otherProps}>
                {children}
        </div>
    );
};

export default Controls;