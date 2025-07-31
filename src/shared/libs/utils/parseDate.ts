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
