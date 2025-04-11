import { Flex } from 'antd';
import { HeaderContent } from '../../global-components/header-content/HeaderContent';
import { items } from './data';
import { useState } from 'react';
import { Inspections } from './components/Inspections/Inspections';

export const DailyActivities = () => {
    const [activeTab, setActiveTab] = useState('1');
    return (
        <Flex vertical gap={16} style={{ maxWidth: '920px' }}>
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
                {activeTab === '1' && <Inspections />}
            </Flex>
        </Flex>
    );
};
