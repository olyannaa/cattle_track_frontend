import { useEffect } from 'react';
import { useAppSelector } from '../../../../../../app-service/hooks';
import { selectSelectedAnimals } from '../../../../../daily-actions/service/animalsDailyActionsSlice';
import { useLazyGetAnimalActionsQuery } from '../../../../services/animal-card';

interface EventsProps {
    loading: (isLoading: boolean) => void;
}

export const Events = ({ loading }: EventsProps) => {
    const selectedAnimals = useAppSelector(selectSelectedAnimals);
    const [getAnimalActions, { isLoading: loadEvents }] = useLazyGetAnimalActionsQuery();
    const [data, setData] = useLazyGetAnimalActionsQuery();

    useEffect(() => {
        if (selectedAnimals.length) {
            fetchData();
        }
    }, [selectedAnimals]);

    const fetchData = () => {
        getAnimalActions('20059ef6-da1d-449d-8492-2a7e399b082e');
    };

    return <p>События</p>;
};
