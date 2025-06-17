import React, { useState } from 'react';
import { LeftOutlined, RightOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Flex, Layout } from 'antd';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { AppMenu } from './components/menu/Menu';
import { useLogoutMutation } from '../../app-service/services/auth';
import { IUser } from '../../utils/userType';
import { useIsMobile } from '../../hooks/useIsMobile';
import { useWindowSize } from '../../hooks/useWindowSize';
import styles from './Layout.module.css';
import { getSiderStyle } from './helpers/siderStyle';
import { LogoSection } from './components/logo-section/LogoSection';
import { truncate } from '../../functions/truncate';

const { Header, Sider, Content } = Layout;

export const LayoutPage: React.FC = () => {
    const user: IUser = JSON.parse(localStorage.getItem('user') || '{}');
    const [collapsed, setCollapsed] = useState(true);
    const isMobile = useIsMobile();
    const [logout] = useLogoutMutation();
    const navigate = useNavigate();
    const windowWidth = useWindowSize();
    const handlerLogout = async () => {
        try {
            await logout().unwrap();
            localStorage.removeItem('user');
            navigate('/');
        } catch {}
    };

    if (!user?.id) return <Navigate to='/' />;

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header className={styles['layout__header']}>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <div className={styles['header__content-logo']}>
                        <LogoSection
                            isMobile={isMobile}
                            windowWidth={windowWidth}
                            collapsed={collapsed}
                            setCollapsed={setCollapsed}
                        />
                    </div>
                    <Flex gap={'4px'}>
                        <Button type={'text'} title={user.organizationName}>
                            <UserOutlined />
                            {windowWidth >= 768
                                ? user.organizationName
                                : windowWidth > 650
                                ? truncate(user.organizationName, 60)
                                : windowWidth > 550
                                ? truncate(user.organizationName, 44)
                                : windowWidth > 500
                                ? truncate(user.organizationName, 37)
                                : windowWidth > 450
                                ? truncate(user.organizationName, 30)
                                : windowWidth > 400
                                ? truncate(user.organizationName, 22)
                                : windowWidth > 348
                                ? truncate(user.organizationName, 15)
                                : truncate(user.organizationName, 17)}
                        </Button>
                        {!isMobile && (
                            <Button onClick={handlerLogout} variant='link'>
                                Выход
                            </Button>
                        )}
                    </Flex>
                </div>
            </Header>
            <Layout>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    width='220'
                    style={getSiderStyle(isMobile, collapsed)}
                >
                    <div className='demo-logo-vertical' />
                    <AppMenu logout={handlerLogout} />
                    {!isMobile && (
                        <div
                            onClick={() => setCollapsed(!collapsed)}
                            className={styles['trapezoid-button']}
                        >
                            <div className={styles['trapezoid-button__icon']}>
                                {collapsed ? <RightOutlined /> : <LeftOutlined />}
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
                    <Content className={styles['layout__content']}>
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};
