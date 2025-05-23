import {
    Button,
    Checkbox,
    CheckboxChangeEvent,
    Flex,
    Table,
    TablePaginationConfig,
    Typography,
} from 'antd';
import {
    useDeleteDailyActionsMutation,
    useDeleteDailyActionsResearchMutation,
    useLazyGetDailyActionsQuery,
    useLazyGetPaginationInfoDailyActionsQuery,
} from '../../service/dailyActions';

import { useEffect, useState } from 'react';
import { IDailyActionTable } from '../../data/interface/IDailyActionTable';
import { useAppDispatch, useAppSelector } from '../../../../app-service/hooks';
import {
    addAllActions,
    changeSortersDailyActions,
    deleteAllActions,
    selectDailyActions,
    selectPaginationInfoDailyActions,
    selectSelectedDailyActions,
    selectSortersDailyActions,
} from '../../service/dailyActionsSlice';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { getNameTabs } from '../../data/const/tabs';
import { getColumnsTable } from '../../functions/getColumnsTableHistory';
import styles from './History.module.css';

type Props = {
    keyTab: string;
};

export const History = ({ keyTab }: Props) => {
    const sorters = useAppSelector(selectSortersDailyActions);
    const selectedDailyActions = useAppSelector(selectSelectedDailyActions);
    const paginationInfo = useAppSelector(selectPaginationInfoDailyActions);
    const dailyActions = useAppSelector(selectDailyActions);

    const [nameTab, setNameTab] = useState(getNameTabs(keyTab));
    const [isSelectedAllActions, setIsSelectedAllActions] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    const [getDailyActionsQuery, { isLoading: isLoadingGetDailyActions }] =
        useLazyGetDailyActionsQuery();
    const [deleteDailyActionsQuery] = useDeleteDailyActionsMutation();
    const [deleteDailyActionsResearchQuery] = useDeleteDailyActionsResearchMutation();
    const [
        getPaginationInfoDailyActionsQuery,
        { isLoading: isLoadingGetPaginationInfoDailyActions },
    ] = useLazyGetPaginationInfoDailyActionsQuery();

    const getDailyActions = async () => {
        await getDailyActionsQuery({
            ...sorters,
            type: nameTab,
        });
    };

    const getPaginationInfoDailyActivities = async () => {
        await getPaginationInfoDailyActionsQuery(nameTab);
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
        if (selectedDailyActions.length === 0) {
            return;
        }
        if (keyTab === '6') {
            await deleteDailyActionsResearchQuery(selectedDailyActions);
        } else {
            await deleteDailyActionsQuery(selectedDailyActions);
        }
        dispatch(
            changeSortersDailyActions({
                ...sorters,
                page: 1,
            })
        );
    };

    const onChangeTable = (
        newPagination: TablePaginationConfig,
        filters: Record<string, FilterValue | null>,
        sorter: SorterResult<IDailyActionTable> | SorterResult<IDailyActionTable>[]
    ) => {
        newPagination;
        filters;

        if (!sorter || (!Array.isArray(sorter) && !sorter.field)) {
            dispatch(
                changeSortersDailyActions({
                    page: newPagination.current,
                    column: '',
                    descending: true,
                })
            );
        } else {
            if (!Array.isArray(sorter)) {
                const field = sorter.field as string;
                dispatch(
                    changeSortersDailyActions({
                        page: newPagination.current,
                        column: field.charAt(0).toUpperCase() + field.slice(1),
                        descending: sorter.order === 'descend',
                    })
                );
            }
        }
    };

    useEffect(() => {
        const newName = getNameTabs(keyTab);
        dispatch(
            changeSortersDailyActions({
                column: '',
                descending: true,
                page: 1,
            })
        );
        dispatch(deleteAllActions());
        setNameTab(newName);
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

    useEffect(() => {
        getDailyActions();
        getPaginationInfoDailyActivities();
    }, [sorters]);

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
            <Flex
                justify='space-between'
                className={styles['wrapper-delete-actions']}
                wrap={'wrap-reverse'}
                gap={8}
            >
                <Button
                    onClick={handlerDeleteActions}
                    style={{
                        height: '40px',
                    }}
                    className={styles['delete-actions__button']}
                >
                    Удалить выбранные записи
                </Button>
                <Flex align='center' gap={16} className={styles['wrapper-button']}>
                    <div
                        style={{ fontWeight: '500' }}
                    >{`Выбрано: ${selectedDailyActions.length}`}</div>

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
                </Flex>
            </Flex>
            <Table<IDailyActionTable>
                key={keyTab}
                columns={getColumnsTable(keyTab, sorters)}
                dataSource={dailyActions.map((dailyAction) => ({
                    ...dailyAction,
                    key: dailyAction.id,
                }))}
                style={{ width: '100%', overflowX: 'auto' }}
                pagination={{
                    showSizeChanger: false,
                    current: sorters.page,
                    total: paginationInfo?.count,
                    pageSize: paginationInfo?.entriesPerPage,
                    showTotal: (total, range) =>
                        `${range[0]}-${range[1]} из ${total} элементов`,
                    //className: styles['table__pagination'],
                }}
                onChange={onChangeTable}
                loading={
                    isLoadingGetDailyActions || isLoadingGetPaginationInfoDailyActions
                }
            />
        </Flex>
    );
};
