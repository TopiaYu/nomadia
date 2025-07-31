import { ReviewResponse } from '@/features/activityId/libs/types/reviewResponse';
import api from '@/shared/libs/api/axios';

export const getReviews = async (
  id: number,
  params: { page: number; size: number },
): Promise<ReviewResponse> => {
  const { data } = await api.get(`/activities/${id}/reviews?`, {
    params,
  });
  return data;
};
