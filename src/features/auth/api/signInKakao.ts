import { AxiosError } from 'axios';

import api from '@/shared/libs/api/axios';

interface KakaoSignInResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    nickname: string;
  };
}

export const signInWithKakao = async (
  token: string,
  redirectUri: string,
): Promise<KakaoSignInResponse> => {
  if (!token || !redirectUri) {
    throw new Error('토큰과 리다이렉트 URI는 필수입니다.');
  }

  try {
    const res = await api.post<KakaoSignInResponse>(`/oauth/sign-in/kakao`, {
      token,
      redirectUri,
    });

    return res.data;
  } catch (error) {
    console.error('카카오 로그인 에러', error);

    const err = error as AxiosError;

    if (err.response?.status === 404) {
      await api.post(`/oauth/sign-up/kakao`, {
        token,
        redirectUri,
      });

      const res = await api.post<KakaoSignInResponse>(`/oauth/sign-in/kakao`, {
        token,
        redirectUri,
      });

      return res.data;
    }

    throw new Error('카카오 로그인 실패');
  }
};
