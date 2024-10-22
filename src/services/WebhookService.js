import axios from 'axios';
import { TokenService } from './TokenService'; // Importando o TokenService para obter o token de autenticação

const webhookService = {
  registerWebhook: async (webhookData) => {
    const token = TokenService.getToken(); // Obtém o token de autenticação

    const response = await axios.post('/api/webhook/register', webhookData, {
      headers: {
        Authorization: `Bearer ${token}`, // Adiciona o Bearer token
        'Content-Type': 'application/json', // Define o tipo de conteúdo como JSON
      }
    });
    return response.data;
  },

  getList: async (userId) => {
    const token = TokenService.getToken(); // Obtém o token de autenticação
    
    try {
      const response = await axios.get(`/api/webhook/list`, {
        params: {
          user_id: userId, // Passa o userId como parâmetro
        },
        headers: {
          Authorization: `Bearer ${token}`, // Adiciona o Bearer token
          'Content-Type': 'application/json', // Define o tipo de conteúdo como JSON
        }
      });
      return response.data; 
    } catch (error) {
      console.error("Error fetching webhooks:", error);
      throw error; 
    }
  },
};

export default webhookService;
