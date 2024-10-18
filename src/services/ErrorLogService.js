import axios from 'axios';
import { TokenService } from './TokenService';

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || 'http://149.18.103.156',
  });
  

const errorLogService = {
  logError: async (errorMessage, file, line, userId = null, additionalInfo = null) => {
    const response = await axios.post('/error/log', {
      error_message: errorMessage,
      file: file,
      line: line,
      user_id: userId,
      additional_info: additionalInfo,
    });
    return response.data;
  },

  getAllLogs: async () => {
    const response = await apiClient.get('/error/logs');
    return response.data;
  },

  getLogsByUserId: async () => {
    const userId = TokenService.getUserId()
    const response = await apiClient.get(`/error/logs?user_id=${userId}`);
    return response.data;
  },
};

export default errorLogService;
