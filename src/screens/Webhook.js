import React, { useEffect, useState } from 'react';
import { Layout, Card, Button, Input, Form, Modal } from 'antd';
import { EditOutlined, DeleteOutlined, PlusCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { TokenService } from '../services/TokenService';
import webhookService from '../services/WebhookService';

const { Content } = Layout;
const { confirm } = Modal;

const Webhook = () => {
  const [webhooks, setWebhooks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingWebhook, setEditingWebhook] = useState(null);
  const [form] = Form.useForm();

  // Função para buscar os webhooks ao montar o componente
  const fetchWebhooks = async () => {
    const userId = TokenService.getUserId(); // Obtenha o ID do usuário
    try {
      const webhooksData = await webhookService.getList(userId); // Chama o serviço para buscar webhooks
      setWebhooks(webhooksData); // Atualiza o estado com os dados recebidos
    } catch (error) {
      console.error("Failed to fetch webhooks:", error);
    }
  };

  useEffect(() => {
    fetchWebhooks(); // Chama a função ao montar o componente
  }, []);

  const handleEdit = (webhook) => {
    setIsEditing(true);
    setEditingWebhook(webhook);
    form.setFieldsValue({
      name: webhook.name,
      callbackUrl: webhook.url, // Use o campo 'url' do objeto webhook
    });
  };

  const handleDelete = (id) => {
    setWebhooks(webhooks.filter((webhook) => webhook.id !== id));
  };

  const showDeleteConfirm = (id) => {
    confirm({
      title: 'Tem certeza que deseja excluir este webhook?',
      icon: <ExclamationCircleOutlined />,
      content: 'Essa ação não pode ser desfeita.',
      okText: 'Excluir',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk() {
        handleDelete(id);
      },
      onCancel() {
        console.log('Cancelado');
      },
    });
  };

  const handleAdd = () => {
    setIsEditing(true);
    setEditingWebhook(null);
    form.resetFields();
  };

  const handleSave = (values) => {
    if (editingWebhook) {
      setWebhooks(
        webhooks.map((webhook) =>
          webhook.id === editingWebhook.id ? { ...webhook, ...values } : webhook
        )
      );
    } else {
      setWebhooks([
        ...webhooks,
        {
          id: webhooks.length + 1,
          name: values.name,
          url: values.callbackUrl, // Use o campo 'callbackUrl' como 'url'
        },
      ]);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingWebhook(null);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ padding: '16px' }}>
        <h2>Webhook</h2>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {webhooks.map((webhook) => (
          <Card
          key={webhook.id}
          title={webhook.name || "Webhook Sem Nome"}
          extra={
            <div style={{ display: 'flex', gap: '10px' }}>
              <Button type="link" icon={<DeleteOutlined />} onClick={() => showDeleteConfirm(webhook.id)} />
              <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(webhook)} />
            </div>
          }
          style={{
            width: 300,
            border: '1px solid #e0e0e0',
            borderRadius: '10px',
            position: 'relative',
            overflow: 'hidden', // Evita que o conteúdo ultrapasse o card
          }}
        >
          <p><strong>Callback URL</strong></p>
          <p style={{
            overflow: 'hidden', // Evita que o texto ultrapasse
            whiteSpace: 'nowrap', // Impede quebras de linha
            textOverflow: 'ellipsis', // Adiciona '...' se o texto for muito longo
          }}>{webhook.url}</p>
        </Card>
          ))}

          {isEditing && (
            <Card
              style={{
                width: 300,
                border: '1px solid #e0e0e0',
                borderRadius: '10px',
                position: 'relative',
              }}
            >
              <Form form={form} onFinish={handleSave}>
                <Form.Item name="name" rules={[{ required: true, message: 'Digite um nome!' }]}>
                  <Input placeholder="Nome" />
                </Form.Item>

                <Form.Item name="callbackUrl" rules={[{ required: true, message: 'Digite a URL de callback!' }]}>
                  <Input placeholder="Callback URL" />
                </Form.Item>

                <Form.Item style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button className='me-1' onClick={handleCancel}>Cancelar</Button>
                  <Button className='ms-1' type="primary" htmlType="submit">Salvar</Button>
                </Form.Item>
              </Form>
            </Card>
          )}

          <Button
            type="primary"
            shape="circle"
            icon={<PlusCircleOutlined />}
            size="large"
            style={{
              backgroundColor: '#1890ff',
              border: 'none',
              marginTop: '10px',
            }}
            onClick={handleAdd}
          />
        </div>
      </Content>
    </Layout>
  );
};

export default Webhook;
