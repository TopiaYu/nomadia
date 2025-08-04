import api from '@/shared/libs/api/axios';
import { ActivityRegistrationParams } from '@/shared/types/activity';

/**
 * 체험 등록 API
 * @description 체험 등록 API
 * @author 김영현
 * @param params 체험 등록 파라미터
 * @returns 체험 등록 응답
 */
export const registrationApi = async (params: ActivityRegistrationParams) => {
  const { data } = await api.post('/activities', params);

  return data;
};
