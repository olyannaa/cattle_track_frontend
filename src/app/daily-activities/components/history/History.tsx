import { Flex, Table, Typography } from 'antd';
import { columnsTableHistoryInspection } from '../../data/const/columnsTableHistoryInspection';

type Props = {
    keyTab: string;
};

export const History = () => {
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
            <Table columns={columnsTableHistoryInspection} />
        </Flex>
    );
};
