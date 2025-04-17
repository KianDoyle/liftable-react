// liftersApi.js
import axios from 'axios';

const BASE_URL = import.meta.env.REACT_APP_API_URL || 'http://localhost:8080';
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5173';

export const liftersApi = {
  // Get paginated lifters with filters
  getLifters: (params) => {
    // try {
    //   const res = await axios.get(`${VITE_BASE_URL}/static/GoodliftOrdered-${params.event}-${params.equipment}-LifterRecords.json`);
      
    //   const data = {
    //     content: res.data,
    //     pageable: {
    //       pageNumber: 0,
    //       pageSize: res.data.length,
    //       sort: {
    //         empty: true,
    //         sorted: false,
    //         unsorted: true
    //       }
    //     },
    //     totalElements: res.data.length,
    //     totalPages: 1,
    //     last: true,
    //     size: res.data.length,
    //     number: 0,
    //     numberOfElements: res.data.length,
    //     first: true,
    //     empty: false
    //   };      
  
    //   if (data.content) {
    //     console.log("CDN data loaded:", data);
    //     return data;
    //   }
    // } catch (e) {
    //   console.warn("CDN not found; falling back to API:", e);
    // }
  
    // Fallback to live API if CDN fails
    return axios.get(`${BASE_URL}/api/lifters`, { params });
  },
  
  // Get a specific lifter's data
  getLifterByName: (name, params) => {
    return axios.get(`${BASE_URL}/api/lifter/${name}`, { params });
  },

  getLifterNames: () => {
    return axios.get(`${BASE_URL}/api/names`);
  },  
  
  // Get a lifter's personal records/stats
  getLifterStats: (name, equipment = 'Raw') => {
    return axios.get(`${BASE_URL}/api/lifter/${name}/stats`, { 
      params: { equipment } 
    });
  },
  
  // Get top lifters
  getTopLifters: () => {
    return axios.get(`${BASE_URL}/api/lifters/top`);
  },
  
  // Get filter options for dropdowns
  getFilterOptions: () => {
    return axios.get(`${BASE_URL}/api/filters`);
  }
};