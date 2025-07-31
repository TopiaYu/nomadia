/**
 * @description 예약 상태 라벨 매핑
 *
 * @author 김영현
 */
export const BOOKING_STATUS = [
  { label: '예약 완료', value: 'confirmed' },
  { label: '예약 신청', value: 'pending' },
  { label: '예약 취소', value: 'canceled' },
  { label: '예약 거절', value: 'declined' },
  { label: '체험 완료', value: 'completed' },
] as const;

export type BookingStatus = (typeof BOOKING_STATUS)[number]['value'];

/**
 * @description 예약 상태별 색상 매핑
 *
 * @author 김영현
 */
export const STATUS_COLOR_MAP: Record<BookingStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  canceled: 'bg-gray-100 text-gray-600',
  confirmed: 'bg-[#DDF9F9] text-[#1790A0]',
  declined: 'bg-[#FCECEA] text-[#F96767]',
  completed: 'bg-[#DAF0FF] text-[#0D6CD1]',
};
