import axios from 'axios';
import { TokenService } from './TokenService'; 

const emailService = {
  getEmailList: async (user_id) => {
    const token = TokenService.getToken();
    
    if (!token) {
      throw new Error('Token não encontrado! Por favor, faça o login novamente.');
    }

    try {
      const response = await axios.get(`/api/email/list`, {
        params: {
          user_id: user_id,
          folder: '*',
        },
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      return response.data;
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error);
      throw error;
    }
  },

  checkEmailRecords: async (domain) => {
    const token = TokenService.getToken();

    if (!token) {
      throw new Error('Token não encontrado! Por favor, faça o login novamente.');
    }

    try {
      const response = await axios.get(`/api/email/check`, {
        params: {
          domain: domain,
        },
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      return response.data;
    } catch (error) {
      console.error('Erro ao verificar registros de email:', error);
      throw error;
    }
  },

  getEmailAccountByUserId: async () => {
    const token = TokenService.getToken();
    const user_id = TokenService.getUserId();
    
    if (!token) {
      throw new Error('Token não encontrado! Por favor, faça o login novamente.');
    }

    try {
      const response = await axios.get(`/api/email/account`, {
        params: {
          user_id: user_id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      return response.data;
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error);
      throw error;
    }
  },
};

export default emailService;
