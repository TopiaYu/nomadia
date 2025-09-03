'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';
import { Toaster } from 'sonner';

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // 기본 staleTime을 5분으로 설정
            staleTime: 1000 * 60 * 5,
            // 기본 gcTime을 10분으로 설정
            gcTime: 1000 * 60 * 10,
            // 재시도 횟수를 1회로 제한
            retry: 1,
            // 창 포커스 시 재요청 방지
            refetchOnWindowFocus: false,
            // 마운트 시 재요청 방지
            refetchOnMount: false,
            // 네트워크 재연결 시 재요청 방지
            refetchOnReconnect: false,
          },
          mutations: {
            // 뮤테이션 재시도 방지
            retry: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-center" />
      {children}
    </QueryClientProvider>
  );
}
