import axios from 'axios';
import { TokenService } from './TokenService'; 
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://149.18.103.156', // A URL base pode vir de uma variável de ambiente
});

const userService = {

  getUserById: async () => {
    const id = TokenService.getUserId();
    const response = await apiClient.get(`/user/get?id=${id}`);
    return response.data;
  },

  checkUserAccess: async (id) => {
    const response = await apiClient.get(`/user/check-access?id=${id}`);
    return response.data;
  },
};

export default userService;
