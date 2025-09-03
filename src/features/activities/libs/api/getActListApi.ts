import api from '@/shared/libs/api/axios';
import {
  GetActListApiParams,
  GetActListApiResponse,
} from '@/shared/types/activity';

/**
 * 체험 리스트 조회 GET 요청
 * @author 김영현
 * @since 2025-07-16
 * @param params 체험 리스트 조회 요청 파라미터 (옵션)
 * @returns 체험 리스트 조회 응답 데이터
 */
export const getActListApi = async (
  params?: GetActListApiParams,
): Promise<GetActListApiResponse> => {
  const { data } = await api.get('/activities?method=offset', { params });
  return data;
};
