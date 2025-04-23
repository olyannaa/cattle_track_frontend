import { Flex, Typography } from 'antd';
import { FilterAnimals } from '../../filter-animals/FilterAnimals';
import { FormAddInspection } from '../../forms/form-add-inspection/FormAddInspection';
import { useState } from 'react';

export const Treatment = () => {
    const [selectedAnimals, setSelectedAnimal] = useState<string>('');
    const [isGroupAction, setIsGroupAction] = useState<boolean>(false);
    return (
        <Flex vertical style={{ width: '100%' }} gap={24}>
            <Typography.Title level={3}>Лечение</Typography.Title>
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
