import React, { useState, useEffect } from 'react';
import { Layout, Card, Button, Badge, Modal, message, Collapse } from 'antd';
import { useNavigate } from 'react-router-dom';
import emailService from '../services/EmailService';

const { Content } = Layout;
const { Panel } = Collapse;

const EmailBoxes = () => {
  const navigate = useNavigate();
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [emailData, setEmailData] = useState([]);
  const [dkimStatus, setDkimStatus] = useState(null);
  const [dmarcStatus, setDmarcStatus] = useState(null);
  const [spfRecords, setSpfRecords] = useState([]);

  const fetchEmailList = async () => {
    try {
      const emails = await emailService.getEmailAccountByUserId();
      setEmailData(emails);
    } catch (error) {
      console.error('Erro ao buscar contas de e-mail:', error);
      navigate('/login');
    }
  };

  useEffect(() => {
    fetchEmailList();
  }, [navigate]);

  const handleDelete = () => {
    console.log('Excluindo email:', selectedEmail);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const authenticateDomain = async (email) => {
    try {
      const domain = email.split('@')[1];
      const response = await emailService.checkEmailRecords(domain);
      
      setDkimStatus(response.dkim || []);
      setDmarcStatus(response.dmarc || []);
      setSpfRecords(response.spf || []);

      message.success('Verificação de registros iniciada!');

    } catch (error) {
      console.error('Erro ao autenticar domínio:', error);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout>
        <Content style={{ padding: '16px' }}>
          <h2>Email Boxes</h2>

          <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {emailData.map((data, index) => (
                <Card
                  key={index}
                  title={data.email}
                  style={{
                    width: 350,
                    border: '1px solid #e0e0e0',
                    borderRadius: '10px',
                    position: 'relative',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <Button 
                      type="primary" 
                      style={{ width: '100%', marginBottom: '10px' }} 
                      onClick={() => authenticateDomain(data.email)}
                    >
                      Authenticate this domain
                    </Button>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <p><strong>DKIM Record</strong></p>
                      <div>
                        <Badge 
                          status={dkimStatus === "DKIM encontrado" ? 'success' : 'error'} 
                          text={typeof dkimStatus === 'string' ? dkimStatus : 'DKIM não encontrado'} 
                        />
                        <a href="/logs" style={{ display: 'block', fontSize: '12px', color: '#1890ff' }}>
                          {data.dkimLogs}
                        </a>
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <p><strong>DMARC Record</strong></p>
                      <Badge 
                        status={dmarcStatus === "DMARC encontrado" ? 'success' : 'error'} 
                        text={typeof dmarcStatus === 'string' ? dmarcStatus : 'DMARC não encontrado'} 
                      />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <p><strong>SPF Record</strong></p>
                      <Badge 
                        status={spfRecords.length > 0 ? 'success' : 'error'} 
                        text={spfRecords.length > 0 ? "SPF encontrado" : "SPF não encontrado"} 
                      />
                    </div>

                    {dkimStatus && (
                      <Collapse style={{ marginTop: '10px' }}>
                        <Panel header={`Resultados da verificação para ${data.email}`} key="1">
                          <div>
                            <p><strong>DKIM:</strong> {typeof dkimStatus === 'string' ? dkimStatus : 'DKIM não encontrado'}</p>
                            <p><strong>DMARC:</strong> {typeof dmarcStatus === 'string' ? dmarcStatus : 'DMARC não encontrado'}</p>
                            <p>
                              <strong>SPF:</strong> 
                              {spfRecords.length > 0 
                                ? spfRecords.map((record, index) => (
                                  <span key={index}>{typeof record.txt === 'string' ? record.txt : JSON.stringify(record.txt)} </span>
                                )) 
                                : " SPF não encontrado"}
                            </p>
                          </div>
                        </Panel>
                      </Collapse>
                    )}
                  </div>
                </Card> 
              ))}
            </div>

          </div>

          <Modal
            title="Confirmar Exclusão"
            visible={isModalVisible}
            onOk={handleDelete}
            onCancel={handleCancel}
            okText="Excluir"
            cancelText="Cancelar"
          >
            <p>Tem certeza que deseja excluir o e-mail <strong>{selectedEmail}</strong>?</p>
          </Modal>
        </Content>
      </Layout>
    </Layout>
  );
};

export default EmailBoxes;
