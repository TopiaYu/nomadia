import { Activity, ActivityBase } from '@/shared/types/activity';

import { BookingStatus } from '../constants/bookingStatus';

// 예약 목록 조회 API 파라미터 타입
export type GetBookingParams = {
  cursorId?: number;
  size?: number;
  status?: BookingStatus;
};

// 예약에서 사용할 Activity 타입 (필요한 필드만 추출)
export type BookingActivity = Pick<Activity, 'id'> &
  Pick<ActivityBase, 'title' | 'bannerImageUrl'>;

// 예약 상세 조회 API 응답 타입
export type Reservation = {
  activity: BookingActivity;
  scheduleId: number;
  id: number;
  teamId: string;
  userId: number;
  status: BookingStatus;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  createdAt: string;
  updatedAt: string;
};

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
