import { AvailableScheduleList } from '@/features/activityId/libs/types/availableSchedule';
import api from '@/shared/libs/api/axios';

export const getSchedules = async (
  id: number,
  params: { year: string; month: string },
): Promise<AvailableScheduleList> => {
  const { data } = await api.get(`/activities/${id}/available-schedule?`, {
    params,
  });
  return data;
};
