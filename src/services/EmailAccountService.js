import axios from 'axios';
import { TokenService } from '../services/TokenService'; 

const emailAccountService = {
  createEmailAccount: async (emailData) => {
    const token = TokenService.getToken(); 
    const response = await axios.post('/api/email/create', emailData, {
      headers: {
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  },

  updateEmailAccount: async (id, emailData) => {
    const token = TokenService.getToken(); 
    const response = await axios.put(`/api/email/update?id=${id}`, emailData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  },

  deleteEmailAccount: async (id) => {
    const token = TokenService.getToken();
    const response = await axios.delete(`/api/email/delete?id=${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  },

  getEmailAccountById: async (id) => {
    const token = TokenService.getToken();
    const response = await axios.get(`/api/email/account?id=${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  },
};

export default emailAccountService;
