import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../../../../app-service/hooks';
import { selectSelectedAnimals } from '../../../../../daily-actions/service/animalsDailyActionsSlice';
import { useLazyGetAnimalActionsQuery } from '../../../../services/animal-card';
import { AnimalAction } from '../../../../data/interfaces/animal-actions';
import { Flex } from 'antd/lib';
import { Collapse, CollapseProps } from 'antd';
import styles from '../Event.module.css';

interface EventsProps {
    loading: (isLoading: boolean) => void;
}

export const Events = ({ loading }: EventsProps) => {
    const selectedAnimals = useAppSelector(selectSelectedAnimals);
    const [getAnimalActions, { isLoading: loadEvents }] = useLazyGetAnimalActionsQuery();
    const [data, setData] = useState<AnimalAction[]>([]);

    useEffect(() => {
        if (selectedAnimals.length) {
            fetchData();
        }
    }, [selectedAnimals]);

    const fetchData = async () => {
        try {
            const response = await getAnimalActions(selectedAnimals[0]).unwrap();
            setData(response);
        } catch (err) {
            console.error(err);
        }
    };
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU');
    };

    const collapseItems: CollapseProps['items'] = data.map((action) => ({
        key: action.animalId + action.eventDate,
        label: (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{action.eventType}</span>
                <span>{formatDate(action.eventDate)}</span>
            </div>
        ),
        children: (
            <div>
                {Object.entries(action.fields).map(([key, value]) => (
                    <p>
                        <span>
                            {key}: {value || '—'}
                        </span>
                    </p>
                ))}
                {action.performedBy && <p>Выполнил: {action.performedBy}</p>}
            </div>
        ),
    }));

    return (
        <Flex className={styles.event}>
            <Collapse items={collapseItems} style={{ width: '100%' }} />
        </Flex>
    );
};
