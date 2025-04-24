import React from 'react';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_SPRING_API_BASE_URL;
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

export const liftersApi = {
  // Get paginated lifters with filters
  getLifters: (params) => {
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
  },

  getChartsData: () => {
    return axios.get(`${BASE_URL}/api/charts`, { params });
  }
};