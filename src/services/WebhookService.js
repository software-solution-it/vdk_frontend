import axios from 'axios';
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://149.18.103.156', // A URL base pode vir de uma variável de ambiente
});

const webhookService = {
  registerWebhook: async (webhookData) => {
    const response = await apiClient.post('/webhook/register', webhookData);
    return response.data;
  },

  getList: async (userId) => {
    try {
      const response = await apiClient.get(`/webhook/list?user_id=${userId}`);
      return response.data; 
    } catch (error) {
      console.error("Error fetching webhooks:", error);
      throw error; 
    }
  },
};

export default webhookService;
