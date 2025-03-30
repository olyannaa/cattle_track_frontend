import { ItemType, MenuItemType } from 'antd/es/menu/interface';
import {
    BellFilled,
    ClockCircleFilled,
    DatabaseFilled,
    FolderOpenFilled,
    HomeFilled,
    IdcardFilled,
    SafetyCertificateFilled,
    SettingOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

export const AppMenu = () => {
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
            label: <Link to='/animalregister'>Учет животных</Link>,
            danger: true,
        },
        {
            key: '3',
            icon: <IdcardFilled />,
            label: 'Регистрация животных',
            danger: true,
        },
        {
            key: '4',
            icon: <DatabaseFilled />,
            label: 'Ежедневные действия',
            danger: true,
        },
        {
            key: '5',
            icon: <SafetyCertificateFilled />,
            label: 'Учет кормления',
            danger: true,
        },
        {
            key: '6',
            icon: <ClockCircleFilled />,
            label: 'Репродуктивный учет',
            danger: true,
        },
        {
            key: '7',
            icon: <BellFilled />,
            label: 'Контроль провесов',
            danger: true,
        },
        {
            key: '8',
            icon: <SettingOutlined />,
            label: 'Отчеты',
            danger: true,
        },
    ];

    return (
        <Menu
            theme='light'
            mode='inline'
            defaultSelectedKeys={['1']}
            items={menuItems}
        />
    );
};
