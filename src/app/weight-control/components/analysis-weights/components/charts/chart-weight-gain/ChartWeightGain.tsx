import { Line, LineConfig } from '@ant-design/charts';
import { useAppSelector } from '../../../../../../../app-service/hooks';
import { selectStatisticsAnimal } from '../../../../../service/weightControlSlice';
import { Flex } from 'antd';
import styles from './ChartWeightGain.module.css';

export const ChartWeightGain = () => {
    const statisticsAnimal = useAppSelector(selectStatisticsAnimal);
    const config: LineConfig = {
        xField: 'date',
        yField: 'sup',
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
                fill: '#fff',
                stroke: '#ff4218',
                lineWidth: 1,
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
    return (
        <Flex wrap={'wrap-reverse'} gap={24}>
            <div
                style={{
                    height: '300px',
                    background: '#fff',
                    borderRadius: 8,
                    boxShadow: '0 1px 2px 0 rgba(0,0,0,0.03)',
                }}
                className={styles['wrapper-chart']}
            >
                <Line
                    {...config}
                    data={statisticsAnimal.dataBySUP}
                    style={{ overflowX: 'auto' }}
                />
            </div>
            <Flex wrap className={styles['statistics']}>
                <div className={styles['statistics-item']}>
                    {`Средний СУП: ${statisticsAnimal.meanSUP} кг/сут`}
                </div>
                <div className={styles['statistics-item']}>
                    {`Максимальный СУП: ${statisticsAnimal.maxSUP} кг/сут`}
                </div>
                <div className={styles['statistics-item']}>
                    {`Минимальный СУП: ${statisticsAnimal.minSUP} кг/сут`}
                </div>
            </Flex>
        </Flex>
    );
};
