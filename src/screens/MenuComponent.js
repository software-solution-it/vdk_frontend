import React, { useState } from 'react';
import { Menu, Layout, Button, Tooltip } from 'antd';
import { MailOutlined, CalendarOutlined, InboxOutlined, LogoutOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './Menu.css'

const { Sider } = Layout;

const MenuComponent = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        console.log('Usuário desconectado');
        navigate('/login');
    };


    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Sider
            collapsible
            collapsed={collapsed}
            width={250}
            trigger={null} 
            style={{ zIndex: 1 }}
        >

Session

            <Menu style={{padding:20}} theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Tooltip title={collapsed ? 'Home' : ''} placement="right">
                    <Menu.Item key="1" icon={<MailOutlined />} onClick={() => navigate('/dashboard')}>
                        Home
                    </Menu.Item>
                </Tooltip>

                <Tooltip title={collapsed ? 'Log' : ''} placement="right">
                    <Menu.Item key="6" icon={<CalendarOutlined />} onClick={() => navigate('/log')}>
                        Log
                    </Menu.Item>
                </Tooltip>

                <Tooltip title={collapsed ? 'Caixas de Email' : ''} placement="right">
                    <Menu.SubMenu key="sub1" icon={<InboxOutlined />} title="pessoa@email.com.br">
                        <Menu.Item key="3" icon={<CalendarOutlined />} onClick={() => navigate('/mailbox')}>
                            Caixas de Email
                        </Menu.Item>
                    </Menu.SubMenu>
                </Tooltip>

                <Tooltip title={collapsed ? 'Acessos' : ''} placement="right">
                    <Menu.Item key="4" icon={<CalendarOutlined />} onClick={() => navigate('/access')}>
                        Acessos
                    </Menu.Item>
                </Tooltip>

                <Tooltip title={collapsed ? 'Webhook' : ''} placement="right">
                    <Menu.Item key="5" icon={<CalendarOutlined />} onClick={() => navigate('/webhook')}>
                        Webhook
                    </Menu.Item>
                </Tooltip>

                <Tooltip title={collapsed ? 'Sair' : ''} placement="right">
                    <Menu.Item
                        key="logout"
                        icon={<LogoutOutlined />}
                        onClick={handleLogout}
                        style={{ color: 'red', marginTop: 'auto' }}
                    >
                        Sair
                    </Menu.Item>
                </Tooltip>
            </Menu>
        </Sider>
    );
};

export default MenuComponent;
