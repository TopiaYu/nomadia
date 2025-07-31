import { useQuery } from '@tanstack/react-query';

import { getReviews } from '@/features/activityId/libs/api/getReviews';

export const useReviewsQuery = (
  id: number,
  params: { page: number; size: number },
) => {
  return useQuery({
    queryKey: ['reviews'],
    queryFn: () => getReviews(id, params),
    staleTime: 1000 * 60 * 30,
    retry: 1,
  });
};
