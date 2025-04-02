

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