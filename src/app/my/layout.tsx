'use client';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import Sidebar from '@/features/my/components/sidebar';
import { AuthGuard } from '@/shared/components/auth/AuthGuard';
import LoadingSpinner from '@/shared/components/loading-spinner/loading-spinner';
import useWindowSize from '@/shared/libs/hooks/useWindowSize';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { width } = useWindowSize();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (width && width >= 768 && pathname === '/my') {
      router.push('/my/profile');
    }
  }, [width, pathname, router]);

  const isMobile = width ? width < 768 : false;
  const isMyPageRoot = pathname === '/my';
  const isActivityRegistration =
    pathname === '/my/my-activities/activity-registration';
  const isActivityEdit = pathname.startsWith('/my/my-activities/activity-edit');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleBackClick = () => {
    router.push('/my');
  };

  if (!isClient) {
    return (
      <div className="flex-center h-screen w-full">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <AuthGuard>
      <div
        className={`mx-auto flex justify-center px-[2.4rem] py-[3rem] md:w-[73.2rem] md:gap-[3rem] lg:min-w-[102.4rem] lg:gap-[5rem]`}
      >
        {/* 모바일에서만 보이는 뒤로가기 버튼 */}
        {isMobile && !isMyPageRoot && (
          <button
            onClick={handleBackClick}
            className="absolute top-[5.8rem] left-[2.4rem]"
            aria-label="뒤로 가기"
          >
            <Image
              src="/images/icons/back.svg"
              alt="뒤로 가기"
              width={23}
              height={23}
            />
          </button>
        )}

        <aside
          className={
            (isMobile && !isMyPageRoot) ||
            isActivityRegistration ||
            isActivityEdit
              ? 'hidden'
              : ''
          }
        >
          <Sidebar />
        </aside>
        <main className={`${isMobile && isMyPageRoot ? 'hidden' : ''} w-full`}>
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}
