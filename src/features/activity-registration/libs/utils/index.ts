import { Schedule } from '@/shared/types/activity';

/**
 * 체험 등록 관련 유틸리티 함수들
 */

/**
 * 시간 유효성 검증 함수
 * @param startTime - 시작 시간 (HH:MM 형식)
 * @param endTime - 종료 시간 (HH:MM 형식)
 * @returns 유효성 검증 결과
 */
export const validateTimeRange = (
  startTime: string,
  endTime: string,
): boolean => {
  if (!startTime || !endTime) return true;

  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);

  const startMinutes = startHour * 60 + startMinute;
  const endMinutes = endHour * 60 + endMinute;

  return endMinutes > startMinutes;
};

/**
 * 이미지 URL 유효성 검증 함수
 * @param url - 이미지 URL
 * @returns 유효성 검증 결과
 */
export const isValidImageUrl = (url: string): boolean => {
  if (!url || typeof url !== 'string') return false;

  // 기본적인 URL 형식 검증
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * 스케줄 데이터 정규화 함수
 * @param schedules - 스케줄 배열
 * @returns 정규화된 스케줄 배열
 */
export const normalizeSchedules = (schedules: Schedule[]): Schedule[] => {
  return schedules
    .filter(
      (schedule) => schedule.date && schedule.startTime && schedule.endTime,
    )
    .map((schedule) => ({
      date: schedule.date,
      startTime: schedule.startTime,
      endTime: schedule.endTime,
    }));
};
