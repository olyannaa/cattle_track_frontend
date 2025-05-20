import {
    Button,
    Checkbox,
    CheckboxChangeEvent,
    Flex,
    Table,
    TablePaginationConfig,
    Typography,
} from 'antd';
import { columnsTableHistoryInspection } from '../../data/const/columnsTableHistoryInspection';
import {
    IDailyAction,
    IRequestGetDailyActions,
    IResponsePaginationInfoDailyActions,
    useDeleteDailyActionsMutation,
    useDeleteDailyActionsResearchMutation,
    useLazyGetDailyActionsQuery,
    useLazyGetPaginationInfoDailyActionsQuery,
} from '../../service/dailyActions';

import { useEffect, useState } from 'react';
import { columnsTableHistoryTreatment } from '../../data/const/columnsTableHistoryTreatment';
import { columnsTableHistoryTransfer } from '../../data/const/columnsTableHistoryTransfer';
import { columnsTableHistoryResearch } from '../../data/const/columnsTableHistoryResearch';
import { columnsTableHistoryDisposal } from '../../data/const/columnsTableHistoryDisposal';
import { IDailyActionTable } from '../../data/interface/IDailyActionTable';
import { useAppDispatch, useAppSelector } from '../../../../app-service/hooks';
import {
    addAllActions,
    deleteAllActions,
    selectDailyActions,
    selectPaginationInfoDailyActions,
    selectSelectedDailyActions,
} from '../../service/dailyActionsSlice';
import { columnsTableHistoryAssignmentNumbers } from '../../data/const/columnsTableHistoryAssignmentNumbers';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { items } from '../../data/const/tabs';
import { getColumnsTable } from '../../functions/getColumnsTableHistory';

type Props = {
    keyTab: string;
};

export const History = ({ keyTab }: Props) => {
    const [nameTab, setNameTab] = useState(
        items?.find((item) => item.key === keyTab)?.label?.toString() || ''
    );
    const [currentPage, setCurrentPage] = useState<number>(1);
    const selectedDailyActions = useAppSelector(selectSelectedDailyActions);
    const paginationInfo = useAppSelector(selectPaginationInfoDailyActions);
    const dailyActions = useAppSelector(selectDailyActions);
    const [isSelectedAllActions, setIsSelectedAllActions] = useState<boolean>(false);
    const [sortedColumn, setSortedColumn] = useState<string>('tagNumber');
    const [isDescending, setIsDescending] = useState<boolean>(true);
    const [getDailyActionsQuery] = useLazyGetDailyActionsQuery();
    const [deleteDailyActionsQuery] = useDeleteDailyActionsMutation();
    const [deleteDailyActionsResearchQuery] = useDeleteDailyActionsResearchMutation();
    const [getPaginationInfoDailyActionsQuery] =
        useLazyGetPaginationInfoDailyActionsQuery();

    const dispatch = useAppDispatch();
    useEffect(() => {
        const newName =
            items?.find((item) => item.key === keyTab)?.label?.toString() || '';
        setNameTab(newName);
        setCurrentPage(1);
    }, [keyTab]);

    useEffect(() => {
        getDailyActions();
        getPaginationInfoDailyActivities();
    }, [nameTab]);

    useEffect(() => {
        if (
            selectedDailyActions.length === dailyActions.length &&
            dailyActions.length > 0
        ) {
            setIsSelectedAllActions(true);
        } else {
            setIsSelectedAllActions(false);
        }
    }, [selectedDailyActions]);

    useEffect(() => {});

    const getDailyActions = async (data?: IRequestGetDailyActions) => {
        await getDailyActionsQuery(
            data || {
                page: 1,
                type: nameTab,
                sortColumn: 'tagNumber',
                descending: true,
            }
        );
    };

    const getPaginationInfoDailyActivities = async (name?: string) => {
        await getPaginationInfoDailyActionsQuery(name || nameTab);
    };

    const handlerChangeSelectedAllActions = (e: CheckboxChangeEvent) => {
        setIsSelectedAllActions(e.target.checked);
        if (e.target.checked) {
            dispatch(addAllActions(dailyActions.map((action) => action.id)));
        } else {
            dispatch(deleteAllActions());
        }
    };

    const handlerDeleteActions = async () => {
        if (keyTab === '6') {
            await deleteDailyActionsResearchQuery(selectedDailyActions);
        } else {
            await deleteDailyActionsQuery(selectedDailyActions);
        }
        getDailyActions();
        getPaginationInfoDailyActivities();
    };

    const onChangeTable = (
        newPagination: TablePaginationConfig,
        filters: Record<string, FilterValue | null>,
        sorter: SorterResult<IDailyActionTable> | SorterResult<IDailyActionTable>[]
    ) => {
        newPagination;
        filters;
        if (!sorter || (!Array.isArray(sorter) && !sorter.field)) {
            setSortedColumn('tagNumber');
            setIsDescending(true);
        } else {
            if (!Array.isArray(sorter)) {
                const field = sorter.field as string;
                setSortedColumn(field.charAt(0).toUpperCase() + field.slice(1));
                setIsDescending(sorter.order === 'descend');
            }
        }
    };

    const handlerChangeCurrentPagination = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <Flex
            gap={12}
            vertical
            style={{
                padding: '24px 20px',
                background: 'var(--global-bg)',
                borderRadius: '8px',
            }}
        >
            <Typography.Title level={3}>История</Typography.Title>
            <Flex justify='space-between'>
                <Checkbox
                    onChange={handlerChangeSelectedAllActions}
                    style={{
                        width: '138px',
                        padding: '8px 12px 10px',
                        border: '1px solid var(--grey-border)',
                        borderRadius: '2px',
                        background: 'var(--global-bg)',
                        height: '40px',
                    }}
                    checked={isSelectedAllActions}
                >
                    Выбрать все
                </Checkbox>
                <Flex align='center' gap={16}>
                    <div
                        style={{ fontWeight: '500' }}
                    >{`Выбрано: ${selectedDailyActions.length}`}</div>
                    <Button onClick={handlerDeleteActions}>
                        Удалить выбранные записи
                    </Button>
                </Flex>
            </Flex>
            <Table<IDailyActionTable>
                columns={getColumnsTable(keyTab)}
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
        </Flex>
    );
};
