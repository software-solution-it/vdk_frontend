import axios from 'axios';

const authService = {
  login: async (email, password) => {
    const response = await axios.post('/api/auth/login', { email, password });
    return response.data;
  },
  verifyLoginCode: async (email, code) => {
    const response = await axios.post('/api/auth/verify-code', {
      email,
      verificationCode: code,
    });
    return response.data;
  },

  forgotPassword: async (email) => {
    const response = await axios.post('/api/auth/forgot-password', { email });
    return response.data;
  },

  resetPassword: async (password, token) => {
    const response = await axios.post('/api/auth/reset-password', { password, token });
    return response.data;
  },

  preRegister: async (userData) => {
    const response = await axios.post('/api/auth/register', userData);
    return response.data;
  },

  resendCode: async (email) => {
    const response = await axios.post('/api/auth/resend-code', { email });
    return response.data;
  },
};

export default authService;
