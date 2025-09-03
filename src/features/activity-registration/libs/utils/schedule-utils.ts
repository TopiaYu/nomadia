import { TIME_OPTIONS } from '@/features/activity-registration/libs/constants/formOption';
import { Schedule } from '@/shared/types/activity';

/**
 * 특정 날짜에 사용된 시작 시간들을 반환하는 함수
 * @param schedules 전체 스케줄 배열
 * @param targetDate 대상 날짜
 * @param excludeIndex 제외할 인덱스
 * @returns 사용된 시작 시간 배열
 */
export const getUsedStartTimes = (
  schedules: Schedule[],
  targetDate: string,
  excludeIndex: number,
): string[] => {
  return schedules
    .filter(
      (schedule, index) =>
        index !== excludeIndex && schedule.date === targetDate,
    )
    .map((schedule) => schedule.startTime)
    .filter(Boolean); // 빈 문자열 제거
};

/**
 * 다음 시간 옵션을 반환하는 함수
 * @param startTime 현재 시작 시간
 * @returns 다음 시간 옵션
 */
export const getNextHour = (startTime: string): string => {
  const currentIndex = TIME_OPTIONS.findIndex(
    (option) => option.value === startTime,
  );
  if (currentIndex !== -1 && currentIndex < TIME_OPTIONS.length - 1) {
    return TIME_OPTIONS[currentIndex + 1].value;
  }
  return '';
};

/**
 * 필드가 터치되었는지 확인하는 함수
 * @param touchedFields 터치된 필드 상태 객체
 * @param index 스케줄 인덱스
 * @param field 필드명
 * @returns 터치 여부
 */
export const isFieldTouched = (
  touchedFields: { [key: string]: boolean },
  index: number,
  field: keyof Schedule,
): boolean => {
  const fieldKey = `schedules.${index}.${field}`;
  return touchedFields[fieldKey];
};
