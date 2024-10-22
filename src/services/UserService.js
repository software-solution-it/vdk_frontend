import axios from 'axios';
import { TokenService } from '../services/TokenService'; 

const userService = {

  getUserById: async () => {
    const token = TokenService.getToken();
    const id = TokenService.getUserId();

    const response = await axios.get(`/api/user/get?id=${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`, // Adicionando o Bearer token
        'Content-Type': 'application/json', // Opcional, define o tipo de conteúdo
      }
    });
    
    return response.data;
  },

  checkUserAccess: async (id) => {
    const token = TokenService.getToken();

    const response = await axios.get(`/api/user/check-access?id=${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`, // Adicionando o Bearer token
        'Content-Type': 'application/json', // Opcional, define o tipo de conteúdo
      }
    });
    
    return response.data;
  },
};

export default userService;
