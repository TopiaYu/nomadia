import { ParamValue } from 'next/dist/server/request/params';

import { ActivityInfo } from '@/features/activityId/libs/types/activityInfo';
import api from '@/shared/libs/api/axios';

export const getActivityId = async (id: ParamValue): Promise<ActivityInfo> => {
  const { data } = await api.get(`/activities/${id}`);
  return data;
};
