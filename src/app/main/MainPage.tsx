import { Alert, Flex } from 'antd';
import styles from './MainPage.module.css';
import { useGetCommonStatQuery } from './services/statistics';
import { useEffect } from 'react';
import { getUser } from '../../utils/userInfo';
import { IUser } from '../../utils/userType';
import { AnimalType } from './data/animalTypes';

export const MainPage = () => {
    const { data: livestock, refetch } = useGetCommonStatQuery();
    const user: IUser = getUser();

    useEffect(() => {
        refetch();
    }, []);

    return (
        <div>
            <div className='header-container header-max'>
                <div className={styles['main__header']}>
                    <h1>Общая статистика</h1>
                    <Alert className={styles['main__alert']} type='success' message={'Организация: ' + user.organizationName} />
                </div>
                <Flex className={styles['main__stat-container']}>
                    {livestock &&
                        Object.entries(livestock).map(([key, value]) => (
                            <div key={key} className={styles['main__stat-item']}>
                                <p className={styles['main__card-title']}>{AnimalType[key as keyof typeof AnimalType] ?? key}</p>
                                <p className={styles['main__card-number']}>{value}</p>
                            </div>
                        ))}
                </Flex>
            </div>
        </div>
    );
};
