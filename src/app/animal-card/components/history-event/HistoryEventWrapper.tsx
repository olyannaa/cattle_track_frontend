import { Flex } from 'antd';
import { Events } from './components/events/Events';
import { useState } from 'react';
import { EventChart } from './components/event-chart/EventChart';
import styles from './HistoryEventWrapper.module.css';

export const HistoryEventWrapper = () => {
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <Flex vertical className={styles['history-event__section']}>
            <h2 className='form-title'>История событий</h2>
            <EventChart loading={setLoading} />
            <Events loading={setLoading} />
        </Flex>
    );
};
