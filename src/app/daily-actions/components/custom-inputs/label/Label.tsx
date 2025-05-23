import { Flex } from 'antd';

export const Label = ({
    label,
    required = false,
}: {
    label: string;
    required?: boolean;
}) => {
    return (
        <Flex
            style={{
                fontFamily: 'Roboto',
                fontSize: '16px',
                fontWeight: '500',
                lineHeight: '24px',
                marginBottom: '8px',
            }}
            gap={5}
            align='center'
        >
            {required ? <div style={{ color: 'rgb(255, 66, 24)' }}>*</div> : ''}
            {label}
        </Flex>
    );
};
