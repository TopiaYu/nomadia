import api from '../../../shared/libs/api/axios';
import { apiForRefresh } from '../../../shared/libs/api/axios';
import type {
  LoginRequest,
  LoginResponse,
  SignupRequest,
} from '../types/auth.types';

//로그인 api
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>(`auth/login`, data);
  return response.data;
};

//회원가입 api
export const signup = async (data: SignupRequest): Promise<void> => {
  await api.post('users', data);
};

//리프레시 토큰을 통한 accessToken 재발급
export const refreshToken = async (refreshToken: string) => {
  const response = await apiForRefresh.post('/auth/tokens', null, {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });
  return response.data;
};
