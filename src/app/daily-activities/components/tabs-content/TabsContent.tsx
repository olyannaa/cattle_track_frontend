import { Flex, Typography } from 'antd';
import { useState } from 'react';
import { FilterAnimals } from '../filter-animals/FilterAnimals';
import { FormAddInspection } from '../forms/form-add-inspection/FormAddInspection';
import { FormAddTreatment } from '../forms/form-add-treatment/FormAddTreatment';
import { FormAddTransfer } from '../forms/form-add-transfer/FormAddTransfer';
import { FormAddCulling } from '../forms/form-add-culling/FormAddCulling';
import { FormAddResearch } from '../forms/form-add-research/FormAddResearch';
import { items } from '../../data';

type Props = {
    keyTab: string;
};

export const TabsContent = ({ keyTab }: Props) => {
    const [selectedAnimals, setSelectedAnimal] = useState<string>('');
    const [isGroupAction, setIsGroupAction] = useState<boolean>(false);
    const title = items && items.find((item) => item.key === keyTab)?.label?.toString();
    return (
        <Flex vertical style={{ width: '100%' }} gap={24}>
            <Typography.Title level={3}>{title}</Typography.Title>
            <FilterAnimals
                selectedAnimals={selectedAnimals}
                setSelectedAnimals={setSelectedAnimal}
                isGroup={isGroupAction}
                setIsGroup={setIsGroupAction}
            />
            {keyTab === '1' && <FormAddInspection isGroup={isGroupAction} />}
            {keyTab === '2' && <FormAddInspection isGroup={isGroupAction} />}
            {keyTab === '3' && <FormAddTreatment isGroup={isGroupAction} />}
            {keyTab === '4' && <FormAddTransfer isGroup={isGroupAction} />}
            {keyTab === '5' && <FormAddCulling isGroup={isGroupAction} />}
            {keyTab === '6' && <FormAddResearch isGroup={isGroupAction} />}
        </Flex>
    );
};
