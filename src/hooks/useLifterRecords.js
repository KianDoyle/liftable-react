import { liftersApi } from "../services/liftersApi";
import { useState, useEffect } from "react";

export const useLifterRecords = (name = '', filters = {}, sortBy = 'date', sortDirection = 'desc') => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await liftersApi.getLifterByName({
                    name: name,
                    sortBy,
                    direction: sortDirection,
                    ...filters
                });
                setData(response.data);
                setError(null);
            } catch (err) {
                setError(err.message || `Failed to fetch lifter with name: ${name}`);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [name, filters, sortBy, sortDirection]);

    return { data, isLoading, error };
};