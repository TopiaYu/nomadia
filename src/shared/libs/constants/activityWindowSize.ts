/**
 * 체험 목록 표시 개수 조정
 * @author 김영현
 * @description 모바일, 태블릿, 데스크탑 환경에 따라 체험 목록 표시 개수 조정 (useResActivitiesQuery.ts)
 */
export const activityWindowSize = {
  TABLET: 4,
  MOBILE: 6,
  DESKTOP: 8,
} as const;
