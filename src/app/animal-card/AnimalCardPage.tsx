import { useEffect, useState } from 'react';
import { FilterFormInfo } from './components/filter-form/FilterFormInfo';
import { useAppSelector } from '../../app-service/hooks';
import { selectSelectedAnimals } from '../daily-actions/service/animalsDailyActionsSlice';
import { useGetAnimalDetailQuery, useLazyGetAnimalDetailQuery } from './services/animal-card';
import { AnimalDetail } from './data/interfaces/animal-details';
import { BaseInfo } from './components/base-info/BaseInfo';
import { HistoryEventWrapper } from './components/history-event/HistoryEventWrapper';
import { HistoryWeightWrapper } from './components/history-weight/HistoryWeightWrapper';

export const AnimalCardPage = () => {
    const selectedAnimals = useAppSelector(selectSelectedAnimals);
    const [getAnimalDetails, { isLoading: loadBaseInfo }] = useLazyGetAnimalDetailQuery();
    const [animalData, setAnimalData] = useState<AnimalDetail | null>(null);

    useEffect(() => {
        if (selectedAnimals.length) {
            getDetails();
        }
    }, [selectedAnimals]);

    const getDetails = async () => {
        try {
            const result = await getAnimalDetails(selectedAnimals[0]).unwrap();
            setAnimalData(result);
        } catch (error) {
            console.error('Ошибка при получении данных животного:', error);
        }
    };

    return (
        <div className='content-container'>
            <h1 className='form-title'>Карточка животного</h1>
            <FilterFormInfo />
            {animalData && <BaseInfo animal={animalData} />}
            <HistoryEventWrapper />
            <HistoryWeightWrapper />
        </div>
    );
};
