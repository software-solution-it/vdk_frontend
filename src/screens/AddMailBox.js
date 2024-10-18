import React from 'react';
import { Form, Input, Button, Select, Layout, Card } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;
const { Option } = Select;

const AddEmailBox = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log('Form Values: ', values);
    // Lógica para salvar os dados da caixa de e-mail
    navigate('/mailbox'); // Redireciona de volta para a lista de e-mails após o cadastro
  };

  const handleCancel = () => {
    navigate('/mailbox'); // Volta para a lista de e-mails sem salvar
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout>

        <Content className="d-flex flex-1 justify-content-center align-items-center flex-column" style={{ padding: '16px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '40px', color: '#1890ff' }}>
            Cadastro de caixa de e-mail
          </h2>
          
          <Card
            style={{
              width: '400px',
              padding: '20px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              borderRadius: '10px',
            }}
          >
            <Form
              form={form}
              name="add-email-box"
              onFinish={onFinish}
              style={{ maxWidth: '100%' }}
            >
              <Form.Item
                name="name"
                rules={[{ required: true, message: 'Digite o nome do usuário!' }]}
              >
                <Input placeholder="Nome" />
              </Form.Item>

              <Form.Item
                name="email"
                rules={[
                  { required: true, message: 'Digite o email do usuário!' },
                  { type: 'email', message: 'Email não é válido!' },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>

                    
              <Form.Item style={{ textAlign: 'center' }}>
                <Button
                  onClick={handleCancel}
                  style={{
                    marginRight: '10px',
                    backgroundColor: '#f0f0f0',
                    color: '#000',
                    border: 'none',
                  }}
                >
                  Voltar
                </Button>
                <Button type="primary" htmlType="submit">
                  Salvar
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AddEmailBox;
