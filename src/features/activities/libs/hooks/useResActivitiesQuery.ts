import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { getActListApi } from '@/features/activities/libs/api/getActListApi';
import {
  GetActListApiParams,
  GetActListApiResponse,
} from '@/features/activities/libs/types/activity';

type ResponsiveParams = Omit<GetActListApiParams, 'size'>;

/**
 * 모든 체험 목록 조회 훅 (all-activities.tsx)
 * @author 김영현
 * @param params - 모든 체험 목록 조회 파라미터
 * @returns 모든 체험 목록 조회 결과
 * @description 모바일, 태블릿, 데스크탑 환경에 따라 체험 목록 표시 개수 조정
 */
const useResActivitiesQuery = (params: ResponsiveParams) => {
  const [size, setSize] = useState(6);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setSize(6);
      } else if (width < 1024) {
        setSize(4);
      } else {
        setSize(8);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const queryResult = useQuery<GetActListApiResponse>({
    queryKey: ['activities', { ...params, size }],
    queryFn: () => getActListApi({ ...params, size }),
    staleTime: 1000 * 60 * 15,
    retry: 1,
  });

  return {
    ...queryResult,
    size,
  };
};

export default useResActivitiesQuery;
