import axios from 'axios';

const emailAccountService = {
  createEmailAccount: async (emailData) => {
    const response = await axios.post('/email/create', emailData);
    return response.data;
  },

  updateEmailAccount: async (id, emailData) => {
    const response = await axios.put(`/email/update?id=${id}`, emailData);
    return response.data;
  },

  deleteEmailAccount: async (id) => {
    const response = await axios.delete(`/email/delete?id=${id}`);
    return response.data;
  },

  getEmailAccountById: async (id) => {
    const response = await axios.get(`/email/account?id=${id}`);
    return response.data;
  },
};

export default emailAccountService;
