'use client';

import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

// 즉시 로드
import BannerCarousel from '@/features/activities/components/banner-carousel';
import Search from '@/features/activities/components/search';
import LoadingSpinner from '@/shared/components/loading-spinner/loading-spinner';

// 지연 로드 (성능 최적화) - Next.js dynamic 사용
const BestActivities = dynamic(
  () => import('@/features/activities/components/best-activities'),
);

const AllActivities = dynamic(
  () => import('@/features/activities/components/all-activities'),
);

const SearchResults = dynamic(
  () => import('@/features/activities/components/search-result'),
);

const ActivitiesPageContent = () => {
  const searchParams = useSearchParams();

  const keyword = searchParams.get('keyword')?.trim() || '';
  const region = searchParams.get('region')?.trim() || '';
  const category = searchParams.get('category')?.trim() || '';

  const isSearching =
    keyword.length > 0 || region.length > 0 || category.length > 0;

  return (
    <main className="bg-background flex w-full flex-col gap-10">
      <div className="mx-auto w-full max-w-[120rem]">
        {/* 즉시 로드*/}
        <BannerCarousel />
        <Search />

        {isSearching ? (
          <Suspense fallback={<LoadingSpinner />}>
            <SearchResults />
          </Suspense>
        ) : (
          <>
            {/* 지연 로드: 인기 체험 */}
            <BestActivities />

            {/* 지연 로드: 전체 체험 목록 */}
            <AllActivities />
          </>
        )}
      </div>
    </main>
  );
};

export default ActivitiesPageContent;
