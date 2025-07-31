'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { ErrorMessage } from '@/shared/components/error-message/error-message';
import LoadingSpinner from '@/shared/components/loading-spinner/loading-spinner';
import { sortDatesAscending } from '@/shared/libs/utils/parseDate';

import { useBookingQuery } from '../libs/hooks/useBookingQuery';
import FilterButtons from './filter-buttons';
import GroupedBookingCards from './group-booking-card';

const BookingList = () => {
  const { data, isLoading, isError } = useBookingQuery();
  const [activeStatus, setActiveStatus] = useState('');

  // 날짜 기준 오름차순 정렬
  const sortedReservations = data?.reservations
    ? [...data.reservations].sort((a, b) => {
        const sortedDates = sortDatesAscending([a.date, b.date]);
        return sortedDates[0] === a.date ? -1 : 1;
      })
    : [];

  const filteredBookings = activeStatus
    ? sortedReservations.filter((r) => r.status === activeStatus)
    : sortedReservations;

  // 예약 내역이 없을 때
  if (data && data.reservations.length === 0) {
    return (
      <div className="flex-center mt-[6rem] mb-[14.9rem] h-[40rem] w-full flex-col gap-[3rem] px-[2rem] md:mb-[47.2rem] lg:mb-[37rem]">
        <Image
          src="/images/sad-laptop.svg"
          alt="Sad laptop"
          width={246}
          height={200}
        />
        <p className="text-[1.8rem] font-medium text-gray-600">
          아직 예약한 체험이 없어요.
        </p>
        <Link href="/activities">
          <button className="bg-main w-[18.2rem] cursor-pointer rounded-[1.6rem] px-[4rem] py-[1.4rem] text-[1.6rem] font-semibold text-white hover:opacity-90">
            체험 찾기
          </button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <FilterButtons active={activeStatus} onChange={setActiveStatus} />
      <div className="flex flex-col gap-[2rem]">
        {isLoading ? (
          <div className="flex-center h-[16rem]">
            <LoadingSpinner />
          </div>
        ) : isError ? (
          <ErrorMessage />
        ) : filteredBookings.length === 0 ? (
          <div className="flex-center flex-col gap-[1.6rem]">
            <Image
              src="/images/sad-laptop.svg"
              alt="Sad laptop"
              width={182}
              height={182}
            />
            <p className="text-[1.6rem] font-medium text-gray-600">
              조건에 맞는 예약 내역이 없어요.
            </p>
          </div>
        ) : (
          <GroupedBookingCards reservations={filteredBookings} />
        )}
      </div>
    </>
  );
};

export default BookingList;
