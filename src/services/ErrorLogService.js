import axios from 'axios';
import { TokenService } from './TokenService';

const errorLogService = {
  logError: async (errorMessage, file, line, userId = null, additionalInfo = null) => {
    const token = TokenService.getToken(); // Obtém o token de autenticação
    
    const response = await axios.post('/api/error/log', {
      error_message: errorMessage,
      file: file,
      line: line,
      user_id: userId,
      additional_info: additionalInfo,
    }, {
      headers: {
        Authorization: `Bearer ${token}`, // Adiciona o Bearer token
        'Content-Type': 'application/json', // Define o tipo de conteúdo como JSON
      }
    });
    return response.data;
  },

  getAllLogs: async () => {
    const token = TokenService.getToken(); // Obtém o token de autenticação
    
    const response = await axios.get('/api/error/logs', {
      headers: {
        Authorization: `Bearer ${token}`, // Adiciona o Bearer token
        'Content-Type': 'application/json', // Define o tipo de conteúdo como JSON
      }
    });
    return response.data;
  },

  getLogsByUserId: async () => {
    const token = TokenService.getToken(); // Obtém o token de autenticação
    const userId = TokenService.getUserId(); // Obtém o ID do usuário
    
    const response = await axios.get(`/api/error/logs`, {
      params: {
        user_id: userId,
      },
      headers: {
        Authorization: `Bearer ${token}`, // Adiciona o Bearer token
        'Content-Type': 'application/json', // Define o tipo de conteúdo como JSON
      }
    });
    return response.data;
  },
};

export default errorLogService;
