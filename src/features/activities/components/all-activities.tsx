'use client';

import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { ActivityCard } from '@/features/activities/components/activity-card';
import useResActivitiesQuery from '@/features/activities/libs/hooks/useResActivitiesQuery';
import Dropdown from '@/shared/components/dropdown/dropdown';
import { ErrorMessage } from '@/shared/components/error-message/error-message';
import Pagination from '@/shared/components/pagination/pagination';
import { AllActivitiesSkeletonGrid } from '@/shared/components/skeleton/skeleton';
import { Button } from '@/shared/libs/shadcn/components/ui/button';

import {
  CATEGORIES,
  SORT_OPTIONS,
} from '../libs/constants/activitiesConstants';

interface AllActivitiesProps {
  keyword?: string;
}

/**
 * 모든 체험 컴포넌트
 * @author 김영현, 김준우
 * @returns 모든 체험 컴포넌트
 * @description 모든 체험 목록을 표시하는 컴포넌트입니다.
 */
const AllActivities = ({ keyword }: AllActivitiesProps) => {
  const [active, setActive] = useState('');
  const [page, setPage] = useState(1);
  const [selectedSort, setSelectedSort] = useState<
    'latest' | 'price_asc' | 'price_desc'
  >('latest');

  const { data, isLoading, isError, size } = useResActivitiesQuery({
    sort: selectedSort,
    category: active || undefined,
    page,
    keyword,
  });

  const activities = data?.activities ?? [];
  const totalCount = data?.totalCount ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / size));

  const handleCategoryChange = (category: string) => {
    if (active === category) {
      setActive('');
    } else {
      setActive(category);
    }
    setPage(1);
  };

  const selectedSortLabel = SORT_OPTIONS.find(
    (option) => option.value === selectedSort,
  )?.label;

  const handleSortChange = (value: 'latest' | 'price_asc' | 'price_desc') => {
    setSelectedSort(value);
    setPage(1);
  };

  // 첫마운트 시 - 파라미터 반영하여 페이지 상태값 재설정
  const pageParams = useSearchParams().get('page');
  useEffect(() => {
    if (pageParams) {
      setPage(Number(pageParams)); // * 값이 이전과 동일하면 리렌더X
    }
  }, [pageParams]);

  // page 변경 시, page 파라미터 수정 (* URL변경, 리렌더 트리거X)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set('page', String(page));
    window.history.replaceState(
      {},
      '',
      `${window.location.pathname}?${params.toString()}`,
    );
  }, [page]);

  return (
    <div className="px-[2.4rem] md:px-[3rem] lg:px-[4rem]">
      <div className="mb-[1rem] flex items-center justify-between md:mb-[1.6rem] lg:mb-[2rem]">
        <p className="flex items-center gap-2 text-[1.8rem] font-bold text-gray-950 md:text-[3.2rem]">
          <Image
            src="/images/icons/skate.svg"
            alt="모든 체험"
            width={18}
            height={18}
            className="size-[1.8rem] md:size-[3.2rem]"
          />
          모든 체험
        </p>
        <Dropdown
          trigger={
            <button className="flex cursor-pointer items-center text-[1.6rem] font-medium text-black">
              {selectedSortLabel} <ChevronDown size={20} className="ml-1" />
            </button>
          }
          dropdownClassName="absolute right-0"
        >
          {(close) => (
            <div className="border-sub-300 txt-14-medium h-[12.3rem] w-[9.6rem] overflow-hidden rounded-xl border-[0.1rem] bg-white">
              {SORT_OPTIONS.map(({ label, value }) => (
                <button
                  key={value}
                  onClick={() => {
                    handleSortChange(
                      value as 'latest' | 'price_asc' | 'price_desc',
                    );
                    close();
                  }}
                  className={`txt-14-medium h-[4.1rem] w-full cursor-pointer px-[1rem] py-[0.6rem] hover:bg-blue-50 ${
                    selectedSort === value
                      ? 'text-main font-bold'
                      : 'text-black'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </Dropdown>
      </div>

      {/* 카테고리 스크롤 영역 */}
      <div className="relative mb-[2.4rem] md:mb-[3rem]">
        {/* 스크롤 컨테이너 */}
        <div className="category-scroll flex flex-nowrap gap-[0.8rem] overflow-x-auto px-[1rem] py-[0.5rem] whitespace-nowrap md:mb-[3rem] md:gap-[2rem]">
          {CATEGORIES.map(({ name, icon: Icon }) => (
            <Button
              key={name}
              variant={active === name ? 'selected' : 'default'}
              size="sm"
              className="group cursor-pointer"
              onClick={() => handleCategoryChange(name)}
            >
              <Icon
                className={`size-[1.7rem] ${active === name ? 'text-white' : 'text-gray-950'}`}
              />
              {name}
            </Button>
          ))}
        </div>
      </div>

      <div>
        {isLoading ? (
          <AllActivitiesSkeletonGrid />
        ) : isError ? (
          <ErrorMessage message="체험을 불러오는 중 오류가 발생했습니다." />
        ) : (
          <div className="grid grid-cols-2 gap-x-[1.8rem] gap-y-[2.4rem] md:gap-x-6 md:gap-y-[2.4rem] lg:grid-cols-4 lg:gap-x-[3rem] lg:gap-y-[2.4rem]">
            {activities.map((activity, index) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                isPriority={index < 2}
              />
            ))}
          </div>
        )}
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={page}
        setPage={setPage}
        className="flex-center mt-[2.4rem] mb-[16.5rem] md:mt-[3rem] md:mb-[27.7rem] lg:mb-[27.1rem]"
      />
    </div>
  );
};

export default AllActivities;
