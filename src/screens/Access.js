import React, { useState, useEffect } from 'react'; 
import { Layout, Table, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import userService from '../services/UserService';

const { Content } = Layout;

const Acessos = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      const data = await userService.getUserById();
      const usersData = Array.isArray(data) ? data : [data];
      setUsers(usersData);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      navigate('/login'); 
    }
  };

  const columns = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'E-mail',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Permissão',
      dataIndex: 'role_name',
      key: 'role_name',
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout>
        <Content style={{ padding: '16px' }}>
          <h2>Acessos</h2>
          <Table dataSource={users} columns={columns} pagination={false} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Acessos;
