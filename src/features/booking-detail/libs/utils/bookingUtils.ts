import {
  BOOKING_STATUS,
  BookingStatus,
  STATUS_COLOR_MAP,
} from '../constants/bookingStatus';

/**
 * @description 예약 상태에 대한 라벨을 반환합니다.
 *
 * @author 김영현
 * @param status 예약 상태
 * @returns 상태 라벨
 */
export const getStatusLabel = (status: string): string => {
  return BOOKING_STATUS.find((s) => s.value === status)?.label || status;
};

/**
 * @description 예약 상태에 대한 색상 클래스를 반환합니다.
 *
 * @author 김영현
 * @param status 예약 상태
 * @returns 색상 클래스
 */
export const getStatusColorClass = (status: BookingStatus): string => {
  return STATUS_COLOR_MAP[status] || 'bg-gray-100 text-gray-600';
};

/**
 * @description 예약 시간을 포맷팅합니다.
 *
 * @author 김영현
 * @param startTime 시작 시간
 * @param endTime 종료 시간
 * @returns 포맷팅된 시간 문자열
 */
export const formatBookingTime = (
  startTime: string,
  endTime: string,
): string => {
  return `${startTime} - ${endTime}`;
};
