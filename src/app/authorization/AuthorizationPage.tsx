import { Flex } from 'antd';
import styles from './AuthorizationPage.module.css';
import { Login } from './components/Login/Login';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const Authorization = () => {
    const navigate = useNavigate();
    const user = localStorage.getItem('user');
    useEffect(() => {
        if (user) {
            navigate('/main');
        }
    }, []);

    return (
        <Flex className={styles.wrapper} align='center' justify='center'>
            <Flex className={styles.header}>
                <Flex className={styles.header__logo}>Logo</Flex>
            </Flex>
            <Flex className={styles.body} align='center' justify='center'>
                <Login />
            </Flex>
        </Flex>
    );
};
