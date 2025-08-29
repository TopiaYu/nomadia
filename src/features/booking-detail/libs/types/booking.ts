import { Reservation } from '@/shared/types/reservation';

import { BookingStatus } from '../constants/bookingStatus';

// 예약 목록 조회 API 파라미터 타입
export type GetBookingParams = {
  cursorId?: number;
  size?: number;
  status?: BookingStatus;
};

// 예약 상세 조회 API 응답 타입 - 공통 타입 사용
export type { Reservation };

// 예약 목록 조회 API 응답 타입
export type GetBookingResponse = {
  totalCount: number;
  reservations: Reservation[];
  cursorId: number | null;
};

// 리뷰 작성 API 파라미터 타입
export type PostReviewParams = {
  reservationId: number;
  rating: number;
  content: string;
};

// 리뷰 작성 API 응답 타입
export type ReviewResponse = {
  id: number;
  content: string;
  rating: number;
  userId: number;
  activityId: number;
  teamId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};
