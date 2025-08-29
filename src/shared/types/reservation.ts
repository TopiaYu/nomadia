import { Activity, ActivityBase } from '@/shared/types/activity';

// 예약에서 사용할 Activity 타입 (필요한 필드만 추출)
export type BookingActivity = Pick<Activity, 'id'> &
  Pick<ActivityBase, 'title' | 'bannerImageUrl'>;

/**
 * @description 예약 정보 타입
 * @author 김영현
 * 예약 내역 조회 API 응답 타입
 */
export type Reservation = {
  activity: BookingActivity; // activity 객체 추가
  id: number; // number로 통일 (store와 일치)
  teamId: string;
  userId: number;
  scheduleId: number; // scheduleId 필드 추가
  status: 'pending' | 'confirmed' | 'declined' | 'canceled' | 'completed';
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
};
