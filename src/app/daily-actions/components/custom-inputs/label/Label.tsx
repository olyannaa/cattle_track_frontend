import { Flex } from 'antd';

export const Label = ({ label }: { label: string }) => {
    return (
        <Flex
            style={{
                fontFamily: 'Roboto',
                fontSize: '16px',
                fontWeight: '500',
                lineHeight: '24px',
                marginBottom: '8px',
            }}
        >
            {label}
        </Flex>
    );
};
