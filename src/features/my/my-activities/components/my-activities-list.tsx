'use client';

import { useRef } from 'react';

import NoData from '@/shared/components/no-data/no-data';
import { MyActivitiesSkeleton } from '@/shared/components/skeleton/skeleton';
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
        <MyActivitiesSkeleton />
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
    return <NoData message="아직 등록한 체험이 없어요" />;
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
