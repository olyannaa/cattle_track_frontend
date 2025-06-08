import { Flex } from 'antd';
import { AnimalDetail } from '../../data/interfaces/animal-details';
import { useEffect, useState } from 'react';
import styles from './BaseInfo.module.css';

interface InfoItem {
    [key: string]: string | null;
}

export const BaseInfo = ({ animal }: { animal: AnimalDetail }) => {
    const [baseInfo, setBaseInfo] = useState<InfoItem[]>([]);
    const [additionalIds, setAdditionalIds] = useState<InfoItem[]>([]);
    const [leftColumn, setLeftColumn] = useState<InfoItem[]>([]);
    const [rightColumn, setRightColumn] = useState<InfoItem[]>([]);

    useEffect(() => {
        fillInfo();
        parseAdditionalInfo();
    }, [animal]);

    useEffect(() => {
        setLeftColumn(baseInfo.slice(0, 6));
        setRightColumn(baseInfo.slice(6));
    }, [baseInfo]);

    const fillInfo = () => {
        setBaseInfo([
            { Категория: animal.type },
            { Статус: animal.status },
            {
                'Дата и причины выбытия': `${animal.dateOfDisposal ?? 'Не указано'}, ${
                    animal.reasonOfDisposal ?? 'Не указано'
                }`,
            },
            { Группа: animal.groupName },
            { 'Дата рождения': animal.birthDate },
            { Порода: animal.breed },
            { Происхождение: animal.origin },
            { 'Место происхождения': animal.originLocation },
            { Мать: animal.motherTagNumber },
            { Отец: animal.fatherTagNumber },
        ]);
    };

    const parseAdditionalInfo = () => {
        try {
            const rawJson = animal.identificationDataJson;
            if (!rawJson) return;

            const parsed = JSON.parse(rawJson) as Record<string, string>;
            const entries = Object.entries(parsed).map(([key, value]) => ({ [key]: value }));
            setAdditionalIds(entries);
        } catch (error) {
            console.error('Ошибка при парсинге identificationDataJson:', error);
        }
    };

    return (
        <Flex vertical className={`${styles['base-info__wrapper']} form-additional`}>
            <h2 className='form-title'>Информация о животном №{animal.tagNumber}</h2>
            <div className={styles.gridContainer}>
                {baseInfo.length &&
                    [leftColumn, rightColumn].map((column, colIdx) => (
                        <div key={colIdx} className={styles.gridColumn}>
                            {column.map((item, rowIdx) => {
                                const key = Object.keys(item)[0];
                                const value = item[key];
                                return (
                                    <div key={rowIdx} className={styles.gridRow}>
                                        <span className={styles.label}>{key}:</span>
                                        <span className={styles.value}>{value || 'Не указано'}</span>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
            </div>
            <h3>Дополнительные идентификаторы</h3>
            <div className={styles['base-info__add-container']}>
                {additionalIds.length > 0 ? (
                    additionalIds.map((item, index) => {
                        const key = Object.keys(item)[0];
                        const value = item[key];

                        return (
                            <div key={index + key} className={styles.gridRow}>
                                <span className={styles.label}>{key}:</span>
                                <span className={styles.value}>{value || 'Не указано'}</span>
                            </div>
                        );
                    })
                ) : (
                    <span>Нет данных</span>
                )}
            </div>
        </Flex>
    );
};
