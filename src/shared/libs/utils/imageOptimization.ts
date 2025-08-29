/**
 * 이미지 품질 최적화
 * @param isPriority - 우선순위 이미지 여부
 * @param baseQuality - 기본 품질 (기본값: 75)
 * @param priorityQuality - 우선순위 이미지 품질 (기본값: 85)
 * @returns 최적화된 품질 값
 */
export const optimizeImageQuality = (
  isPriority: boolean,
  baseQuality: number = 75,
  priorityQuality: number = 85,
): number => {
  return isPriority ? priorityQuality : baseQuality;
};

/**
 * 반응형 sizes 속성 생성
 * @param breakpoints - 브레이크포인트 설정
 * @returns sizes 문자열
 */
export const generateResponsiveSizes = (
  breakpoints: {
    mobile?: string;
    tablet?: string;
    desktop?: string;
  } = {},
): string => {
  const { mobile = '100vw', tablet = '50vw', desktop = '25vw' } = breakpoints;

  return `(max-width: 768px) ${mobile}, (max-width: 1024px) ${tablet}, ${desktop}`;
};
