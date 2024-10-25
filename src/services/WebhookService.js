import axios from 'axios';
import { TokenService } from './TokenService';

const webhookService = {
  registerWebhook: async (webhookData) => {
    const token = TokenService.getToken(); 

    const response = await axios.post('/api/webhook/register', webhookData, {
      headers: {
        Authorization: `Bearer ${token}`, 
        'Content-Type': 'application/json', 
      }
    });
    return response.data;
  },

  getList: async (userId) => {
    const token = TokenService.getToken(); 
    
    try {
      const response = await axios.get(`/api/webhook/list`, {
        params: {
          user_id: userId, 
        },
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json', 
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
