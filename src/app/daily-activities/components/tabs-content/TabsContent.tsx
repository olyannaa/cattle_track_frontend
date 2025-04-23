import { Flex, Typography } from 'antd';
import { useState } from 'react';
import { FilterAnimals } from '../filter-animals/FilterAnimals';
import { FormAddInspection } from '../forms/form-add-inspection/FormAddInspection';
import { FormAddTreatment } from '../forms/form-add-treatment/FormAddTreatment';

type Props = {
    title: string;
};

export const TabsContent = ({ title }: Props) => {
    const [selectedAnimals, setSelectedAnimal] = useState<string>('');
    const [isGroupAction, setIsGroupAction] = useState<boolean>(false);
    return (
        <Flex vertical style={{ width: '100%' }} gap={24}>
            <Typography.Title level={3}>{title}</Typography.Title>
            <FilterAnimals
                selectedAnimals={selectedAnimals}
                setSelectedAnimals={setSelectedAnimal}
                isGroup={isGroupAction}
                setIsGroup={setIsGroupAction}
            />
            {title === 'Осмотры' && <FormAddInspection isGroup={isGroupAction} />}
            {title === 'Лечение' && <FormAddTreatment isGroup={isGroupAction} />}
            {title === 'Осмотры' && <FormAddInspection isGroup={isGroupAction} />}
            {title === 'Лечение' && <FormAddTreatment isGroup={isGroupAction} />}
            {title === 'Осмотры' && <FormAddInspection isGroup={isGroupAction} />}
            {title === 'Лечение' && <FormAddTreatment isGroup={isGroupAction} />}
            {title === 'Осмотры' && <FormAddInspection isGroup={isGroupAction} />}
        </Flex>
    );
};
