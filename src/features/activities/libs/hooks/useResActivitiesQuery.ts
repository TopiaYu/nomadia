import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { getActListApi } from '@/features/activities/libs/api/getActListApi';
import { activityWindowSize } from '@/shared/libs/constants/activityWindowSize';
import useWindowSize from '@/shared/libs/hooks/useWindowSize';
import {
  GetActListApiParams,
  GetActListApiResponse,
} from '@/shared/types/activity';

type ResponsiveParams = Omit<GetActListApiParams, 'size'>;

/**
 * 모든 체험 목록 조회 훅 (all-activities.tsx)
 * @author 김영현
 * @param params - 모든 체험 목록 조회 파라미터
 * @returns 모든 체험 목록 조회 결과
 * @description 모바일, 태블릿, 데스크탑 환경에 따라 체험 목록 표시 개수 조정
 */
const useResActivitiesQuery = (params: ResponsiveParams) => {
  const { isMobile, isTablet, isDesktop, ready } = useWindowSize();

  const size = useMemo(() => {
    if (!ready) return activityWindowSize.MOBILE;
    if (isMobile) return activityWindowSize.MOBILE;
    if (isTablet) return activityWindowSize.TABLET;
    if (isDesktop) return activityWindowSize.DESKTOP;

    return activityWindowSize.MOBILE;
  }, [isMobile, isTablet, isDesktop, ready]);

  const queryResult = useQuery<GetActListApiResponse>({
    queryKey: ['activities', { ...params, size }],
    queryFn: () => getActListApi({ ...params, size }),
    staleTime: 1000 * 60 * 15,
    retry: 1,
    refetchOnWindowFocus: false, // 창 포커스 시 재요청 방지
    refetchOnMount: false, // 마운트 시 재요청 방지
  });

  return {
    ...queryResult,
    size,
  };
};

export default useResActivitiesQuery;
