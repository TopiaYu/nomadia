/**
 * @description 날짜 문자열을 Date 객체로 변환합니다.
 *
 * @author 김영현
 * @param date 날짜 문자열
 * @returns Date 객체
 * 플랫폼 간 일관성을 위해 구성요소로 분해하여 로컬 기준으로 생성합니다.
 */
export const parseDate = (date: string) => {
  if (!date) return new Date(0);

  // 점(.)을 하이픈(-)으로 변환하여 YYYY-MM-DD 형식으로 정규화
  const normalizedDate = date.replace(/\./g, '-');

  // YYYY-MM-DD 형식을 구성요소로 분해하여 로컬 기준으로 Date 생성
  const parts = normalizedDate.split('-');
  if (parts.length !== 3) return new Date(0);

  const [year, month, day] = parts.map(Number);

  // 유효한 숫자인지 확인
  if (isNaN(year) || isNaN(month) || isNaN(day)) return new Date(0);

  // 유효한 월/일 범위 검증 (롤오버 방지)
  if (month < 1 || month > 12) return new Date(0);
  if (day < 1 || day > 31) return new Date(0);

  // month는 0-based이므로 1을 빼줌
  const parsed = new Date(year, month - 1, day);

  // 생성된 날짜가 유효한지 확인
  if (isNaN(parsed.getTime())) return new Date(0);

  // 라운드트립 체크: 원본 입력과 변환된 날짜가 일치하는지 확인
  const yearStr = parsed.getFullYear().toString();
  const monthStr = String(parsed.getMonth() + 1).padStart(2, '0');
  const dayStr = String(parsed.getDate()).padStart(2, '0');
  const roundTripDate = `${yearStr}-${monthStr}-${dayStr}`;

  // 원본 입력과 라운드트립 결과가 다르면 롤오버가 발생한 것
  if (normalizedDate !== roundTripDate) return new Date(0);

  return parsed;
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
 * @description 내일 날짜를 YYYY-MM-DD 형식의 문자열로 반환합니다.
 *
 * @author 김영현
 * @returns 내일 날짜 문자열 (예: "2025-08-28") (오늘 날짜 + 1일)
 */
export const getTomorrowDateString = (): string => {
  const today = new Date();

  const tomorrow = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1,
  );

  const year = tomorrow.getFullYear();
  const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
  const day = String(tomorrow.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * @description 날짜가 내일 이후인지 검증합니다.
 * iOS와 Android에서 일관된 동작을 보장합니다.
 *
 * @author 김영현
 * @param dateString YYYY-MM-DD 형식의 날짜 문자열
 * @returns 내일 이후인 경우 true, 그렇지 않으면 false
 */
export const isDateAfterTomorrow = (dateString: string): boolean => {
  if (!dateString) return false;

  // parseDate 함수를 사용하여 유효성 검증과 함께 날짜 파싱
  const selectedDate = parseDate(dateString);

  // 유효하지 않은 날짜인 경우 false 반환
  if (selectedDate.getTime() === new Date(0).getTime()) return false;

  // 내일 날짜도 동일한 방식으로 생성
  const tomorrowString = getTomorrowDateString();
  const [tomorrowYear, tomorrowMonth, tomorrowDay] = tomorrowString
    .split('-')
    .map(Number);
  const tomorrow = new Date(tomorrowYear, tomorrowMonth - 1, tomorrowDay);

  // 시간을 00:00:00으로 설정하여 날짜만 비교
  selectedDate.setHours(0, 0, 0, 0);
  tomorrow.setHours(0, 0, 0, 0);

  return selectedDate >= tomorrow;
};
