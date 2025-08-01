import axios from 'axios';

import { refreshToken as apiRefreshToken } from '@/features/auth/api/auth.api';
import { useAuthStore } from '@/features/auth/stores/useAuthStore';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

// refresh용 api 호출
export const apiForRefresh = axios.create({
  baseURL,
});

const api = axios.create({
  baseURL,
});

api.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore.getState();

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

/**
 * 토큰 재발급용 인터셉터 입니다
 *
 *  @description 요청실패시 응답 처리
 *  1.요청 실패를 감지합니다
 *  2.무한루프를 방지합니다
 *  3.리프레시 토큰이 없다면 바로 로그아웃시켜서 안정성을 높입니다
 *  4.토큰 갱신을 시도합니다
 *  5.실패시 로그아웃시킵니다.
 */

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originRequest = error.config;

    if (error.response?.status === 401 && !originRequest._retry) {
      originRequest._retry = true;

      try {
        const { refreshToken, setTokens, logout } = useAuthStore.getState();
        if (!refreshToken) {
          alert('세션이 만료되었습니다. 다시 로그인해주세요.');
          logout();
          window.location.replace('/login');
          return Promise.reject(error);
        }

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          await apiRefreshToken(refreshToken);

        setTokens({
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        });

        originRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        return api(originRequest);
      } catch (refreshError) {
        const { logout } = useAuthStore.getState();
        alert('세션 갱신 실패, 다시 로그인해주세요');
        logout();
        window.location.replace('/login');
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default api;
