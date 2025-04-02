import { api } from './api.js';

export const liftersApi = {
    getLifters: (page = 0, pageSize = 20) => 
      api.get('/api/lifters', {
        params: {
          page,
          size: pageSize
        },
      }),

    getLifterByName: (name) => 
      api.get(`/api/lifter/${name}`)
};