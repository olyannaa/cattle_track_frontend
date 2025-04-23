import { Flex } from 'antd';
import { HeaderContent } from '../../global-components/header-content/HeaderContent';
import { items } from './data';
import { useState } from 'react';
import { TabsContent } from './components/tabs-content/TabsContent';

export const DailyActivities = () => {
    const [activeTab, setActiveTab] = useState('1');
    return (
        <Flex vertical gap={16} style={{ maxWidth: '1038px' }}>
            <HeaderContent
                title='Учет ежедневных действий'
                items={items}
                onChange={setActiveTab}
            />
            <Flex
                style={{
                    padding: '24px 20px 15px',
                    background: 'var(--global-bg)',
                    borderRadius: '8px',
                }}
            >
                {activeTab === '1' && <TabsContent title='Осмотры' />}
                {activeTab === '2' && <TabsContent title='Вакцинации и обработки' />}
                {activeTab === '3' && <TabsContent title='Лечение' />}
                {activeTab === '4' && <TabsContent title='Перевод' />}
                {activeTab === '5' && <TabsContent title='Выбраковка' />}
                {activeTab === '6' && <TabsContent title='Исследования' />}
                {/* {activeTab === '7' && <TabsContent title='Присвоение номеров' />} */}
            </Flex>
        </Flex>
    );
};
