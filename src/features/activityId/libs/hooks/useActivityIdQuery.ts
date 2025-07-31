import { useQuery } from '@tanstack/react-query';
import { ParamValue } from 'next/dist/server/request/params';

import { getActivityId } from '@/features/activityId/libs/api/getActivityId';

//staleTime - 예약현황 업데이트 빈도: e.g.숙소 앱은 1~3분 & 예약 직전 실시간 확인 refetch()
export const useActivityIdQuery = (id: ParamValue) => {
  return useQuery({
    queryKey: ['activityId', id],
    queryFn: () => getActivityId(id),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
