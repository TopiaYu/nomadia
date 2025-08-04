import { EditActivityRequest } from '@/features/my/activity-edit/libs/types/types';
import { EditActivityResponse } from '@/features/my/activity-edit/libs/types/types';
import api from '@/shared/libs/api/axios';

export const editActivity = async (
  id: number,
  data: EditActivityRequest,
): Promise<EditActivityResponse> => {
  const response = await api.patch(`/my-activities/${id}`, data);
  return response.data;
};
