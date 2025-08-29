/**
 * 별점 관련 유틸리티 함수들
 * @author 김영현
 */

/**
 * 별점을 소수점 한자리까지 포맷팅 (타입 안전성 강화)
 * @param rating - 별점 (0-5, undefined/null 허용)
 * @returns 포맷팅된 별점 문자열
 */
export const formatRatingToDecimal = (
  rating: number | undefined | null,
): string => {
  // undefined/null 처리
  if (rating == null) return '0.0';

  // NaN 처리
  if (Number.isNaN(rating)) return '0.0';

  // 경계값 클램핑 (0-5 범위로 제한)
  const clampedRating = Math.min(Math.max(rating, 0), 5);

  // 0 이하 처리
  if (clampedRating <= 0) return '0.0';

  return clampedRating.toFixed(1);
};

/**
 * 별점 표시 여부 확인
 * @param rating - 별점
 * @param reviewCount - 리뷰 개수
 * @returns 별점을 표시할지 여부
 */
export const shouldShowRating = (
  rating: number,
  reviewCount: number,
): boolean => {
  return !!(rating && reviewCount && reviewCount > 0);
};
