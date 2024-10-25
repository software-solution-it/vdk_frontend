import axios from 'axios';

const callBackService = {


    callBack: async (code, state, userId, providerId) => {
        const response = await axios.post('/server/email/callback', { code, state, userId, providerId });
        return response.data;
      },
};

export default callBackService;
