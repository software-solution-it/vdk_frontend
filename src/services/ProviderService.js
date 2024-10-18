import axios from 'axios';

const providerService = {
  createProvider: async (providerData) => {
    const response = await axios.post('/provider/create', providerData);
    return response.data;
  },

  updateProvider: async (id, providerData) => {
    const response = await axios.put(`/provider/update?id=${id}`, providerData);
    return response.data;
  },

  deleteProvider: async (id) => {
    const response = await axios.delete(`/provider/delete?id=${id}`);
    return response.data;
  },

  getAllProviders: async () => {
    const response = await axios.get('/provider/list');
    return response.data;
  },
};

export default providerService;
