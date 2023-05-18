import { useCallback } from 'react';
import { Button } from 'antd';

/**
 * Button Component to export the grid data as CSV.
 * This button will be available in the grid component.
 */
const ExportCsvFromGridButton = ({ 
    gridApi,
    children,
    ...otherProps 
}) => {

    const handleClick = useCallback(() => {
        gridApi.exportDataAsCsv();
    }, [gridApi]);

    return (
        <Button {...otherProps} onClick={handleClick}>{children}</Button>
    );

};

export default ExportCsvFromGridButton;;