'use client';

import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import { useEffect } from 'react';

import Header from '@/features/activityId/components/header';
import AddressWithMap from '@/features/activityId/components/map/address-with-map';
import SubImages from '@/features/activityId/components/sub-images';
import { getActivityId } from '@/features/activityId/libs/api/getActivityId';
import { textStyle } from '@/features/activityId/libs/constants/variants';
import { useCalendarStore } from '@/shared/components/calendar/libs/stores/useCalendarStore';
import LoadingSpinner from '@/shared/components/loading-spinner/loading-spinner';
import { useModalStore } from '@/shared/components/modal/libs/stores/useModalStore';
import { cn } from '@/shared/libs/cn';
const ReservationModal = dynamic(
  () => import('@/features/activityId/components/reservation-modal'),
  {
    ssr: false,
    loading: () => <LoadingSpinner />,
  },
);
const Reviews = dynamic(
  () => import('@/features/activityId/components/reviews'),
  {
    ssr: false,
    loading: () => <LoadingSpinner />,
  },
);

const ActivityPageContent = ({ id }: { id: string }) => {
  const { closeModal } = useModalStore();
  const { setYear, setMonth, resetSelectedDate, resetDate } =
    useCalendarStore();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['activityId', id],
    queryFn: () => getActivityId(id),
    staleTime: 1000 * 60 * 30,
  });

  // notfound 페이지로 에러처리
  if (isError) {
    notFound();
  }

  // 언마운트 시 클린업
  useEffect(() => {
    return () => {
      // 모달 닫기
      closeModal();
      // 캘린더 리셋
      const today = new Date();
      setYear(today.getFullYear());
      setMonth(today.getMonth());
      resetSelectedDate();
      resetDate();
    };
  }, [closeModal, setMonth, setYear, resetDate, resetSelectedDate]);

  if (isLoading || !data) return <LoadingSpinner />;

  return (
    <div className="mx-auto w-full justify-center p-[2.4rem] md:px-[4rem] lg:max-w-[120rem] lg:pt-[1.6rem]">
      {/* 체험 이미지 */}
      <SubImages images={data?.subImages} />
      <div className={cn('lg:grid lg:grid-cols-[1fr_41.9rem] lg:gap-[4rem]')}>
        <div>
          {/* 헤더 영역(분류, 제목, 별점, 주소, 드롭다운) */}
          <Header data={data} />
          {/* 체험 설명 */}
          <hr className="mt-[2rem] mb-[2rem]" />
          <section>
            <h2 className={textStyle.h2}>체험 설명</h2>
            <p className={textStyle.content}>{data?.description}</p>
          </section>
          {/* 오시는 길 */}
          <hr className="mt-[2rem] mb-[2rem]" />
          <AddressWithMap address={data?.address} />
          {/* 체험 후기 */}
          <hr className="mb-[2rem] lg:mb-[4rem]" />
          <Reviews activityId={Number(id)} />
        </div>
        {/* 체험 예약 캘린더 */}
        <ReservationModal price={data?.price} activityId={Number(id)} />
      </div>
    </div>
  );
};
export default ActivityPageContent;
