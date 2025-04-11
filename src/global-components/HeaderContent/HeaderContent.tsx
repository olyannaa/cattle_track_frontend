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
            <Flex className={styles['title']} justify='space-between'>
                <Typography.Title className={styles['title__text']}>
                    {title}
                </Typography.Title>
                {buttonClick && (
                    <Button
                        onClick={buttonClick}
                        type={'text'}
                        className={styles['title__button']}
                        size='large'
                    >
                        {buttonText}
                    </Button>
                )}
            </Flex>
            <Tabs
                items={items}
                onChange={onChange}
                style={{ marginBottom: '-16px' }}
                className={styles['tabs']}
            />
        </Flex>
    );
};
