import axios from 'axios';
import { TokenService } from './TokenService';

const errorLogService = {
  logError: async (errorMessage, file, line, userId = null, additionalInfo = null) => {
    const token = TokenService.getToken(); 
    
    const response = await axios.post('/api/error/log', {
      error_message: errorMessage,
      file: file,
      line: line,
      user_id: userId,
      additional_info: additionalInfo,
    }, {
      headers: {
        Authorization: `Bearer ${token}`, 
        'Content-Type': 'application/json', 
      }
    });
    return response.data;
  },

  getAllLogs: async () => {
    const token = TokenService.getToken();
    
    const response = await axios.get('/api/error/logs', {
      headers: {
        Authorization: `Bearer ${token}`, 
        'Content-Type': 'application/json', 
      }
    });
    return response.data;
  },

  getLogsByUserId: async () => {
    const token = TokenService.getToken(); 
    const userId = TokenService.getUserId(); 
    
    const response = await axios.get(`/api/error/logs`, {
      params: {
        user_id: userId,
      },
      headers: {
        Authorization: `Bearer ${token}`, 
        'Content-Type': 'application/json', 
      }
    });
    return response.data;
  },
};

export default errorLogService;
