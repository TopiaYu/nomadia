'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useAuthStore } from '@/features/auth/stores/useAuthStore';
import LoadingSpinner from '@/shared/components/loading-spinner/loading-spinner';

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const router = useRouter();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) {
      alert('유효한 사용자가 아닙니다.');
      router.replace('/login');
    } else {
      setIsLoading(false);
    }
  }, [isLoggedIn, router]);

  if (isLoading) {
    return (
      <>
        <LoadingSpinner />
      </>
    );
  }
  return <>{children}</>;
};
