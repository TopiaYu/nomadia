import { Award, Calendar, Search } from 'lucide-react';

import type { StepCardProps } from '../types/types';

/**
 * 랜딩 페이지 3단계 안내에 사용되는 StepCard 데이터 배열
 * - 각 단계별 아이콘, 제목, 설명을 포함
 */
export const steps: StepCardProps[] = [
  {
    icon: <Search className="text-main h-8 w-8 md:h-10 md:w-10" />,
    step: 'STEP 1',
    title: '관심 체험 찾기',
    description: (
      <>
        <span>내 취향과 위치에 맞는</span>
        <br />
        체험을 찾아보세요
      </>
    ),
  },
  {
    icon: <Calendar className="text-main h-8 w-8 md:h-10 md:w-10" />,
    step: 'STEP 2',
    title: '간편 예약 하기',
    description: (
      <>
        <span>원하는 날짜와 시간을</span>
        <br />
        선택하고 바로 예약
      </>
    ),
  },
  {
    icon: <Award className="text-main h-8 w-8 md:h-10 md:w-10" />,
    step: 'STEP 3',
    title: '체험 & 리뷰',
    description: (
      <>
        <span>새로운 경험을 즐기고</span>
        <br />
        다른 사람들과 공유
      </>
    ),
  },
];
