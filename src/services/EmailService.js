import axios from 'axios';
import { TokenService } from './TokenService'; 

// Crie uma instância do axios com baseURL definida
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://149.18.103.156/api', // A URL base pode vir de uma variável de ambiente
});

const emailService = {
  // Método para obter a lista de e-mails
  getEmailList: async (user_id) => {
    // Obtenha o token do TokenService
    const token = TokenService.getToken();
    
    if (!token) {
      throw new Error('Token não encontrado! Por favor, faça o login novamente.');
    }

    try {
      const response = await apiClient.get(`/email/list`, {
        params: {
          user_id: user_id, // Usa o user_id passado como argumento
          folder: '*', // Usando '*' para obter e-mails de todas as pastas
        },
        headers: {
          Authorization: `Bearer ${token}`, // Adiciona o token ao cabeçalho
        },
      });
      
      return response.data; // Retorna os dados da resposta
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error);
      throw error; // Relança o erro para tratamento em outro lugar
    }
  },

  // Método para verificar registros de email (DKIM, SPF, DMARC)
  checkEmailRecords: async (domain) => {
    try {
      const response = await apiClient.get(`/email/check`, {
        params: {
          domain: domain, // Passa o domínio para verificar DKIM, SPF e DMARC
        },
      });
      
      return response.data; // Retorna os dados da resposta
    } catch (error) {
      console.error('Erro ao verificar registros de email:', error);
      throw error; // Relança o erro para tratamento em outro lugar
    }
  },

  // Método para obter a lista de contas de e-mail por user_id
  getEmailAccountByUserId: async () => {
    const token = TokenService.getToken();
    const user_id = TokenService.getUserId();
    if (!token) {
      throw new Error('Token não encontrado! Por favor, faça o login novamente.');
    }

    try {
      const response = await apiClient.get(`/email/account`, {
        params: {
          user_id: user_id, // Passa o user_id como parâmetro da requisição
        },
        headers: {
          Authorization: `Bearer ${token}`, // Adiciona o token ao cabeçalho
        },
      });
      
      return response.data; // Retorna os dados da resposta
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error);
      throw error; // Relança o erro para tratamento em outro lugar
    }
  },
};

export default emailService;
