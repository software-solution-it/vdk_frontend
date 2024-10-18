import React from 'react';
import { Layout } from 'antd';
import SmallLogo from '../assets/small_logo.png'; // Usando o caminho da logo enviado

const { Header } = Layout;

const HeaderComponent = () => {
  return (
    <Header 
      style={{ 
        background: '#fff', 
        padding: '0 20px',  
        width: '100%', 
        display: 'flex', 
        justifyContent: 'center',  // Centraliza horizontalmente
        alignItems: 'center'  // Centraliza verticalmente
      }}
    >
      <img src={SmallLogo} alt="Logo" style={{ height: 40 }} />
    </Header>
  );
};

export default HeaderComponent;
