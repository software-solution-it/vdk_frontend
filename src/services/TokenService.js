// src/services/TokenService.js

export const TokenService = {
  getToken: () => {
    return localStorage.getItem('token');
  },

  setToken: (token) => {
    localStorage.setItem('token', token);
  },

  removeToken: () => {
    localStorage.removeItem('token');
  },

  isAuthenticated: () => {
    const token = TokenService.getToken();
    if (!token) return false;

    const { exp } = JSON.parse(atob(token.split('.')[1]));
    return exp * 1000 > Date.now(); // Verifica se o token expirou
  },

  getUserId: () => {
    const token = TokenService.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.data.id; // Ajuste conforme a estrutura do seu token
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
      return null;
    }
  },
};
