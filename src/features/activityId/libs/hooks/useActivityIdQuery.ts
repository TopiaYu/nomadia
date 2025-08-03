import { useQuery } from '@tanstack/react-query';
import { ParamValue } from 'next/dist/server/request/params';

import { getActivityId } from '@/features/activityId/libs/api/getActivityId';

export const useActivityIdQuery = (id: ParamValue) => {
  return useQuery({
    queryKey: ['activityId', id],
    queryFn: () => getActivityId(id),
    staleTime: 1000 * 60 * 30,
    retry: 1,
  });
};
