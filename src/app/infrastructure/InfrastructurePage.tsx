import { Tabs, TabsProps } from 'antd';
import { useState } from 'react';
import styles from './InfrastructurePage.module.css';

export const InfrastructurePage = () => {
    const [activeTab, setActiveTab] = useState('1');
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Группы',
        },
        {
            key: '2',
            label: 'Типы групп',
        },
        {
            key: '3',
            label: 'Поля идентификации',
        },
        {
            key: '4',
            label: 'Настройки',
        },
    ];
    const onChange = (key: string) => {
        setActiveTab(key);
    };
    return (
        <div>
            <div className={styles['register-animals__header']}>
                <h1>Регистрация нового животного</h1>
                <Tabs
                    style={{
                        fontWeight: 400,
                        lineHeight: '24px',
                    }}
                    defaultActiveKey='1'
                    items={items}
                    onChange={onChange}
                />
            </div>
            <div className={styles['register-animals__content']}></div>
        </div>
    );
};
