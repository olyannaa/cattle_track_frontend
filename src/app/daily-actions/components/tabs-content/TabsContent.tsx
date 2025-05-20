import { Flex, Form, Typography } from 'antd';
import { useState } from 'react';
import { FilterAnimals } from '../filter-animals/FilterAnimals';
import { FormAddInspection } from '../forms/form-add-inspection/FormAddInspection';
import { FormAddTreatment } from '../forms/form-add-treatment/FormAddTreatment';
import { FormAddTransfer } from '../forms/form-add-transfer/FormAddTransfer';
import { FormAddDisposal } from '../forms/form-add-disposal/FormAddDisposal';
import { FormAddResearch } from '../forms/form-add-research/FormAddResearch';

import { useAppSelector } from '../../../../app-service/hooks';
import { selectSelectedAnimals } from '../../service/animalsDailyActionsSlice';
import { FormAddAssigmentNumber } from '../forms/form-add-assignment-number/FormAddAssigmentNumber';
import { items } from '../../data/const/tabs';

type Props = {
    keyTab: string;
};

export const TabsContent = ({ keyTab }: Props) => {
    const [isGroupAction, setIsGroupAction] = useState<boolean>(false);
    const title = items && items.find((item) => item.key === keyTab)?.label?.toString();
    const selectedAnimals = useAppSelector(selectSelectedAnimals);
    const [form] = Form.useForm();
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
                        <FormAddInspection isGroup={isGroupAction} type='1' form={form} />
                    )}
                    {keyTab === '2' && (
                        <FormAddInspection isGroup={isGroupAction} type='2' form={form} />
                    )}
                    {keyTab === '3' && (
                        <FormAddTreatment isGroup={isGroupAction} form={form} />
                    )}
                    {keyTab === '4' && (
                        <FormAddTransfer isGroup={isGroupAction} form={form} />
                    )}
                    {keyTab === '5' && (
                        <FormAddDisposal isGroup={isGroupAction} form={form} />
                    )}
                    {keyTab === '6' && (
                        <FormAddResearch isGroup={isGroupAction} form={form} />
                    )}
                    {keyTab === '7' && (
                        <FormAddAssigmentNumber isGroup={isGroupAction} form={form} />
                    )}
                </>
            )}
        </Flex>
    );
};
