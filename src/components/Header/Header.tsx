import { Flex } from 'antd';
import styles from './Header.module.css';

export const Header = () => {
    return (
        <Flex className={styles.header}>
            <Flex className={styles.header__logo}>Logo</Flex>
        </Flex>
    );
};
