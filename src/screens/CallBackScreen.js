import React, { useEffect, useState } from 'react';
import { Modal, Card, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import callBackService from '../services/CallBackService';

const CallBackScreen = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [modalContent, setModalContent] = useState('Processando e-mail e autorização...');
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const state = params.get('state');

    const processCallback = async () => {
      if (code && state) {
        await handleCallBack(code, state);
      } else {
        setModalContent('Código ou estado não fornecido.');
        setLoading(false);
        startCountdown();
      }
    };

    processCallback();
  }, []); 

  const handleCallBack = async (code, state) => {
    try {
      const decodedState = JSON.parse(atob(state)); 
      const userId = decodedState.user_id;
      const providerId = decodedState.provider_id;


      const response = await callBackService.callBack(code, state, userId, providerId);

      if (response.status) {
        setModalContent('Autenticado com sucesso!');
      } else {
        setModalContent('Falha na autenticação.');
      }
      setLoading(false);
      startCountdown();
    } catch (error) {
      setModalContent('Erro ao processar o callback.');
      setLoading(false);
      startCountdown();
    }
  };

  const startCountdown = () => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/login');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <Modal
      visible={isModalVisible}
      footer={null}
      closable={false}
      centered
      bodyStyle={{ padding: 0 }}
    >
      <Card
        style={{ borderRadius: '8px' }}
        bodyStyle={{ padding: '40px', textAlign: 'center' }}
      >
        {loading ? (
          <div>
            <Spin size="large" />
            <h2 style={{ marginTop: '20px' }}>Processando e-mail e autorização...</h2>
          </div>
        ) : (
          <div>
            <h2>{modalContent}</h2>
            <p>Redirecionando em {countdown} segundos...</p>
          </div>
        )}
      </Card>
    </Modal>
  );
};

export default CallBackScreen;
