import { useState, useEffect } from "react";
import { liftersApi } from "../services/liftersApi";

export const useSearchLifters = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await liftersApi.getLifterNames(); // Fetch all names once
        setData(response.data || []); // Ensure it's always an array
        setError(null);
      } catch (err) {
        setError(err.message || "Failed to fetch lifter names");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // ✅ Runs only once when the component mounts

  return { data, isLoading, error };
};
