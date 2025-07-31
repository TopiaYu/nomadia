'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { signInWithKakao } from '@/features/auth/api/signInKakao';
import { useAuthStore } from '@/features/auth/stores/useAuthStore';
import LoadingSpinner from '@/shared/components/loading-spinner/loading-spinner';

const KakaoCallbackPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
  if (!redirectUri) {
    throw new Error(
      'NEXT_PUBLIC_KAKAO_REDIRECT_URI 환경 변수가 설정되지 않았습니다.',
    );
  }

  const doLogin = useAuthStore((state) => state.login);

  useEffect(() => {
    if (!code) return;

    const login = async () => {
      try {
        const data = await signInWithKakao(code, redirectUri);

        doLogin({
          user: data.user,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        });

        router.replace('/activities');
      } catch (error) {
        console.error('카카오 로그인 에러', error);
        router.push('/login');
      }
    };

    login();
  }, [code, redirectUri, router, doLogin]);

  return <LoadingSpinner />;
};

export default KakaoCallbackPage;
