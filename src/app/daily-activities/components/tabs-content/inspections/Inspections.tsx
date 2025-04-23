import { Flex, Typography } from 'antd';
import { useState } from 'react';
import { FormAddInspection } from '../../forms/form-add-inspection/FormAddInspection';
import { FilterAnimals } from '../../filter-animals/FilterAnimals';

export const Inspections = () => {
    const [selectedAnimals, setSelectedAnimal] = useState<string>('');
    const [isGroupAction, setIsGroupAction] = useState<boolean>(false);
    return (
        <Flex vertical style={{ width: '100%' }} gap={24}>
            <Typography.Title level={3}>Осмотры</Typography.Title>
            <FilterAnimals
                selectedAnimals={selectedAnimals}
                setSelectedAnimals={setSelectedAnimal}
                isGroup={isGroupAction}
                setIsGroup={setIsGroupAction}
            />
            <FormAddInspection isGroup={isGroupAction} />
        </Flex>
    );
};
