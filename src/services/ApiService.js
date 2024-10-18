import axios from 'axios';
import { TokenService } from './TokenService';

const ApiService = axios.create({
  baseURL: '/api',
});

ApiService.interceptors.request.use((config) => {
  const token = TokenService.getToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default ApiService;
