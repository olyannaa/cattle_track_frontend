import { Button, Flex, Pagination, Table } from 'antd';
import { HeaderContent } from '../../global-components/HeaderContent/HeaderContent';
import styles from './AnimalAccountingPage.module.css';
import { getColumns, IAnimalTable, items } from './data';
import {
    IAnimal,
    IResponsePaginationInfo,
    useGetAnimalGroupsQuery,
    useLazyGetAnimalsQuery,
    useLazyGetPaginationInfoQuery,
    useUpdateAnimalsMutation,
} from '../../app-service/services/animals';
import { useEffect, useState } from 'react';
import { downloadScvAnimals } from '../../functions/fetchFiles';
import { useAppSelector } from '../../app-service/hooks';
import { selectChangedAnimals } from '../../features/animalsSlice';
import { IUser } from '../../utils/userType';

export const AnimalAccountingPage = () => {
    const user: IUser = JSON.parse(localStorage.getItem('user') || '{}');
    const isEditTable = !!user.permissionIds.find(
        (permission) => permission === '2e4f8621-1071-4bc5-beb0-f06058ec9566'
    );
    const [typeAnimal, setTypeAnimal] = useState<string>('Корова');
    const [animals, setAnimals] = useState<IAnimal[]>([]);
    const changedAnimals = useAppSelector(selectChangedAnimals);
    const [paginationInfo, setPaginationInfo] = useState<IResponsePaginationInfo>();
    const [getPageCountQuery, { isLoading: isLoadingPageCount }] =
        useLazyGetPaginationInfoQuery();
    const [getAnimalsQuery, { isLoading: isLoadingAnimals }] = useLazyGetAnimalsQuery();
    const [updateAnimals, { isLoading: isLoadingUpdate }] = useUpdateAnimalsMutation();
    useGetAnimalGroupsQuery();

    const getCountAnimals = async () => {
        const res = (await getPageCountQuery(typeAnimal)).data;
        setPaginationInfo(res);
    };

    const getAnimals = async (page = 1) => {
        const response = (await getAnimalsQuery({ type: typeAnimal, page: page })).data;
        setAnimals(response || []);
    };

    useEffect(() => {
        getAnimals();
        getCountAnimals();
    }, [typeAnimal]);

    const handlerClickSaveChange = async () => {
        if (!changedAnimals.length) {
            return;
        }
        try {
            const response = await updateAnimals(changedAnimals);
        } catch {}
    };

    const handlerExportCSV = async () => {
        await downloadScvAnimals({ page: 1, type: typeAnimal });
    };

    return (
        <Flex vertical gap={'16px'}>
            <HeaderContent
                items={items}
                title='Учет животных'
                onChange={setTypeAnimal}
                buttonText={'Экспортировать таблицу (SCV)'}
                buttonClick={handlerExportCSV}
            />
            <Flex className={styles['wrapper-table']} vertical>
                <Table<IAnimalTable>
                    columns={getColumns(isEditTable)}
                    style={{ width: '100%' }}
                    dataSource={animals.map((animal) => ({
                        ...animal,
                        key: animal.id,
                    }))}
                    loading={isLoadingPageCount || isLoadingAnimals}
                    pagination={{
                        showSizeChanger: false,
                        total: paginationInfo?.animalCount,
                        pageSize: paginationInfo?.entriesPerPage,
                        onChange: (page) => getAnimals(page),
                        showTotal: (total, range) =>
                            `${range[0]}-${range[1]} из ${total} элементов`,
                        className: styles['pagination'],
                    }}
                />
                {isEditTable && (
                    <Button
                        onClick={handlerClickSaveChange}
                        type='primary'
                        color='default'
                        variant='solid'
                        size='large'
                        loading={isLoadingUpdate}
                    >
                        Сохранить изменения
                    </Button>
                )}
            </Flex>
        </Flex>
    );
};
