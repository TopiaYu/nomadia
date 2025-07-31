'use client';

import Image from 'next/image';
import { useRef } from 'react';

import LoadingSpinner from '@/shared/components/loading-spinner/loading-spinner';
import { useItemInfiniteQuery } from '@/shared/libs/hooks/infiniteScroll/useInfiniteQuery';
import { useInfiniteScroll } from '@/shared/libs/hooks/infiniteScroll/useInfiniteScroll';
import { Activity } from '@/shared/types/activity';

import MyActivitiesCard from '../components/my-activities-card';
import { getMyActivities } from '../lib/api/myActivities.api';
export const MyActivitiesList = () => {
  const { data, fetchNextPage, hasNextPage, isLoading, isError, error } =
    useItemInfiniteQuery({
      keyName: 'myActivities',
      getFn: getMyActivities,
      params: {
        size: 4,
      },
    });
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  useInfiniteScroll(loadMoreRef, isLoading, hasNextPage, fetchNextPage, 50);

  if (isLoading) {
    return (
      <>
        <LoadingSpinner />
      </>
    );
  }
  if (isError) {
    return <div>{error.message}</div>;
  }
  // 페이지 없으면 빈 배열로 받음
  const activities = data?.pages.flatMap((page) => page.activities) || [];

  // 등록한 내용이 없을때
  if (activities?.length === 0) {
    return (
      <div className="mt-[6rem] flex flex-col items-center">
        <Image
          src="/images/sad-laptop.svg"
          alt="Sad laptop"
          width={246}
          height={200}
        />
        <p className="my-[4.5rem] text-[1.8rem] font-medium text-gray-600">
          아직 등록한 체험이 없어요
        </p>
      </div>
    );
  }

  return (
    <div>
      {activities.map((activity: Activity) => (
        <MyActivitiesCard key={activity.id} activity={activity} />
      ))}
      <div ref={loadMoreRef}></div>
    </div>
  );
};
