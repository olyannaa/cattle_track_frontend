import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../../app-service/hooks';
import { useLazyGetParentsQuery } from '../../services/animal-card';
import { selectSelectedAnimals } from '../../../daily-actions/service/animalsDailyActionsSlice';
import { AnimalDetail } from '../../data/interfaces/animal-details';

export const Lineage = () => {
    const selectedAnimals = useAppSelector(selectSelectedAnimals);
    const [getAnimalParents, { isLoading: loadEvents }] = useLazyGetParentsQuery();
    const [data, setData] = useState<AnimalDetail[]>([]);

    useEffect(() => {
        if (selectedAnimals.length) {
            fetchData();
        }
    }, [selectedAnimals]);

    const fetchData = async () => {
        try {
            const response = await getAnimalParents(selectedAnimals[0]).unwrap();
            console.log(response);
            setData(response);
        } catch (err) {
            console.error(err);
        }
    };

    return <p>ff</p>;
};
