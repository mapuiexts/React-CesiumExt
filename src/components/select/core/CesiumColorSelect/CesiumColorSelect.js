import { useMemo } from 'react';
import {Tag, Select} from 'antd';
import { Color } from 'cesium';

const CesiumColorSelect = (props) => {
    
    const options = useMemo(() => {
        return(
            [
                {
                    value: 'black',
                    label: <Tag color="black">Black</Tag>,
                    color: Color.BLACK
                },
                {
                    value: 'blue',
                    label: <Tag color="blue">Blue</Tag>,
                    color: Color.BLUE
                },
                {
                    value: 'cyan',
                    label: <Tag color="cyan">Cyan</Tag>,
                    color: Color.CYAN
                },
                {
                    value: 'gold',
                    label: <Tag color="gold">Gold</Tag>,
                    color: Color.GOLD,
                },
                {
                    value: 'green',
                    label: <Tag color="green">Green</Tag>,
                    color: Color.GREEN
                },
                {
                    value: 'lime',
                    label: <Tag color="lime">Lime</Tag>,
                    color: Color.LIME
                },
                {
                    value: 'purple',
                    label: <Tag color="purple">Purple</Tag>,
                    color: Color.PURPLE
                },
                {
                    value:'red',
                    label: <Tag color="red">Red</Tag>,
                    color: Color.RED
                },
                {
                    value: 'RoyalBlue',
                    label: <Tag color="RoyalBlue">Royal Blue</Tag>,
                    color: Color.ROYALBLUE
                },
                {
                    value: 'yellow',
                    label: <Tag color="yellow">Yellow</Tag>,
                    color: Color.YELLOW
                },
                {
                    value: 'white',
                    label: <Tag color="white">White</Tag>,
                    color: Color.WHITE
                },
            ]
        );
      }, []);

    return(
        <Select {...props} options={options}/>
    );
};

export default CesiumColorSelect;