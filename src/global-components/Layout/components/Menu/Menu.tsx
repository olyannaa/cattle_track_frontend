import { ItemType, MenuItemType } from 'antd/es/menu/interface';
import {
    BellFilled,
    CarryOutFilled,
    ClockCircleFilled,
    DatabaseFilled,
    FolderOpenFilled,
    HomeFilled,
    IdcardFilled,
    PicRightOutlined,
    SafetyCertificateFilled,
    SettingOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { useMemo } from 'react';

export const AppMenu = () => {
    const location = useLocation();

    // Сопоставление путей с ключами меню
    const pathToKeyMap: Record<string, string> = {
        '/main': '1',
        '/accounting': '2',
        '/animalregister': '3',
        '/infrastructure': '4',
        '/daily-activities': '5',
        '/reproductive-accounting': '7',
        '/weight-control': '8',
        '/animal-card': '9',
    };

    const selectedKey = useMemo(() => {
        const match = Object.entries(pathToKeyMap).find(([path]) => location.pathname.startsWith(path));
        return match ? [match[1]] : ['1'];
    }, [location.pathname]);

    const menuItems: ItemType<MenuItemType>[] = [
        {
            key: '1',
            icon: <HomeFilled />,
            label: <Link to='/main'>Главная</Link>,
            danger: true,
        },
        {
            key: '2',
            icon: <FolderOpenFilled />,
            label: <Link to='/accounting'>Учет животных</Link>,
            danger: true,
        },
        {
            key: '3',
            icon: <IdcardFilled />,
            label: <Link to='/animalregister'>Регистрация животных</Link>,
            danger: true,
        },
        {
            key: '4',
            icon: <CarryOutFilled />,
            label: <Link to='/infrastructure'>Инфраструктура</Link>,
            danger: true,
        },
        {
            key: '5',
            icon: <DatabaseFilled />,
            label: <Link to='/daily-activities'>Ежедневные действия</Link>,
            danger: true,
        },

        {
            key: '6',
            icon: <SafetyCertificateFilled />,
            label: 'Учет кормления',
            danger: true,
        },
        {
            key: '7',
            icon: <ClockCircleFilled />,
            label: <Link to='reproductive-accounting'>Репродуктивный учет</Link>,
            danger: true,
        },
        {
            key: '8',
            icon: <BellFilled />,
            label: <Link to='/weight-control'>Контроль привесов</Link>,
            danger: true,
        },
        {
            key: '9',
            icon: <PicRightOutlined />,
            label: <Link to='/animal-card'>Карточка животного</Link>,
            danger: true,
        },
        {
            key: '10',
            icon: <SettingOutlined />,
            label: 'Отчеты',
            danger: true,
        },
    ];

    return <Menu theme='light' mode='inline' selectedKeys={selectedKey} items={menuItems} />;
};
