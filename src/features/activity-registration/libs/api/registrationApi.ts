import api from '@/shared/libs/api/axios';
import { ActivityRegistrationParams } from '@/shared/types/activity';

export const registrationApi = async (params: ActivityRegistrationParams) => {
  const { data } = await api.post('/activities', params);

  return data;
};
