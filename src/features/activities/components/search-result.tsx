'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

import { ActivityCard } from '@/features/activities/components/activity-card';
import useResActivitiesQuery from '@/features/activities/libs/hooks/useResActivitiesQuery';
import Pagination from '@/shared/components/pagination/pagination';

const SearchResults = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const keyword = searchParams.get('keyword') ?? '';
  const region = searchParams.get('region') ?? '';
  const category = searchParams.get('category') ?? '';
  const page = Number(searchParams.get('page') ?? 1);

  const { data, isLoading, isError, size } = useResActivitiesQuery({
    keyword: keyword.trim() || undefined,
    region: region || undefined,
    category: category || undefined,
    sort: 'latest',
    page,
  });

  const activities = data?.activities ?? [];
  const totalCount = data?.totalCount ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / size));

  const handlePageChange: React.Dispatch<React.SetStateAction<number>> = (
    value,
  ) => {
    const nextPage = typeof value === 'function' ? value(page) : value;
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(nextPage));
    router.push(`/activities?${params.toString()}`, { scroll: false });
  };

  return (
    <section className="px-[2.4rem]">
      <p className="mb-4 text-[1.8rem] font-bold text-gray-950 md:text-[2.4rem]">
        <strong>
          {keyword} [지역: {region}, 카테고리: {category}]
        </strong>
        으로 검색한 결과입니다.
      </p>
      <p className="mb-6 text-[1.4rem] text-gray-700 md:text-[1.8rem]">
        총 <strong>{totalCount}</strong>개의 결과
      </p>

      {isLoading && (
        <div className="py-12 text-center text-gray-400">로딩 중...</div>
      )}
      {isError && (
        <div className="py-12 text-center text-red-500">
          데이터를 불러오는 중 오류가 발생했습니다.
        </div>
      )}
      {!isLoading && !isError && (
        <>
          {activities.length > 0 ? (
            <>
              <div className="grid grid-cols-2 gap-x-[1.8rem] gap-y-[2.4rem] md:gap-x-6 md:gap-y-[2.4rem] lg:grid-cols-4 lg:gap-x-[3rem] lg:gap-y-[2.4rem]">
                {activities.map((activity, index) => (
                  <ActivityCard
                    key={activity.id}
                    activity={activity}
                    isPriority={index < 2}
                  />
                ))}
              </div>
              <Pagination
                totalPages={totalPages}
                currentPage={page}
                setPage={handlePageChange}
                className="flex-center mt-[2.4rem] mb-[16.5rem] md:mt-[3rem] md:mb-[27.7rem] lg:mb-[27.1rem]"
              />
            </>
          ) : (
            <div className="py-12 text-center text-gray-500">
              검색 결과가 없습니다.
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default SearchResults;
