import { Flex } from 'antd';
import { Area, Line } from '@ant-design/charts';
import { TableWeights } from './components/TableWeights';
import { useAppSelector } from '../../../../app-service/hooks';
import { selectSelectedAnimalWeightControl } from '../../service/weightControlSlice';

export const AnalysisWeights = () => {
    const selectedAnimal = useAppSelector(selectSelectedAnimalWeightControl);
    const data = [
        { month: '12 мес', value: 200 },
        { month: '14 мес', value: 300 },
        { month: '16 мес', value: 400 },
        { month: '18 мес', value: 450 },
        { month: '24 мес', value: 350 },
        { month: '27 мес', value: 500 },
        { month: '29 мес', value: 550 },
        { month: '30 мес', value: 600 },
    ];
    const config = {
        data,
        xField: 'month',
        yField: 'value',
        padding: 'auto',

        // Стиль осей как на изображении
        xAxis: {
            label: {
                style: {
                    fill: '#333',
                    fontSize: 12,
                },
            },
            line: {
                style: {
                    stroke: '#d9d9d9',
                },
            },
            tickLine: {
                style: {
                    stroke: '#d9d9d9',
                },
            },
        },

        yAxis: {
            label: {
                style: {
                    fill: '#333',
                    fontSize: 12,
                },
            },
            grid: {
                line: {
                    style: {
                        stroke: '#f0f0f0',
                        lineDash: [4, 4],
                    },
                },
            },
        },

        // Стиль линии
        lineStyle: {
            stroke: '#FF4218',
            lineWidth: 1,
        },

        // Стиль точек
        point: {
            size: 4,
            shape: 'circle',
            style: {
                fill: '#FF4218',
                stroke: '#fff',
                lineWidth: 1,
            },
        },

        // Отключение анимации для более строгого вида
        animation: false,

        // Настройка области графика

        // Настройка всплывающей подсказки
        tooltip: {
            showMarkers: true,
            marker: {
                stroke: '#1890ff',
            },
        },

        style: {
            fill: 'linear-gradient(-90deg, white 0%, darkgreen 100%)',
        },
        axis: {
            y: { labelFormatter: '~s' },
        },
        line: {
            style: {
                stroke: '#FF4218',
                strokeWidth: 2,
            },
        },
    };

    return (
        selectedAnimal && (
            <Flex vertical gap={24}>
                <div style={{ fontSize: '24px', fontWeight: '500' }}>
                    Динамика веса животного
                </div>
                <div
                    style={{
                        height: '300px',
                        background: '#fff',
                        padding: 24,
                        borderRadius: 8,
                        boxShadow: '0 1px 2px 0 rgba(0,0,0,0.03)',
                    }}
                >
                    <Area {...config} style={{ overflowX: 'auto' }} />
                </div>
                <TableWeights />
            </Flex>
        )
    );
};
