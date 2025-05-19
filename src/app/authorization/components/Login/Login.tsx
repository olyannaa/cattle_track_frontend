import { Flex, Tabs, TabsProps, Typography } from 'antd';
import styles from './Login.module.css';
import { useState } from 'react';
import { LoginForm } from '../LoginForm/LoginForm';

const tabsLogin: TabsProps['items'] = [
    {
        label: 'Авторизация',
        key: '1',
    },
    {
        label: 'Вход для администратора',
        key: '2',
    },
];

export const Login = () => {
    const [currentTab, setCurrentTab] = useState<string>('1');

    return (
        <Flex className={styles.login} vertical>
            <Typography.Title level={2} className={styles['login__title']}>
                Система учета КРС
            </Typography.Title>
            <Tabs
                defaultActiveKey='1'
                items={tabsLogin}
                onChange={setCurrentTab}
                size='large'
                style={{ marginBottom: '24px' }}
            />
            {currentTab === '1' ? <LoginForm /> : ''}
        </Flex>
    );
};
