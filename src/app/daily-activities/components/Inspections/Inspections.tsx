import { Button, Flex, Typography } from 'antd';
import { CheckboxCustom } from '../../../../global-components/custom-inputs/checkbox/Checkbox';
import { useState } from 'react';
import { FormInspection } from '../forms/FormInspection/FormInspection';

export const Inspections = () => {
    const [isGroupAction, setIsGroupAction] = useState<boolean>(false);
    const [isActiveAnimals, setIsActiveAnimals] = useState<boolean>(false);
    return (
        <Flex vertical style={{ width: '100%' }} gap={24}>
            <Flex justify='space-between'>
                <Typography.Title level={3}>Осмотры</Typography.Title>
                <Button
                    type={'text'}
                    size='large'
                    onClick={() => {}}
                    style={{ width: '175px' }}
                >{`История осмотров (${0})`}</Button>
            </Flex>
            <Flex vertical gap={4}>
                <CheckboxCustom
                    title='Групповое действие'
                    onChange={(e) => setIsGroupAction(e.target.checked)}
                    value={isGroupAction}
                />
                {!isGroupAction && (
                    <CheckboxCustom
                        title='Только активные животные'
                        onChange={(e) => setIsActiveAnimals(e.target.checked)}
                        value={isActiveAnimals}
                    />
                )}
            </Flex>
            <FormInspection />
        </Flex>
    );
};
