import axios from "axios";

const API_BASE_URL = import.meta.SPRING_API_BASE_URL || '/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const liftersApi = {
    getLifters: async (page = 0, pageSize = 20, filters = {}) => {
      const response = await api.get('/api/lifters', {
        params: {
          page,
          size: pageSize,
          ...filters,
        },
      });
      return response.data;
    },

    getLifterByName: async (name) => {
        const response = await api.get(`/lifter/${name}`);
        return response.data;
    },
};

export { liftersApi }; 