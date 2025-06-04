import { HistoryPoint } from '../../../data/interfaces/animal-chart';
import { Line } from '@ant-design/plots';

export const WeightChart = ({ points }: { points: HistoryPoint[] }) => {
    const config = {
        data: points,
        xField: 'x',
        yField: 'y',
        point: {
            sizeField: 5,
            style: {
                fill: '#ff4218',
                stroke: '#fff',
                lineWidth: 2,
                shadowColor: 'rgba(255,66,24,1)',
                shadowBlur: 4,
            },
        },
        padding: 'auto',
        paddingRight: 15,
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
                labelAlign: 'horizontal',
                // size: 20,
                tickCount: points.length > 5 ? 5 : points.length,
                // label: {
                //     autoRotate: false, // Отключаем автоматический поворот
                //     rotate: 0, // Явно указываем нулевой угол поворота
                //     offset: 10, // Отступ подписей от оси
                // style: {
                //     fontSize: 12,
                //     textAlign: 'center', // Выравнивание по центру
                //     fill: '#666',
                // },
                // formatter: (text: string) => {
                //     const date = new Date(text);
                //     return date.toLocaleDateString('ru-RU', {
                //         day: '2-digit',
                //         month: '2-digit',
                //         year: '2-digit',
                //     });
                // },
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

    return <Line {...config} style={{ overflowX: 'auto' }} />;
};
