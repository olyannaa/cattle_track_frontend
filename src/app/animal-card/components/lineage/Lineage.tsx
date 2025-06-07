import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../../app-service/hooks';
import { useLazyGetParentsQuery } from '../../services/animal-card';
import { selectSelectedAnimals } from '../../../daily-actions/service/animalsDailyActionsSlice';
import { AnimalDetail } from '../../data/interfaces/animal-details';
import { Flex } from 'antd';
import { ParentCard } from './components/parent-card/ParentCard';
import styles from './Lineage.module.css';

export const Lineage = ({ animal }: { animal: AnimalDetail }) => {
    const selectedAnimals = useAppSelector(selectSelectedAnimals);
    const [getAnimalParents] = useLazyGetParentsQuery();
    const [data, setData] = useState<AnimalDetail[]>([]);
    const [leftColumn, setLeftColumn] = useState<AnimalDetail[]>([]);
    const [rightColumn, setRightColumn] = useState<AnimalDetail[]>([]);

    useEffect(() => {
        if (selectedAnimals.length) {
            fetchData();
        }
    }, [selectedAnimals]);

    const fetchData = async () => {
        try {
            const response = await getAnimalParents(selectedAnimals[0]).unwrap();
            setData(response);
            setLeftColumn(response.slice(0, response.length / 2));
            setRightColumn(response.slice(response.length / 2));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Flex vertical>
            <h2>Родословная животного №{animal.tagNumber}</h2>
            <Flex className={styles.gridContainer}>
                <div className={styles.gridItem}>Номер: {animal.tagNumber}</div>
                <div className={styles.gridItem}>Порода: {animal.breed}</div>
                <div className={styles.gridItem}>Дата рождения: {animal.birthDate}</div>
                <div className={styles.gridItem}>Статус: {animal.status}</div>
            </Flex>
            <Flex wrap={true} gap={16}>
                <Flex className={styles.lineage__col} vertical gap={24}>
                    {leftColumn.map((parent: AnimalDetail) => (
                        <ParentCard key={parent.id} parent={parent} />
                    ))}
                </Flex>
                <Flex className={styles.lineage__col} vertical gap={24}>
                    {rightColumn.map((parent: AnimalDetail) => (
                        <ParentCard key={parent.id} parent={parent} />
                    ))}
                </Flex>
            </Flex>
        </Flex>
    );
};
