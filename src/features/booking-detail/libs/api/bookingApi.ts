import api from '@/shared/libs/api/axios';

import {
  GetBookingParams,
  GetBookingResponse,
  PostReviewParams,
  Reservation,
  ReviewResponse,
} from '../types/booking';

/**
 * 예약 목록 조회 API
 */
export const getBooking = async (
  params?: GetBookingParams,
): Promise<GetBookingResponse> => {
  const { data } = await api.get('/my-reservations', { params });
  return data;
};

/**
 * 예약 취소 API
 */
export const cancelBooking = async (
  reservationId: number,
): Promise<Reservation> => {
  const { data } = await api.patch(`/my-reservations/${reservationId}`, {
    status: 'canceled',
  });
  return data;
};

/**
 * 리뷰 작성 API
 */
export const postReview = async (
  params: PostReviewParams,
): Promise<ReviewResponse> => {
  const { data } = await api.post(
    `/my-reservations/${params.reservationId}/reviews`,
    {
      rating: params.rating,
      content: params.content,
    },
  );
  return data;
};
