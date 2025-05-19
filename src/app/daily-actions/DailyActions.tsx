import { Flex } from 'antd';
import { HeaderContent } from '../../global-components/header-content/HeaderContent';
import { items } from './data';
import { useState } from 'react';
import { TabsContent } from './components/tabs-content/TabsContent';
import { History } from './components/history/History';

export const DailyActions = () => {
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
                {activeTab === '1' && <TabsContent keyTab={activeTab} />}
                {activeTab === '2' && <TabsContent keyTab={activeTab} />}
                {activeTab === '3' && <TabsContent keyTab={activeTab} />}
                {activeTab === '4' && <TabsContent keyTab={activeTab} />}
                {activeTab === '5' && <TabsContent keyTab={activeTab} />}
                {activeTab === '6' && <TabsContent keyTab={activeTab} />}
                {activeTab === '7' && <TabsContent keyTab={activeTab} />}
            </Flex>
            <History keyTab={activeTab} />
        </Flex>
    );
};
