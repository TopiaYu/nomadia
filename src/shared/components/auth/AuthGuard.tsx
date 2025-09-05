'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { useAuthStore } from '@/features/auth/stores/useAuthStore';
import LoadingSpinner from '@/shared/components/loading-spinner/loading-spinner';

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const router = useRouter();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const [isLoading, setIsLoading] = useState(true);
  const hasRedirectedRef = useRef(false);
  const initialLoadRef = useRef(true);

  useEffect(() => {
    if (!isLoggedIn) {
      if (!hasRedirectedRef.current) {
        hasRedirectedRef.current = true;

        // 초기 로드 시에만 alert 표시 (로그아웃으로 인한 경우가 아닌 경우)
        if (initialLoadRef.current) {
          alert('유효한 사용자가 아닙니다.');
        }

        router.replace('/login');
      }
    } else {
      setIsLoading(false);
      initialLoadRef.current = false; // 로그인 성공 시 초기 로드 상태 해제
    }
  }, [isLoggedIn, router]);

  // 로그인되지 않은 경우 로딩 스피너 표시
  if (!isLoggedIn) {
    return <LoadingSpinner />;
  }

  // 로딩 중인 경우 로딩 스피너 표시
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return <>{children}</>;
};
