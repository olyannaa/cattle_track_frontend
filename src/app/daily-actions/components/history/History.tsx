import { Button, Checkbox, CheckboxChangeEvent, Flex, Table, Typography } from 'antd';
import { columnsTableHistoryInspection } from '../../data/const/columnsTableHistoryInspection';
import {
    IDailyAction,
    IResponsePaginationInfoDailyActions,
    useDeleteDailyActionsMutation,
    useDeleteDailyActionsResearchMutation,
    useLazyGetDailyActionsQuery,
    useLazyGetPaginationInfoDailyActionsQuery,
} from '../../service/dailyActions';
import { items } from '../../data';
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
    selectReset,
    selectSelectedDailyActions,
} from '../../service/dailyActionsSlice';
import { columnsTableHistoryAssignmentNumbers } from '../../data/const/columnsTableHistoryAssignmentNumbers';

type Props = {
    keyTab: string;
};

export const History = ({ keyTab }: Props) => {
    const [nameTab, setNameTab] = useState(
        items?.find((item) => item.key === keyTab)?.label?.toString() || ''
    );

    const reset = useAppSelector(selectReset);

    const selectedDailyActions = useAppSelector(selectSelectedDailyActions);
    const [dailyActions, setDailyActions] = useState<IDailyAction[]>([]);
    const [paginationInfo, setPaginationInfo] =
        useState<IResponsePaginationInfoDailyActions>();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isSelectedAllActions, setIsSelectedAllActions] = useState<boolean>(false);
    const [getDailyActionsQuery] = useLazyGetDailyActionsQuery();
    const [deleteDailyActionsQuery] = useDeleteDailyActionsMutation();
    const [deleteDailyActionsResearchQuery] = useDeleteDailyActionsResearchMutation();
    const [getPaginationInfoDailyActionsQuery] =
        useLazyGetPaginationInfoDailyActionsQuery();

    const dispatch = useAppDispatch();
    useEffect(() => {
        setNameTab(items?.find((item) => item.key === keyTab)?.label?.toString() || '');
        setCurrentPage(1);
    }, [keyTab]);

    useEffect(() => {
        getDailyActivities();
        getPaginationInfoDailyActivities();
    }, [nameTab, reset]);

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
        getDailyActivities();
        getPaginationInfoDailyActivities();
    }, [currentPage]);

    const getDailyActivities = async () => {
        const response = (
            await getDailyActionsQuery({ page: currentPage, type: nameTab })
        ).data;
        setDailyActions(response || []);
    };

    const getPaginationInfoDailyActivities = async () => {
        const response = (await getPaginationInfoDailyActionsQuery(nameTab)).data;
        setPaginationInfo(response);
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
        getDailyActivities();
        getPaginationInfoDailyActivities();
    };

    const handlerChangeCurrentPagination = (page: number) => {
        setCurrentPage(page);
    };

    const getColumnsTable = () => {
        switch (keyTab) {
            case '1':
                return columnsTableHistoryInspection;
            case '2':
                return columnsTableHistoryInspection;
            case '3':
                return columnsTableHistoryTreatment;
            case '4':
                return columnsTableHistoryTransfer;
            case '5':
                return columnsTableHistoryDisposal;
            case '6':
                return columnsTableHistoryResearch;
            case '7':
                return columnsTableHistoryAssignmentNumbers;
            default:
                break;
        }
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
            />
        </Flex>
    );
};
