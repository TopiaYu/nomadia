import { Schedule } from '@/shared/types/activity';

/**
 * @description 날짜 문자열을 Date 객체로 변환합니다. (ex. "2025.07.28" -> "2025-07-28")
 *
 * @author 김영현
 * @param date 날짜 문자열
 * @returns Date 객체
 */
export const parseDate = (date: string) => {
  const normalizedDate = date.replace(/\./g, '-');
  const parsed = new Date(normalizedDate);

  return isNaN(parsed.getTime()) ? new Date(0) : parsed;
};

/**
 * @description 날짜 문자열 배열을 오름차순으로 정렬합니다.
 *
 * @author 김영현
 * @param dates 날짜 문자열 배열
 * @returns 정렬된 날짜 문자열 배열
 */
export const sortDatesAscending = (dates: string[]): string[] => {
  return [...dates].sort((a, b) => {
    const dateA = parseDate(a);
    const dateB = parseDate(b);
    return dateA.getTime() - dateB.getTime();
  });
};

/**
 * @description 날짜 문자열 배열을 내림차순으로 정렬합니다.
 *
 * @author 김영현
 * @param dates 날짜 문자열 배열
 * @returns 정렬된 날짜 문자열 배열
 */
export const sortDatesDescending = (dates: string[]): string[] => {
  return [...dates].sort((a, b) => {
    const dateA = parseDate(a);
    const dateB = parseDate(b);
    return dateB.getTime() - dateA.getTime();
  });
};

/**
 * @description 오늘 날짜를 YYYY-MM-DD 형식의 문자열로 반환합니다.
 *
 * @author 김영현
 * @returns 오늘 날짜 문자열 (예: "2024-01-15")
 */
export const getTodayDateString = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * @description 스케줄 배열에서 같은 날짜에 중복된 시작 시간이 있는지 검증합니다.
 *
 * @author 김영현
 * @param schedules 스케줄 배열
 * @returns 중복된 시간이 있으면 true, 없으면 false
 */
export const hasDuplicateStartTime = (schedules: Schedule[]): boolean => {
  const dateTimeMap = new Map<string, Set<string>>();

  for (const schedule of schedules) {
    if (!schedule.date || !schedule.startTime) continue;

    if (!dateTimeMap.has(schedule.date)) {
      dateTimeMap.set(schedule.date, new Set());
    }
    const timeSet = dateTimeMap.get(schedule.date)!;
    if (timeSet.has(schedule.startTime)) {
      return true; // 중복 발견
    }
    timeSet.add(schedule.startTime);
  }
  return false;
};
