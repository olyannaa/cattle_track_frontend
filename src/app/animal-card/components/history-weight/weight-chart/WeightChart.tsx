import { useEffect, useState } from 'react';
import { HistoryPoint } from '../../../data/interfaces/animal-chart';
import { Line } from '@ant-design/plots';
import { getCountItemsChart } from '../../../../weight-control/functions/getCountItemsChart';
import { useWindowSize } from '../../../../../hooks/useWindowSize';
import { chartStyles } from '../../../../../styles/chart-styles';

export const WeightChart = ({ points }: { points: HistoryPoint[] }) => {
    const widthWindow = useWindowSize();
    const [countItem, setCountItem] = useState(getCountItemsChart('', widthWindow));

    useEffect(() => {
        setCountItem(getCountItemsChart('', widthWindow));
    }, [widthWindow]);

    const config = {
        data: points,
        xField: 'x',
        yField: 'y',
        tooltip: {
            title: (d: HistoryPoint) => d.x,
            items: [
                (d: HistoryPoint) => ({
                    color: '#ff4218',
                    name: 'Вес',
                    value: `${d.y} кг`,
                }),
            ],
        },
        scrollbar: {
            x:
                points.length < countItem
                    ? false
                    : {
                          ratio: countItem / points.length,
                      },
        },
        ...chartStyles,
    };

    return <Line className='bottom-margin-xl' {...config} style={{ overflowX: 'auto' }} />;
};
