import { useQuery } from '@tanstack/react-query';

import { getSchedules } from '@/features/activityId/libs/api/getSchedules';

//staleTime - 예약현황 업데이트 빈도: e.g.숙소 앱은 1~3분 & 예약 직전 실시간 확인 refetch()
export const useSchedulesQuery = (
  id: number,
  params: { year: string; month: string },
) => {
  return useQuery({
    queryKey: ['schedule', id, params.year, params.month],
    queryFn: () => getSchedules(id, params),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
