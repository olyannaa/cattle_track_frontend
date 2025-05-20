import { Table } from 'antd';
import { IDailyActionTable } from '../../../data/interface/IDailyActionTable';
import { useEffect, useState } from 'react';
import {
    IRequestGetDailyActions,
    useLazyGetDailyActionsQuery,
} from '../../../service/dailyActions';
import { useAppSelector } from '../../../../../app-service/hooks';
import { selectPaginationInfoDailyActions } from '../../../service/dailyActionsSlice';

export const TableHistory = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const paginationInfo = useAppSelector(selectPaginationInfoDailyActions);
    const [getDailyActionsQuery] = useLazyGetDailyActionsQuery();

    const getDailyActions = async (data?: IRequestGetDailyActions) => {
        await getDailyActionsQuery(
            data || {
                page: currentPage,
                type: nameTab,
                sortColumn: sortedColumn,
                descending: isDescending,
            }
        );
    };

    useEffect(() => {
        getDailyActions();
        getPaginationInfoDailyActivities();
    }, [currentPage]);

    const handlerChangeCurrentPagination = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <Table<IDailyActionTable>
            columns={getColumnsTable()}
            dataSource={dailyActions.map((dailyAction) => ({
                ...dailyAction,
                key: dailyAction.id,
            }))}
            style={{ width: '100%', overflowX: 'auto' }}
            pagination={{
                showSizeChanger: false,
                current: currentPage,
                total: paginationInfo?.count,
                pageSize: paginationInfo?.entriesPerPage,
                onChange: (page) => handlerChangeCurrentPagination(page),
                showTotal: (total, range) =>
                    `${range[0]}-${range[1]} из ${total} элементов`,
                //className: styles['table__pagination'],
            }}
            onChange={onChangeTable}
        />
    );
};
