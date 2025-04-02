// liftersApi.js
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

export const liftersApi = {
  // Get paginated lifters with filters
  getLifters: (params) => {
    return axios.get(`${BASE_URL}/lifters`, { params });
  },
  
  // Get a specific lifter's data
  getLifterById: (name, params) => {
    return axios.get(`${BASE_URL}/lifter/${encodeURIComponent(name)}`, { params });
  },
  
  // Get a lifter's personal records/stats
  getLifterStats: (name, equipment = 'Raw') => {
    return axios.get(`${BASE_URL}/lifter/${encodeURIComponent(name)}/stats`, { 
      params: { equipment } 
    });
  },
  
  // Get top lifters
  getTopLifters: () => {
    return axios.get(`${BASE_URL}/lifters/top`);
  },
  
  // Get filter options for dropdowns
  getFilterOptions: () => {
    return axios.get(`${BASE_URL}/filters`);
  }
};

// Example usage in a hook
export const useLifters = (page = 0, size = 20, filters = {}, sortBy = 'goodlift', sortDirection = 'desc') => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await liftersApi.getLifters({
          page,
          size,
          sortBy,
          direction: sortDirection,
          ...filters
        });
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch lifters');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [page, size, filters, sortBy, sortDirection]);
  
  return { data, isLoading, error };
};