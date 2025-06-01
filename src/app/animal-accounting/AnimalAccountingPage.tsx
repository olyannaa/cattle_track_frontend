import {
    Button,
    Checkbox,
    CheckboxChangeEvent,
    Flex,
    message,
    Table,
    TablePaginationConfig,
} from 'antd';
import { HeaderContent } from '../../global-components/header-content/HeaderContent';
import styles from './AnimalAccountingPage.module.css';
import {
    useDeleteAnimalsMutation,
    useLazyGetAllAnimalIdsQuery,
    useGetAnimalsGroupsQuery,
    useGetIdentificationFieldsNamesQuery,
    useLazyGetAnimalsQuery,
    useLazyGetPaginationInfoQuery,
    useUpdateAnimalsMutation,
} from './services/animals';
import { useEffect, useState } from 'react';
import { downloadScvAnimals } from '../../functions/fetchFiles';
import { useAppDispatch, useAppSelector } from '../../app-service/hooks';
import {
    addDeleteAllAnimals,
    resetDeleteAllAnimals,
    selectChangedAnimals,
    selectDeleteAnimals,
} from './services/animalsSlice';
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
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [noActiveAnimals, setNoActiveAnimals] = useState<boolean>(false);
    const [sortedColumn, setSortedColumn] = useState<string | null>(null);
    const [descending, setDescending] = useState<boolean>(true);
    const [isSelectedAllAnimals, setIsSelectedAllAnimals] = useState<boolean>(false);
    const changedAnimals = useAppSelector(selectChangedAnimals);
    const deleteAnimals = useAppSelector(selectDeleteAnimals);
    const [paginationInfo, setPaginationInfo] = useState<IResponsePaginationInfo>();
    const [allAnimalIds, setAllAnimalIds] = useState<string[]>([]);

    const [getPageCountQuery, { isLoading: isLoadingPageCount }] =
        useLazyGetPaginationInfoQuery();
    const [getAnimalsQuery, { isLoading: isLoadingAnimals }] = useLazyGetAnimalsQuery();
    const [deleteAnimalsMutation] = useDeleteAnimalsMutation();
    const [updateAnimals] = useUpdateAnimalsMutation();
    useGetAnimalsGroupsQuery();
    const { data } = useGetIdentificationFieldsNamesQuery();
    const dispatch = useAppDispatch();

    const [getAllAnimalIdsQuery] = useLazyGetAllAnimalIdsQuery();

    const [messageApi, contextHolder] = message.useMessage();

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Данные успешно изменены',
        });
    };

    const error = (error: string) => {
        messageApi.open({
            type: 'error',
            content: error,
        });
    };

    const getCountAnimals = async () => {
        const res = (
            await getPageCountQuery({ type: typeAnimal, active: !noActiveAnimals })
        ).data;
        setPaginationInfo(res);
    };

    const getAllAnimalIds = async () => {
        const res = (await getAllAnimalIdsQuery(!noActiveAnimals)).data;
        setAllAnimalIds(res || []);
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
        getAnimals(currentPage);
        getCountAnimals();
    }, [sortedColumn, descending]);

    useEffect(() => {
        setNoActiveAnimals(false);
        if (isEditTable && typeAnimal !== 'Яловые') {
            setButtons([
                {
                    text: 'Экспортировать таблицу (CSV)',
                    buttonClick: handlerExportCSV,
                },
                {
                    text: 'Сохранить таблицу',
                    buttonClick: handlerClickSaveChange,
                },
            ]);
        } else {
            setButtons([]);
        }
    }, [typeAnimal]);

    useEffect(() => {
        setCurrentPage(1);
        getAnimals(1);
        getCountAnimals();
        if (typeAnimal === 'Яловые') {
            dispatch(resetDeleteAllAnimals());
            getAllAnimalIds();
            setIsSelectedAllAnimals(false);
        }
    }, [typeAnimal, noActiveAnimals]);

    const handlerClickSaveChange = async () => {
        if (!changedAnimals.length) {
            return;
        }
        try {
            setCurrentPage(1);
            await updateAnimals(changedAnimals).unwrap();
            await getAnimals();
            await getCountAnimals();
            success();
        } catch (err) {
            const currentErr = err as { data: { errorText: string } };
            error(currentErr?.data?.errorText || 'Ошибка при изменении данных');
        }
    };

    const handlerExportCSV = async () => {
        await downloadScvAnimals({
            page: currentPage,
            type: typeAnimal,
            active: !noActiveAnimals,
            column: sortedColumn,
            descending: descending,
        });
    };

    const handlerChangeCurrentPagination = (page: number) => {
        setCurrentPage(page);
        getAnimals(page);
    };

    const [buttons, setButtons] = useState<{ text: string; buttonClick: () => void }[]>(
        []
    );

    const handlerChangeSelectedAllAnimals = (e: CheckboxChangeEvent) => {
        setIsSelectedAllAnimals(e.target.checked);
        if (e.target.checked) {
            dispatch(addDeleteAllAnimals(allAnimalIds));
        } else {
            dispatch(resetDeleteAllAnimals());
        }
    };

    const handlerDeleteAnimals = async () => {
        if (deleteAnimals.length === 0) {
            return;
        }
        await deleteAnimalsMutation(deleteAnimals);

        setNoActiveAnimals(false);
    };

    return (
        <Flex vertical gap={'16px'}>
            {contextHolder}
            <HeaderContent
                items={items}
                title='Учет животных'
                onChange={setTypeAnimal}
                buttons={buttons}
            />
            <Flex
                className={styles['table']}
                vertical
                style={{ maxWidth: typeAnimal === 'Яловые' ? '848px' : '' }}
            >
                <Checkbox
                    onChange={(e) => setNoActiveAnimals(e.target.checked)}
                    style={{
                        maxWidth: '285px',
                        padding: '8px 12px 10px',
                        border: '1px solid var(--grey-border)',
                        borderRadius: '2px',
                        background: 'var(--global-bg)',
                        height: '40px',
                        marginTop: '20px',
                        marginBottom: '20px',
                    }}
                    checked={noActiveAnimals}
                >
                    Отображать неактивных животных
                </Checkbox>
                {typeAnimal === 'Яловые' && (
                    <Flex
                        justify='space-between'
                        className={styles['wrapper-delete-actions']}
                        wrap={'wrap-reverse'}
                        gap={8}
                    >
                        <Button
                            onClick={handlerDeleteAnimals}
                            style={{
                                height: '40px',
                            }}
                            className={styles['delete-actions__button']}
                        >
                            Удалить выбранные записи
                        </Button>
                        <Flex
                            align='center'
                            gap={16}
                            className={styles['wrapper-button']}
                        >
                            <div
                                style={{ fontWeight: '500' }}
                            >{`Выбрано: ${deleteAnimals.length}`}</div>

                            <Checkbox
                                onChange={handlerChangeSelectedAllAnimals}
                                style={{
                                    width: '138px',
                                    padding: '8px 12px 10px',
                                    border: '1px solid var(--grey-border)',
                                    borderRadius: '2px',
                                    background: 'var(--global-bg)',
                                    height: '40px',
                                }}
                                checked={isSelectedAllAnimals}
                            >
                                Выбрать все
                            </Checkbox>
                        </Flex>
                    </Flex>
                )}
                <Table<IAnimalTable>
                    columns={getColumns(isEditTable, data || [], typeAnimal === 'Яловые')}
                    style={{
                        width: '100%',
                        maxWidth: typeAnimal === 'Яловые' ? '800px' : '',
                    }}
                    dataSource={animals.map((animal) => ({
                        ...animal,
                        key: animal.id,
                    }))}
                    loading={isLoadingPageCount || isLoadingAnimals}
                    pagination={{
                        showSizeChanger: false,
                        current: currentPage,
                        total: paginationInfo?.count,
                        pageSize: paginationInfo?.entriesPerPage,
                        onChange: (page) => handlerChangeCurrentPagination(page),
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
