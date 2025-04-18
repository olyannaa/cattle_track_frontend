import React, { useEffect, useState } from 'react';
import {
    AppstoreFilled,
    LeftOutlined,
    RightOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Button, Flex, Layout } from 'antd';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { AppMenu } from './components/menu/Menu';
import styles from './Layout.module.css';
import { useLogoutMutation } from '../../app-service/services/auth';
import { IUser } from '../../utils/userType';

const { Header, Sider, Content } = Layout;

export const LayoutPage: React.FC = () => {
    const user: IUser = JSON.parse(localStorage.getItem('user') || '');
    const [collapsed, setCollapsed] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Проверка на мобильный экран
    const [logout] = useLogoutMutation();
    const navigate = useNavigate();

    const siderStyle: React.CSSProperties = {
        position: 'sticky',
        insetInlineStart: 0,
        top: 0,
        bottom: 0,
        scrollbarWidth: 'thin',
        scrollbarGutter: 'stable',
        boxShadow: '0px 2px 8px 0px rgba(0, 0, 0, 0.2)',
        background: '#ffffff',
        maxHeight: 696,
        display: isMobile && collapsed ? 'none' : 'block',
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    if (!user) {
        return <Navigate to='/' />;
    }

    const handlerLogout = async () => {
        try {
            await logout().unwrap();
            localStorage.removeItem('user');
            navigate('/');
        } catch {}
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header className={styles['layout__header']}>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <div className={styles['header__content-logo']}>
                        {isMobile && (
                            <Button
                                type='primary'
                                danger
                                icon={<AppstoreFilled />}
                                onClick={() => setCollapsed(!collapsed)}
                                style={{
                                    marginRight: 4,
                                }}
                            />
                        )}
                        <div>LOGO</div>
                    </div>
                    <Flex gap={'4px'}>
                        <Button type={'text'}>
                            <UserOutlined />
                            {user.organizationName}
                        </Button>
                        <Button onClick={handlerLogout} variant='link'>
                            Выход
                        </Button>
                    </Flex>
                </div>
            </Header>
            <Layout>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    width='220'
                    style={siderStyle}
                >
                    <div className='demo-logo-vertical' />
                    <AppMenu />
                    {!isMobile && (
                        <div
                            onClick={() => setCollapsed(!collapsed)}
                            className={styles['trapezoid-button']}
                        >
                            <div className={styles['trapezoid-button__icon']}>
                                {collapsed ? (
                                    <RightOutlined />
                                ) : (
                                    <LeftOutlined />
                                )}
                            </div>
                        </div>
                    )}
                </Sider>
                <Layout
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1,
                    }}
                >
                    <Content
                        style={{
                            margin: '24px',
                            overflow: 'initial',
                        }}
                    >
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};
