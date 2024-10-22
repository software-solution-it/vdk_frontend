import React, { useEffect, useState } from 'react';
import { Layout, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import { TokenService } from '../services/TokenService';
import webhookService from '../services/WebhookService';

const { Content } = Layout;

const Webhook = () => {
  const [webhooks, setWebhooks] = useState([]);
  const navigate = useNavigate();

  const fetchWebhooks = async () => {
    const userId = TokenService.getUserId();
    try {
      const webhooksData = await webhookService.getList(userId);
      setWebhooks(webhooksData);
    } catch (error) {
      console.error("Failed to fetch webhooks:", error);
      navigate('/login');
    }
  };

  useEffect(() => {
    fetchWebhooks();
  }, [navigate]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ padding: '16px' }}>
        <h2>Webhook</h2>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {webhooks.map((webhook) => (
            <Card
              key={webhook.id}
              title={webhook.name || "Webhook Sem Nome"}
              style={{
                width: 300,
                border: '1px solid #e0e0e0',
                borderRadius: '10px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <p><strong>Callback URL</strong></p>
              <p style={{
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
              }}>{webhook.url}</p>
            </Card>
          ))}
        </div>
      </Content>
    </Layout>
  );
};

export default Webhook;
