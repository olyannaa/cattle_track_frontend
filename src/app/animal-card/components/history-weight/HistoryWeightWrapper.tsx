import { Flex, Spin } from 'antd';
import { WeightChart } from './weight-chart/WeightChart';
import { WeightTable } from './weight-table/WeightTable';
import { useAppSelector } from '../../../../app-service/hooks';
import { useLazyGetWeightInfoQuery } from '../../services/animal-card';
import { selectSelectedAnimals } from '../../../daily-actions/service/animalsDailyActionsSlice';
import { useEffect, useState } from 'react';
import { AnimalHistoryData } from '../../data/interfaces/animal-chart';
import { LoadingOutlined } from '@ant-design/icons';

export const HistoryWeightWrapper = () => {
    const selectedAnimals = useAppSelector(selectSelectedAnimals);
    const [getChartData, { isLoading }] = useLazyGetWeightInfoQuery();
    const [chartData, setChartData] = useState<AnimalHistoryData | null>(null);

    useEffect(() => {
        if (selectedAnimals.length) {
            fetchChart();
        }
    }, [selectedAnimals]);

    const fetchChart = async () => {
        try {
            const response = await getChartData(selectedAnimals[0]).unwrap();
            setChartData(response);
        } catch (err) {
            console.error(err);
        }
    };
    if (!chartData) {
        return;
    }
    if (isLoading) {
        <Spin style={{ margin: 'auto' }} indicator={<LoadingOutlined spin style={{ color: '#ff4218' }} />} />;
    }

    return (
        <Flex vertical>
            <h2 className='form-title'>Изменение веса</h2>
            <WeightChart points={chartData.points}></WeightChart>
            <WeightTable points={chartData.points} />
        </Flex>
    );
};
