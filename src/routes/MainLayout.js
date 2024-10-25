import React from 'react';
import { Outlet } from 'react-router-dom';
import MenuComponent from '../screens/MenuComponent';
import HeaderComponent from '../screens/HeaderComponent';
import { Layout } from 'antd';

const { Content } = Layout;

const MainLayout = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Menu Lateral */}
      <MenuComponent collapsed={false} onCollapse={() => {}} />

      <Layout>
        {/* Header */}
        <HeaderComponent />

        <Content style={{ padding: '16px' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
