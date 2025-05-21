import { Flex, Typography } from 'antd';
import { useState } from 'react';
import { FilterAnimals } from '../filter-animals/FilterAnimals';
import { FormAddInspection } from '../forms/form-add-inspection/FormAddInspection';
import { FormAddTreatment } from '../forms/form-add-treatment/FormAddTreatment';
import { FormAddTransfer } from '../forms/form-add-transfer/FormAddTransfer';
import { FormAddDisposal } from '../forms/form-add-disposal/FormAddDisposal';

import { useAppSelector } from '../../../../app-service/hooks';
import { selectSelectedAnimals } from '../../service/animalsDailyActionsSlice';
import { FormAddAssigmentNumber } from '../forms/form-add-assignment-number/FormAddAssigmentNumber';
import { getNameTabs, items } from '../../data/const/tabs';
import {
    useLazyGetDailyActionsQuery,
    useLazyGetPaginationInfoDailyActionsQuery,
} from '../../service/dailyActions';
import { selectSortersDailyActions } from '../../service/dailyActionsSlice';
import { WrapperFormResearch } from '../wrapper-form-research/WrapperFormResearch';

type Props = {
    keyTab: string;
};

export const TabsContent = ({ keyTab }: Props) => {
    const selectedAnimals = useAppSelector(selectSelectedAnimals);
    const sorters = useAppSelector(selectSortersDailyActions);
    const [isGroupAction, setIsGroupAction] = useState<boolean>(false);
    const title = items && items.find((item) => item.key === keyTab)?.label?.toString();

    const [getDailyActionsQuery] = useLazyGetDailyActionsQuery();
    const [getPaginationInfoDailyActionsQuery] =
        useLazyGetPaginationInfoDailyActionsQuery();

    const resetHistory = async () => {
        const name = getNameTabs(keyTab);
        await getDailyActionsQuery({
            ...sorters,
            type: name,
        });
        await getPaginationInfoDailyActionsQuery(name);
    };

    return (
        <Flex vertical style={{ width: '100%' }} gap={24}>
            <Typography.Title level={3}>{title}</Typography.Title>
            <FilterAnimals
                isGroup={isGroupAction}
                setIsGroup={setIsGroupAction}
                keyTab={keyTab}
            />
            {selectedAnimals.length !== 0 && (
                <>
                    {keyTab === '1' && (
                        <FormAddInspection
                            isGroup={isGroupAction}
                            type='1'
                            resetHistory={resetHistory}
                        />
                    )}
                    {keyTab === '2' && (
                        <FormAddInspection
                            isGroup={isGroupAction}
                            type='2'
                            resetHistory={resetHistory}
                        />
                    )}
                    {keyTab === '3' && (
                        <FormAddTreatment
                            isGroup={isGroupAction}
                            resetHistory={resetHistory}
                        />
                    )}
                    {keyTab === '4' && (
                        <FormAddTransfer
                            isGroup={isGroupAction}
                            resetHistory={resetHistory}
                        />
                    )}
                    {keyTab === '5' && (
                        <FormAddDisposal
                            isGroup={isGroupAction}
                            resetHistory={resetHistory}
                        />
                    )}
                    {keyTab === '6' && (
                        <WrapperFormResearch
                            isGroup={isGroupAction}
                            resetHistory={resetHistory}
                        />
                    )}
                    {keyTab === '7' && (
                        <FormAddAssigmentNumber
                            isGroup={isGroupAction}
                            resetHistory={resetHistory}
                        />
                    )}
                </>
            )}
        </Flex>
    );
};
