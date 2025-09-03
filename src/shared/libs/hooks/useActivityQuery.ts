import { useInfiniteQuery } from '@tanstack/react-query';

import { getActListApi } from '@/features/activities/libs/api/getActListApi';
import {
  GetActListApiParams,
  GetActListApiResponse,
} from '@/shared/types/activity';

/**
 * 체험 목록 조회 훅
 * @author 김영현
 * @param params - 체험 목록 조회 파라미터 (page 제외)
 * @returns 체험 목록 조회 결과
 * @description 랜딩페이지, 메인화면 배너, 인기 체험 컴포넌트에서 사용될 useActivityQuery 훅
 */
const useActivityQuery = (params: GetActListApiParams) => {
  return useInfiniteQuery<GetActListApiResponse>({
    queryKey: ['activities', params],
    queryFn: ({ pageParam = 1 }) =>
      getActListApi({ ...params, page: pageParam as number }),
    getNextPageParam: (lastPage, allPages) => {
      const totalCount = lastPage.totalCount;
      const currentTotal = allPages.reduce(
        (acc, page) => acc + page.activities.length,
        0,
      );

      // 현재까지 로드된 개수가 전체 개수보다 적으면 다음 페이지 요청
      return currentTotal < totalCount ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 1000 * 60 * 15,
    gcTime: 1000 * 60 * 30,
    retry: 1,
    refetchOnWindowFocus: false,
    // 마운트 시 재요청 방지
    refetchOnMount: false,
    // 네트워크 재연결 시 재요청 방지
    refetchOnReconnect: false,
  });
};

export default useActivityQuery;
