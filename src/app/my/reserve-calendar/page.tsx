'use client';

import { ChevronDown } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import { getActListApi } from '@/features/activities/libs/api/getActListApi';
import { getReservationsByMonthApi } from '@/features/activities/libs/api/getReserveMonthApi';
import { useAuthStore } from '@/features/auth/stores/useAuthStore';
import CalendarWithReservations from '@/shared/components/calendar/components/calendar-with-reservations';
import { MonthReservations } from '@/shared/components/calendar/libs/types/data';
import Dropdown from '@/shared/components/dropdown';
import BaseModal from '@/shared/components/modal/components/base-modal';
import { useCalendarStore } from '@/shared/libs/stores/useCalendarStore';
import { useModalStore } from '@/shared/libs/stores/useModalStore';
import { Activity } from '@/shared/types/activity';

const ReserveCalendarPage = () => {
  const [reservationArray, setReservationArray] = useState<MonthReservations[]>(
    [],
  );
  const { user } = useAuthStore();
  const userId = user?.id;
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivityTitle, setSelectedActivityTitle] =
    useState<string>('내가 등록한 체험 선택');
  const [selectedActivityId, setSelectedActivityId] = useState<string | null>(
    null,
  );
  const [shouldFetch, setShouldFetch] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const { year, month } = useCalendarStore();
  const { isModalOpen, openModal } = useModalStore();

  const handleDropdownOpen = () => {
    setShouldFetch(true);
  };

  const handleDateClick = (dateStr: string) => {
    setSelectedDate(dateStr);
    openModal();
  };

  useEffect(() => {
    if (!shouldFetch || !userId) return;

    (async () => {
      try {
        const data = await getActListApi();
        const myActivities = (data.activities || []).filter(
          (activity) => activity.userId === Number(userId),
        );
        setActivities(myActivities);
      } catch (error) {
        console.error('내 체험 리스트 조회 실패', error);
      }
      setShouldFetch(false);
    })();
  }, [shouldFetch, userId]);

  const handleSelectActivity = (id: string | number, title: string) => {
    setSelectedActivityTitle(title);
    setSelectedActivityId(String(id));
  };

  useEffect(() => {
    if (!selectedActivityId) {
      setReservationArray([]);
      return;
    }

    (async () => {
      try {
        const reservations = await getReservationsByMonthApi({
          activityId: selectedActivityId,
          year,
          month: month + 1,
        });
        setReservationArray(reservations);
      } catch (error) {
        console.error('내 체험 리스트 조회 실패', error);
        setReservationArray([]);
      }
    })();
  }, [selectedActivityId, year, month]);

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex h-[6.8rem] flex-col gap-[1rem]">
        <h2 className="txt-18-bold text-gray-950">예약 현황</h2>
        <p className="txt-14-medium text-gray-500">
          내 체험의 내역들을 한 눈에 확인할 수 있습니다.
        </p>
      </div>

      <Dropdown
        trigger={
          <div
            role="button"
            tabIndex={0}
            onClick={handleDropdownOpen}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleDropdownOpen();
              }
            }}
            className="shadow-experience-card mt-[1.8rem] flex h-[5.4rem] w-full cursor-pointer items-center justify-end rounded-[1rem] border border-gray-100 bg-white pr-[2.6rem] text-[1.4rem] text-gray-950 md:text-[1.6rem]"
          >
            <span>{selectedActivityTitle}</span>
            <ChevronDown className="size-[2rem]" />
          </div>
        }
        dropdownClassName="w-full bg-white shadow-experience-card rounded-[1rem] border border-gray-100 px-[2.6rem]"
      >
        {(close) => (
          <ul className="py-3">
            {activities.length === 0 && <p>등록한 체험이 없습니다.</p>}
            {activities.map((act) => (
              <button
                key={act.id}
                className="block w-full cursor-pointer py-2 text-left hover:bg-gray-100"
                onClick={() => {
                  handleSelectActivity(act.id, act.title);
                  close();
                }}
              >
                {act.title}
              </button>
            ))}
          </ul>
        )}
      </Dropdown>

      <div className="flex-center flex">
        {selectedActivityId ? (
          <CalendarWithReservations
            reservationArray={reservationArray}
            calendarWidth="md:w-[47.6rem] lg:w-[64rem] md:mt-[2.4rem] md:rounded-[2rem] border border-gray-50 shadow-experience-card"
            dayOfWeekStyle="w-[5.35rem] md:w-[6.8rem] lg:w-[9.143rem]"
            onCellClick={handleDateClick}
          />
        ) : (
          <p className="mt-4 text-center text-gray-500">
            등록한 체험을 선택해주세요.
          </p>
        )}

        {isModalOpen && selectedDate && (
          <BaseModal
            type="custom"
            hasOverlay
            isCenter
            extraClassName="max-w p-6 rounded-xl"
          >
            <div />
          </BaseModal>
        )}
      </div>
    </div>
  );
};

export default ReserveCalendarPage;
