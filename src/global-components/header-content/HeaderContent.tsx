import { Button, Flex, Tabs, TabsProps, Typography } from 'antd';
import styles from './HeaderContent.module.css';

type Props = {
    title: string;
    items: TabsProps['items'];
    buttonText?: string;
    buttonClick?: () => void;
    onChange?: (activeKey: string) => void;
};

export const HeaderContent = ({
    title,
    items,
    buttonText,
    onChange,
    buttonClick,
}: Props) => {
    return (
        <Flex vertical className={styles['content-header']}>
            <Flex justify='space-between'>
                <Typography.Title level={1}>{title}</Typography.Title>
                {buttonClick && (
                    <Button onClick={buttonClick} type={'text'}>
                        {buttonText}
                    </Button>
                )}
            </Flex>
            <Tabs items={items} onChange={onChange} />
        </Flex>
    );
};
