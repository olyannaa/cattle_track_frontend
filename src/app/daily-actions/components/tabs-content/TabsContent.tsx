import { Flex, Typography } from 'antd';
import { useEffect } from 'react';
import { FilterAnimals } from '../filter-animals/FilterAnimals';
import { FormAddInspection } from '../forms/form-add-inspection/FormAddInspection';

import { FormAddTransfer } from '../forms/form-add-transfer/FormAddTransfer';
import { FormAddDisposal } from '../forms/form-add-disposal/FormAddDisposal';
import { useAppDispatch, useAppSelector } from '../../../../app-service/hooks';
import {
    changeIsGroup,
    selectSelectedAnimals,
} from '../../service/animalsDailyActionsSlice';
import { FormAddAssigmentNumber } from '../forms/form-add-assignment-number/FormAddAssigmentNumber';
import { getNameTabs, items } from '../../data/const/tabs';
import {
    useLazyGetDailyActionsQuery,
    useLazyGetPaginationInfoDailyActionsQuery,
} from '../../service/dailyActions';
import {
    deleteAllActions,
    selectSortersDailyActions,
} from '../../service/dailyActionsSlice';
import { WrapperFormResearch } from '../wrapper-form-research/WrapperFormResearch';
import { FormAddTreatment } from '../forms/form-add-treatment/FormAddTreatment';

type Props = {
    keyTab: string;
};

export const TabsContent = ({ keyTab }: Props) => {
    const selectedAnimals = useAppSelector(selectSelectedAnimals);
    const sorters = useAppSelector(selectSortersDailyActions);
    const title = items && items.find((item) => item.key === keyTab)?.label?.toString();

    const dispatch = useAppDispatch();

    const [getDailyActionsQuery] = useLazyGetDailyActionsQuery();
    const [getPaginationInfoDailyActionsQuery] =
        useLazyGetPaginationInfoDailyActionsQuery();

    const resetHistory = async () => {
        const name = getNameTabs(keyTab);
        await getDailyActionsQuery({
            ...sorters,
            type: name,
        });
        dispatch(deleteAllActions());
        await getPaginationInfoDailyActionsQuery(name);
    };

    useEffect(() => {
        dispatch(changeIsGroup(false));
    }, [keyTab]);

    return (
        <Flex vertical style={{ width: '100%' }} gap={24}>
            <Typography.Title level={3}>{title}</Typography.Title>
            <FilterAnimals keyTab={keyTab} />
            {selectedAnimals.length !== 0 && (
                <>
                    {keyTab === '1' && (
                        <FormAddInspection type='1' resetHistory={resetHistory} />
                    )}
                    {keyTab === '2' && (
                        <FormAddInspection type='2' resetHistory={resetHistory} />
                    )}
                    {keyTab === '3' && <FormAddTreatment resetHistory={resetHistory} />}
                    {keyTab === '4' && <FormAddTransfer resetHistory={resetHistory} />}
                    {keyTab === '5' && <FormAddDisposal resetHistory={resetHistory} />}
                    {keyTab === '6' && (
                        <WrapperFormResearch resetHistory={resetHistory} />
                    )}
                    {keyTab === '7' && (
                        <FormAddAssigmentNumber resetHistory={resetHistory} />
                    )}
                </>
            )}
        </Flex>
    );
};
