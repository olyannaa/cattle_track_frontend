import { Flex } from 'antd';
import { HeaderContent } from '../../global-components/header-content/HeaderContent';
import { useState } from 'react';
import { items } from './data/const/tabs';
import { Filters } from './components/filters/Filters';
import { FormAddWeight } from './components/form-add-weight/FormAddWeight';

export const WeightControlPage = () => {
    const [activeTab, setActiveTab] = useState('1');
    return (
        <Flex vertical gap={16} style={{ maxWidth: '920px' }}>
            <HeaderContent
                title='Контроль привесов'
                items={items}
                onChange={setActiveTab}
            />
            <Flex
                style={{
                    padding: '24px 20px 15px',
                    background: 'var(--global-bg)',
                    borderRadius: '8px',
                }}
                vertical
                gap={24}
            >
                <div style={{ fontWeight: '500', fontSize: '24px' }}>
                    {activeTab === 'Взвешивание' ? 'Регистрация взвешивания' : activeTab}
                </div>
                <Filters keyTab={activeTab} />
                {activeTab === 'Взвешивание' && <FormAddWeight />}
                {activeTab === 'Анализ привесов' && ''}
            </Flex>
        </Flex>
    );
};
