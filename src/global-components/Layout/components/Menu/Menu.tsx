import { ItemType, MenuItemType } from 'antd/es/menu/interface';
import {
    BellFilled,
    CarryOutFilled,
    ClockCircleFilled,
    DatabaseFilled,
    FolderOpenFilled,
    HomeFilled,
    IdcardFilled,
    LogoutOutlined,
    SafetyCertificateFilled,
    SettingOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { useIsMobile } from '../../../../hooks/useIsMobile';

export const AppMenu = ({ logout }: { logout: () => Promise<void> }) => {
    const isMobile = useIsMobile();
    const mobileItems = isMobile
        ? [
              { type: 'divider' as const },
              {
                  key: 'logout',
                  icon: <LogoutOutlined />,
                  label: 'Выход',
                  onClick: logout,
                  danger: true,
              },
          ]
        : [];
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
            label: <Link to='/weight-control'>Контроль провесов</Link>,
            danger: true,
        },
        {
            key: '9',
            icon: <SettingOutlined />,
            label: 'Отчеты',
            danger: true,
        },
        ...mobileItems,
    ];

    return <Menu theme='light' mode='inline' defaultSelectedKeys={['1']} items={menuItems} />;
};
