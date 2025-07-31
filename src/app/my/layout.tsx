'use client';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

import Sidebar from '@/features/my/components/sidebar';
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

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div
      className={`mx-auto flex justify-center px-[2.4rem] py-[3rem] md:max-w-[68.4rem] md:gap-[3rem] lg:max-w-[98rem] lg:gap-[5rem]`}
    >
      {/* 모바일에서만 보이는 뒤로가기 버튼 */}
      {isMobile && !isMyPageRoot && (
        <button
          onClick={handleBackClick}
          className="absolute top-[5rem] left-[2.4rem]"
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
          (isMobile && !isMyPageRoot) || isActivityRegistration ? 'hidden' : ''
        }
      >
        <Sidebar />
      </aside>
      <main className={`${isMobile && isMyPageRoot ? 'hidden' : ''} w-full`}>
        {children}
      </main>
    </div>
  );
}
