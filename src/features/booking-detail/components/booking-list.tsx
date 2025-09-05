'use client';

import Link from 'next/link';
import { useState } from 'react';

import { ErrorMessage } from '@/shared/components/error-message/error-message';
import NoData from '@/shared/components/no-data/no-data';
import { BookingCardSkeleton } from '@/shared/components/skeleton/skeleton';
import { sortDatesAscending } from '@/shared/libs/utils/parseDate';

import { useBookingQuery } from '../libs/hooks/useBookingQuery';
import { GetBookingResponse, Reservation } from '../libs/types/booking';
import FilterButtons from './filter-buttons';
import GroupedBookingCards from './group-booking-card';

/**
 * 예약 목록 컴포넌트
 * @description 예약 목록 컴포넌트
 * @author 김영현
 */
const BookingList = () => {
  const { data, isLoading, isError } = useBookingQuery() as {
    data: GetBookingResponse | undefined;
    isLoading: boolean;
    isError: boolean;
  };
  const [activeStatus, setActiveStatus] = useState('');

  const filterPastBookings = (reservations: Reservation[]) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return reservations.filter((reservation) => {
      if (reservation.status === 'pending') {
        const reservationDate = new Date(reservation.date);
        reservationDate.setHours(0, 0, 0, 0);
        return reservationDate >= today;
      }
      return true;
    });
  };

  // 날짜 기준 오름차순 정렬
  const sortedReservations = data?.reservations
    ? filterPastBookings(data.reservations).sort((a, b) => {
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
      <div className="flex-center flex w-full flex-col gap-[2rem]">
        <NoData message="아직 예약한 체험이 없어요." />
        <Link href="/activities">
          <button className="bg-main btn-action-blue w-[18.2rem] cursor-pointer rounded-[1.6rem] px-[4rem] py-[1.4rem] text-[1.6rem] font-semibold text-white">
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
          <BookingCardSkeleton />
        ) : isError ? (
          <ErrorMessage />
        ) : filteredBookings.length === 0 ? (
          <NoData message="조건에 맞는 예약 내역이 없어요." />
        ) : (
          <GroupedBookingCards reservations={filteredBookings} />
        )}
      </div>
    </>
  );
};

export default BookingList;
