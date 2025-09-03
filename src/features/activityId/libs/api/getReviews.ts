import { ReviewResponse } from '@/features/activityId/libs/types/reviewResponse';
import api, { apiServer } from '@/shared/libs/api/axios';

export const getReviews = async (
  id: number,
  params: { page: number; size: number },
): Promise<ReviewResponse> => {
  const { data } = await api.get(`/activities/${id}/reviews?`, {
    params,
  });
  return data;
};

export const getReviewsInServer = async (
  id: number,
  params: { page: number; size: number },
): Promise<ReviewResponse> => {
  const { data } = await apiServer.get(`/activities/${id}/reviews?`, {
    params,
  });
  return data;
};
