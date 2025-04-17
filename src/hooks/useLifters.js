import { liftersApi } from "../services/liftersApi";
import { useState, useEffect } from 'react';

export const useLifters = (page = 0, size = 100, filters = {}, sortBy = 'goodlift', sortDirection = 'desc') => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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