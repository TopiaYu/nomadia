import { ParamValue } from 'next/dist/server/request/params';

import { ActivityInfo } from '@/features/activityId/libs/types/activityInfo';
import { apiServer } from '@/shared/libs/api/axios';

export const getActivityId = async (id: ParamValue): Promise<ActivityInfo> => {
  const { data } = await apiServer.get(`/activities/${id}`);
  return data;
};
