import { useQuery } from '@tanstack/react-query';
import { liftersApi } from '../services/api';

export function useLifters(page, pageSize, filters = {}) {
  return useQuery({
    queryKey: ['lifters', page, pageSize, filters],
    queryFn: () => liftersApi.getLifters(page, pageSize, filters),
    keepPreviousData: true,
  },
);
}

export function useLifterDetails(name) {
    return useQuery(
      {
        queryKey: ['lifter', name],
        queryFn: () => liftersApi.getLifterByName(name),
        enabled: !!name,
      },
);
}

