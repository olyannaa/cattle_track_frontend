import React, { useEffect, useState } from 'react';
import { AppstoreFilled, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { AppMenu } from './components/Menu/Menu';
import styles from './Layout.module.css';

const { Header, Sider, Content } = Layout;

export const LayoutPage: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Проверка на мобильный экран

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

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
                    <Button>Выход</Button>
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
