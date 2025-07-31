import api from '@/shared/libs/api/axios';
import {
  GetActListApiParams,
  GetActListApiResponse,
} from '@/shared/types/activity';
interface GetListWithCursorID extends GetActListApiParams {
  cursorId?: number;
}

// 내 체험 데이터 조회 api
export const getMyActivities = async (
  params?: GetListWithCursorID,
): Promise<GetActListApiResponse> => {
  const response = await api.get('/my-activities', {
    params,
  });
  return response.data;
};

// 내 체험 삭제 api
export const deleteActivities = async (activityId: number) => {
  if (!activityId || activityId <= 0) {
    throw new Error('유효하지 않은 활동 Id입니다.');
  }
  const response = await api.delete(`/my-activities/${activityId}`);
  return response.data;
};
