import {
  ReservationRequestBody,
  ReviewSubmitted,
} from '@/features/activityId/libs/types/reservationType';
import api from '@/shared/libs/api/axios';

export const postReservationForm = async (
  activityId: number,
  body: ReservationRequestBody,
): Promise<ReviewSubmitted> => {
  const { data } = await api.post(
    `/activities/${activityId}/reservations`,
    body,
  );
  return data;
};
