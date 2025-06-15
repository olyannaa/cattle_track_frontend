import { Flex } from 'antd';
import { HeaderContent } from '../../global-components/header-content/HeaderContent';
import { TabsContent } from './components/tabs-content/TabsContent';
import { History } from './components/history/History';
import { items } from './data/const/tabs';
import { useAppDispatch, useAppSelector } from '../../app-service/hooks';
import {
    changeKeyTab,
    resetFiltersAnimals,
    selectKeyTab,
} from './service/animalsDailyActionsSlice';

export const DailyActions = () => {
    const activeTab = useAppSelector(selectKeyTab);
    const dispatch = useAppDispatch();
    const changeTab = (value: string) => {
        dispatch(changeKeyTab(value));
        dispatch(resetFiltersAnimals());
    };
    return (
        <Flex vertical gap={16} style={{ maxWidth: '1200px' }}>
            <HeaderContent
                title='Учет ежедневных действий'
                items={items}
                onChange={changeTab}
                activeKey={activeTab}
            />
            <Flex
                style={{
                    padding: '24px 20px 15px',
                    background: 'var(--global-bg)',
                    borderRadius: '8px',
                }}
            >
                {activeTab === '1' && <TabsContent />}
                {activeTab === '2' && <TabsContent />}
                {activeTab === '3' && <TabsContent />}
                {activeTab === '4' && <TabsContent />}
                {activeTab === '5' && <TabsContent />}
                {activeTab === '6' && <TabsContent />}
                {activeTab === '7' && <TabsContent />}
                {activeTab === '8' && <TabsContent />}
            </Flex>
            <History />
        </Flex>
    );
};
