'use client';
import { usePathname } from 'next/navigation';

// 현재 경로가 activity/[id] --> 세션스토리지에 현재 경로 저장
export const useSavePathActivityId = () => {
  const pathname = usePathname();
  const isActivityId = /^\/activities\/\d+$/.test(pathname);
  const savePath = () => {
    if (isActivityId) {
      sessionStorage.setItem('redirectAfterSuccess', pathname);
    }
  };
  return savePath;
};
