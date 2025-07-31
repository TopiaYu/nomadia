// 체험 등록 - 카테고리 영역
export const CATEGORY_OPTIONS = [
  { value: '문화 · 예술', label: '문화 · 예술' },
  { value: '식음료', label: '식음료' },
  { value: '스포츠', label: '스포츠' },
  { value: '투어', label: '투어' },
  { value: '관광', label: '관광' },
  { value: '웰빙', label: '웰빙' },
];

// 체험 등록 - 시간 영역 (동적으로 생성하여 유지보수성 향상)
export const TIME_OPTIONS = Array.from({ length: 24 }, (_, hour) => ({
  value: `${hour.toString().padStart(2, '0')}:00`,
  label: `${hour.toString().padStart(2, '0')}:00`,
}));

// 폼 검증 상수
export const FORM_CONSTRAINTS = {
  PRICE: {
    MIN: 1000,
    MAX: 1000000,
  },
  IMAGES: {
    MAX_SIZE_MB: 5,
    MAX_COUNT: 4,
  },
  SCHEDULES: {
    MIN_COUNT: 1,
  },
} as const;

// 카테고리 타입
export type CategoryType = (typeof CATEGORY_OPTIONS)[number]['value'];

// 시간 타입
export type TimeType = (typeof TIME_OPTIONS)[number]['value'];
