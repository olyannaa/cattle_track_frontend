import { Flex, Typography } from 'antd';
import { CheckboxCustom } from '../../../../global-components/custom-inputs/checkbox/Checkbox';

export const Inspections = () => {
    return (
        <Flex vertical style={{ width: '100%' }}>
            <Flex>
                <Typography.Title level={3}>Осмотры</Typography.Title>
            </Flex>
            <CheckboxCustom title='Групповое действие' onChange={() => ({})} />
            <CheckboxCustom title='Только активные животные' onChange={() => ({})} />
        </Flex>
    );
};
