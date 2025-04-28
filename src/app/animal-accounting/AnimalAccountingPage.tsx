import { Flex, message, Table, TablePaginationConfig } from 'antd';
import { HeaderContent } from '../../global-components/header-content/HeaderContent';
import styles from './AnimalAccountingPage.module.css';
import {
    useGetAnimalsGroupsQuery,
    useLazyGetAnimalsQuery,
    useLazyGetPaginationInfoQuery,
    useUpdateAnimalsMutation,
} from './services/animals';
import { useEffect, useState } from 'react';
import { downloadScvAnimals } from '../../functions/fetchFiles';
import { useAppSelector } from '../../app-service/hooks';
import { selectChangedAnimals } from './services/animalsSlice';
import { CheckPermissions, Permissions } from '../../utils/permissions';
import { IAnimalTable } from './data/interfaces/animalTable';
import { getColumns, items } from './data/const/tableAnimal';
import { IAnimal, IResponsePaginationInfo } from './data/types/animal';
import { CheckboxCustom } from '../../global-components/custom-inputs/checkbox/Checkbox';
import { FilterValue, SorterResult } from 'antd/es/table/interface';

export const AnimalAccountingPage = () => {
    const isEditTable = CheckPermissions(Permissions.animalEditTable);
    const [typeAnimal, setTypeAnimal] = useState<string>('Корова');
    const [animals, setAnimals] = useState<IAnimal[]>([]);
    const [noActiveAnimals, setNoActiveAnimals] = useState<boolean>(false);
    const [sortedColumn, setSortedColumn] = useState<string | null>(null);
    const [descending, setDescending] = useState<boolean>(true);
    const changedAnimals = useAppSelector(selectChangedAnimals);
    const [paginationInfo, setPaginationInfo] = useState<IResponsePaginationInfo>();
    const [getPageCountQuery, { isLoading: isLoadingPageCount }] =
        useLazyGetPaginationInfoQuery();
    const [getAnimalsQuery, { isLoading: isLoadingAnimals }] = useLazyGetAnimalsQuery();
    const [updateAnimals] = useUpdateAnimalsMutation();
    useGetAnimalsGroupsQuery();

    const [messageApi, contextHolder] = message.useMessage();

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Данные успешно изменены',
        });
    };

    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'Ошибка при изменении данных',
        });
    };

    const getCountAnimals = async () => {
        const res = (
            await getPageCountQuery({ type: typeAnimal, active: !noActiveAnimals })
        ).data;
        setPaginationInfo(res);
    };

    const onChangeTable = (
        newPagination: TablePaginationConfig,
        filters: Record<string, FilterValue | null>,
        sorter: SorterResult<IAnimalTable> | SorterResult<IAnimalTable>[]
    ) => {
        newPagination;
        filters;
        if (!sorter || (!Array.isArray(sorter) && !sorter.field)) {
            setSortedColumn(null);
            setDescending(true);
        } else {
            if (!Array.isArray(sorter)) {
                const field = sorter.field as string;
                setSortedColumn(field.charAt(0).toUpperCase() + field.slice(1));
                setDescending(sorter.order === 'descend');
            }
        }
    };

    const getAnimals = async (page = 1) => {
        const response = (
            await getAnimalsQuery({
                type: typeAnimal,
                page: page,
                active: !noActiveAnimals,
                column: sortedColumn,
                descending: descending,
            })
        ).data;
        setAnimals(response || []);
    };

    useEffect(() => {
        getAnimals();
        getCountAnimals();
    }, [typeAnimal, noActiveAnimals, sortedColumn, descending]);

    const handlerClickSaveChange = async () => {
        if (!changedAnimals.length) {
            return;
        }
        try {
            await updateAnimals(changedAnimals).unwrap();
            await getAnimals();
            await getCountAnimals();
            success();
        } catch {
            error();
        }
    };

    const handlerExportCSV = async () => {
        await downloadScvAnimals({
            page: 1,
            type: typeAnimal,
            active: !noActiveAnimals,
            column: sortedColumn,
            descending: descending,
        });
    };

    const buttons = [
        {
            text: 'Экспортировать таблицу (CSV)',
            buttonClick: handlerExportCSV,
        },
    ];

    if (isEditTable) {
        buttons.push({
            text: 'Сохранить таблицу',
            buttonClick: handlerClickSaveChange,
        });
    }

    return (
        <Flex vertical gap={'16px'}>
            {contextHolder}
            <HeaderContent
                items={items}
                title='Учет животных'
                onChange={setTypeAnimal}
                buttons={buttons}
            />
            <Flex className={styles['table']} vertical>
                <CheckboxCustom
                    title='Отображать неактивных животных'
                    onChange={(e) => setNoActiveAnimals(e.target.checked)}
                    style={{ maxWidth: '285px', marginTop: '20px', marginBottom: '20px' }}
                />
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
                        className: styles['table__pagination'],
                    }}
                    onChange={onChangeTable}
                />
            </Flex>
        </Flex>
    );
};
