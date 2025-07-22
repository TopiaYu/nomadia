import { ReactNode } from 'react';

/**
 * StepCard 컴포넌트에 전달되는 props 타입
 * - 랜딩 페이지 3단계 안내 카드 등에서 사용
 */
export interface StepCardProps {
  icon: ReactNode;
  step: string;
  title: string;
  description: ReactNode;
}
