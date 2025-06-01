import { Line, LineConfig } from '@ant-design/charts';
import { useAppSelector } from '../../../../../../app-service/hooks';
import { selectStatisticsAnimal } from '../../../../service/weightControlSlice';
import { Flex } from 'antd';

type Props = {
    byItem: 'date' | 'age';
};

export const ChartWeightDynamics = ({ byItem }: Props) => {
    const statisticsAnimal = useAppSelector(selectStatisticsAnimal);
    const config: LineConfig = {
        xField: byItem,
        yField: 'weight',
        padding: 'auto',
        axis: {
            x: {
                position: 'bottom',
                grid: true,
                gridLineWidth: 1,
                gridStroke: 'rgb(0, 0, 26,0.15)',
                gridStrokeOpacity: 1,
                line: true,
                lineLineWidth: 1,
                lineStroke: 'rgb(0, 0, 26,1)',
                label: true,
                labelAlign: 'parallel',
                labelFormatter:
                    byItem === 'age'
                        ? (value: number) => `${value} мес`
                        : (value: string) => value,
            },
            y: {
                position: 'left',
                grid: true,
                gridLineWidth: 1,
                gridStroke: 'rgb(0, 0, 26,0.15)',
                gridStrokeOpacity: 1,
                label: true,
            },
        },
        point: {
            sizeField: 5,
            style: {
                fill: '#ff4218', // Красная заливка
                stroke: '#fff', // Белая обводка
                lineWidth: 2, // Толщина обводки
                shadowColor: 'rgba(255,66,24,1)', // Полупрозрачная тень
                shadowBlur: 4, // Размытие тени
            },
        },
        // tooltip: {
        //     showMarkers: true,

        //     marker: {
        //         stroke: '#FF4218',
        //     },
        // },
        line: {
            style: {
                stroke: '#FF4218',
                strokeWidth: 8,
            },
        },
        area: {
            style: {
                fill: 'linear-gradient(90deg, rgba(255, 66, 24, 0.3) 0%, rgba(255, 66, 24, 0.05) 100%)',
            },
        },
    };
    return (
        <Flex gap={24} vertical>
            <div style={{ fontSize: '16px', fontWeight: '500' }}>
                {byItem === 'age' ? 'Вес по возрасту (месяцам)' : 'Вес по датам'}
            </div>
            <div
                style={{
                    height: '300px',
                    background: '#fff',
                    borderRadius: 8,
                    boxShadow: '0 1px 2px 0 rgba(0,0,0,0.03)',
                }}
            >
                <Line
                    {...config}
                    style={{ overflowX: 'auto' }}
                    data={
                        byItem === 'age'
                            ? statisticsAnimal.dataByAge
                            : statisticsAnimal.dataByDate
                    }
                />
            </div>
        </Flex>
    );
};
