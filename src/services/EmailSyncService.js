import axios from 'axios';

const emailSyncService = {
  syncEmails: async () => {
    const response = await axios.post('/email/sync');
    return response.data;
  },
};

export default emailSyncService;
