import { Table, TablePaginationConfig } from 'antd';
import { IDailyActionAnimalsTable } from '../../../data/interface/IDailyActionAnimalsTable';
import { columnsChoiceAnimalsTable } from '../../../data/const/columnsChoiceAnimalsTable';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { useAppDispatch, useAppSelector } from '../../../../../app-service/hooks';
import {
    changeSortersAnimals,
    resetSortersAnimals,
    selectAnimals,
    selectFiltersAnimals,
    selectSortersAnimals,
} from '../../../service/animalsDailyActionsSlice';
import { useEffect, useState } from 'react';
import {
    FiltersAnimalsType,
    IRequestGetFilterAnimals,
    IResponsePaginationInfoDailyActions,
    useLazyGetFilterAnimalsQuery,
    useLazyGetPaginationInfoFilterAnimalsQuery,
} from '../../../service/dailyActions';

type Props = {
    isGroup: boolean;
};

export const TableFilterAnimals = ({ isGroup }: Props) => {
    const [paginationInfo, setPaginationInfo] =
        useState<IResponsePaginationInfoDailyActions>();

    const sorters = useAppSelector(selectSortersAnimals);
    const animals = useAppSelector(selectAnimals);
    const filters = useAppSelector(selectFiltersAnimals);

    const dispatch = useAppDispatch();

    const [getFilterAnimalsQuery] = useLazyGetFilterAnimalsQuery();
    const [getPaginationInfoFilterAnimalsQuery] =
        useLazyGetPaginationInfoFilterAnimalsQuery();

    const getFilterAnimals = async (
        data: IRequestGetFilterAnimals = { filters: filters, sorters: sorters }
    ) => {
        await getFilterAnimalsQuery(data);
    };

    const getPaginationInfoFilterAnimals = async (data: FiltersAnimalsType = filters) => {
        const response = (await getPaginationInfoFilterAnimalsQuery(data)).data;
        setPaginationInfo(response);
    };

    const onChangeTable = (
        newPagination: TablePaginationConfig,
        filters: Record<string, FilterValue | null>,
        sorter:
            | SorterResult<IDailyActionAnimalsTable>
            | SorterResult<IDailyActionAnimalsTable>[]
    ) => {
        filters;
        if (!sorter || (!Array.isArray(sorter) && !sorter.field)) {
            dispatch(
                changeSortersAnimals({
                    page: newPagination.current,
                    column: 'TagNumber',
                    descending: 'false',
                })
            );
        } else {
            if (!Array.isArray(sorter)) {
                const field = sorter.field as string;
                dispatch(
                    changeSortersAnimals({
                        page: newPagination.current,
                        column: field.charAt(0).toUpperCase() + field.slice(1),
                        descending: sorter.order === 'descend',
                    })
                );
            }
        }
    };

    useEffect(() => {
        getFilterAnimals();
        dispatch(resetSortersAnimals());
        if (isGroup) {
            getPaginationInfoFilterAnimals();
            dispatch(changeSortersAnimals({ ...sorters, page: 1 }));
        }
    }, [filters]);

    useEffect(() => {
        getFilterAnimals();
        if (isGroup) {
            getPaginationInfoFilterAnimals();
        }
    }, [sorters]);

    return (
        <Table<IDailyActionAnimalsTable>
            style={{ width: '100%' }}
            columns={columnsChoiceAnimalsTable}
            dataSource={animals.map((animal) => ({
                ...animal,
                key: animal.id,
            }))}
            pagination={{
                showSizeChanger: false,
                current: sorters.page,
                total: paginationInfo?.count,
                pageSize: paginationInfo?.entriesPerPage,
                showTotal: (total, range) =>
                    `${range[0]}-${range[1]} из ${total} элементов`,
            }}
            onChange={onChangeTable}
        />
    );
};
