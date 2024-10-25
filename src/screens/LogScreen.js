import React, { useEffect, useState } from 'react';
import { Layout, Alert } from 'antd';
import { useNavigate } from 'react-router-dom'; 
import errorLogService from '../services/ErrorLogService';

const { Content } = Layout;

const LogScreen = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await errorLogService.getLogsByUserId();
        setLogs(response);
      } catch (err) {
        setError('Failed to fetch logs.');
        navigate('/login'); 
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [navigate]); 

  if (loading) {
    return <div>Loading logs...</div>;
  }

  if (error) {
    return <Alert message={error} type="error" showIcon />;
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Menu Lateral */}
      <Layout>
        <Content style={{ padding: '16px' }}>

          {/* Mensagens de Alerta */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            {logs.map(log => (
              <Alert
                key={log.id}
                message={log.error_message}
                description={`File: ${log.file}, Line: ${log.line}`}
                type="warning"
                showIcon
                closable
              />
            ))}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LogScreen;
