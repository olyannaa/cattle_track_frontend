import { Button, Flex, Tabs, TabsProps, Typography } from 'antd';
import styles from './HeaderContent.module.css';

type Props = {
    title: string;
    items: TabsProps['items'];
    buttons: {
        text: string;
        buttonClick: () => void;
    }[];
    onChange?: (activeKey: string) => void;
};

export const HeaderContent = ({ title, items, buttons, onChange }: Props) => {
    return (
        <Flex vertical className={styles['content-header']}>
            <Flex className={styles['title']} justify='space-between'>
                <Typography.Title className={styles['title__text']}>
                    {title}
                </Typography.Title>
                <Flex gap={12} className={styles['title__buttons']}>
                    {buttons.length &&
                        buttons.map((button, i) => (
                            <Button
                                onClick={button.buttonClick}
                                type={i === 0 ? 'text' : 'primary'}
                                className={
                                    styles[
                                        `title__button_${i === 0 ? 'first' : 'second'}`
                                    ]
                                }
                                size='large'
                            >
                                {button.text}
                            </Button>
                        ))}
                </Flex>
            </Flex>
            <Tabs items={items} onChange={onChange} className={styles['tabs']} />
        </Flex>
    );
};
