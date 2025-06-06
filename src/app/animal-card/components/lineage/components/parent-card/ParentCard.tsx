import { Card } from 'antd';
import { AnimalDetail } from '../../../../data/interfaces/animal-details';
import { useDispatch } from 'react-redux';
import { setSelectedAnimal } from '../../../../../daily-actions/service/animalsDailyActionsSlice';
import styles from './ParentCard.module.css';

export const ParentCard = ({ parent }: { parent: AnimalDetail }) => {
    const dispatch = useDispatch();
    const handleSelectAnimal = (animalId: string) => {
        dispatch(setSelectedAnimal(animalId));
    };

    return (
        <Card
            className={styles['parent-card']}
            title={parent.name}
            extra={
                <div className={styles['parent-card__link']} onClick={() => handleSelectAnimal(parent.id)}>
                    Открыть карточку
                </div>
            }
        >
            <p>Номер: {parent.tagNumber}</p>
            <p>Порода: {parent.breed}</p>
            <p>Дата рождения: {parent.birthDate}</p>
            <p>Статус: {parent.status}</p>
        </Card>
    );
};
