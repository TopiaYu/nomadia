'use client';

import { useQuery } from '@tanstack/react-query';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

import { getActListApi } from '@/features/activities/libs/api/getActListApi';
import { getReservations } from '@/features/activities/libs/api/getReserveDayApi';
import { getReservationsByMonthApi } from '@/features/activities/libs/api/getReserveMonthApi';
import { useAuthStore } from '@/features/auth/stores/useAuthStore';
import { ContentReservation } from '@/features/reservation-state/components/content-reservation';
import EmptyReservation from '@/features/reservation-state/components/empty-reservation';
import { useResModalPosition } from '@/features/reservation-state/libs/useResModalPosition';
import CalendarWithReservations from '@/shared/components/calendar/components/calendar-with-reservations';
import { useCalendarStore } from '@/shared/components/calendar/libs/stores/useCalendarStore';
import { MonthReservations } from '@/shared/components/calendar/libs/types/data';
import Dropdown from '@/shared/components/dropdown/dropdown';
import AdaptiveModal from '@/shared/components/modal/components/adaptive-modal/adaptive-modal';
import { useModalStore } from '@/shared/components/modal/libs/stores/useModalStore';
import useWindowSize from '@/shared/libs/hooks/useWindowSize';
import { Activity } from '@/shared/types/activity';

interface Reservation {
  id: string;
  scheduleId: number;
  status: 'pending' | 'confirmed' | 'declined';
  date: string;
  [key: string]: unknown;
}

interface ReservationsByActivity {
  allReservations: MonthReservations[];
  earliestDate: Date | null;
}

const useReservationsByActivity = (activityId: string | null, month: number) =>
  useQuery<ReservationsByActivity>({
    queryKey: ['reservationsByActivity', activityId, month],
    queryFn: async () => {
      if (!activityId) return { allReservations: [], earliestDate: null };

      const currentYear = new Date().getFullYear();
      const monthsToFetch = 12;
      let earliestDate: Date | null = null;
      let allReservations: MonthReservations[] = [];

      for (let i = 0; i < monthsToFetch; i++) {
        const fetchYear = currentYear + Math.floor((month + i) / 12);
        const fetchMonth = (month + i) % 12;

        const reservations = await getReservationsByMonthApi({
          activityId,
          year: fetchYear,
          month: fetchMonth + 1,
        });

        allReservations = [...allReservations, ...reservations];

        for (const r of reservations) {
          const resDate = new Date(r.date);
          if (!earliestDate || resDate < earliestDate) earliestDate = resDate;
        }

        if (earliestDate) break;
      }

      return { allReservations, earliestDate };
    },
    enabled: !!activityId,
    staleTime: 1000 * 60 * 5,
  });

const ReserveCalendarPage = () => {
  const [reservationArray, setReservationArray] = useState<MonthReservations[]>(
    [],
  );
  const { user, accessToken } = useAuthStore();
  const userId = user?.id;
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivityTitle, setSelectedActivityTitle] =
    useState<string>('내가 등록한 체험 선택');
  const [selectedActivityId, setSelectedActivityId] = useState<string | null>(
    null,
  );
  const [shouldFetch, setShouldFetch] = useState(false);
  const [selectedScheduleId, setSelectedScheduleId] = useState<number[]>([]);

  const { appearModal, disappearModal } = useModalStore();
  const { isDesktop } = useWindowSize();
  const {
    month,
    setYear,
    setMonth,
    resetDate,
    resetSelectedDate,
    selectedDate,
  } = useCalendarStore();

  const calendarRef = useRef<HTMLDivElement>(null);
  const modalPosition = useResModalPosition(calendarRef);

  useEffect(() => {
    if (selectedDate && !isDesktop) {
      appearModal();
    } else {
      disappearModal();
    }
  }, [selectedDate, appearModal, disappearModal, isDesktop]);

  useEffect(() => {
    if (!shouldFetch || !userId) return;

    (async () => {
      try {
        const data = await getActListApi();
        const myActivities = (data.activities || []).filter(
          (act) => act.userId === Number(userId),
        );
        setActivities(myActivities);
      } catch (error) {
        console.error('내 체험 리스트 조회 실패', error);
      }
      setShouldFetch(false);
    })();
  }, [shouldFetch, userId]);

  const handleDropdownOpen = () => setShouldFetch(true);

  const handleDateClick = async (dateStr: string) => {
    setSelectedScheduleId([]);
    if (!selectedActivityId || !accessToken) return;

    try {
      const dayReservations: Reservation[] = await getReservations({
        actId: selectedActivityId,
        date: dateStr,
        token: accessToken,
      });

      if (dayReservations.length === 0) {
        setSelectedScheduleId([]);
        return;
      }

      const uniqScheduleIds: number[] = Array.from(
        new Set(dayReservations.map((r: Reservation) => r.scheduleId)),
      );

      setSelectedScheduleId(uniqScheduleIds);
    } catch (err) {
      console.error('[❌] 날짜별 예약 조회 실패:', err);
      setSelectedScheduleId([]);
    }
  };

  // 선택된 체험에 대한 예약 가져오기
  const { data, refetch } = useReservationsByActivity(
    selectedActivityId,
    month,
  );

  // data가 바뀌면 reservationArray, 캘린더 초기화
  useEffect(() => {
    if (data) {
      setReservationArray(data.allReservations);
      if (data.earliestDate) {
        setYear(data.earliestDate.getFullYear());
        setMonth(data.earliestDate.getMonth());
      }
    }
  }, [data, setYear, setMonth]);

  const handleSelectActivity = (id: string | number, title: string) => {
    setSelectedActivityTitle(title);
    setSelectedActivityId(String(id));
    setSelectedScheduleId([]);
    resetDate();
    resetSelectedDate();
    refetch();
  };

  const updateReservationStatus = (
    reservationId: string,
    newStatus: 'confirmed' | 'declined',
  ) => {
    setReservationArray((prev) =>
      prev.map((res) =>
        res.id === reservationId ? { ...res, status: newStatus } : res,
      ),
    );
  };

  const selectedReservationsOfDate = React.useMemo(() => {
    if (!selectedDate) return [];
    return reservationArray.filter(
      (res) => res.date.split('T')[0] === selectedDate,
    );
  }, [selectedDate, reservationArray]);

  return (
    <div className="flex flex-col items-start py-[1rem]">
      <div className="mb-[2.4rem] w-full">
        <h2 className="txt-18-bold text-gray-950">예약 현황</h2>
        <p className="txt-14-medium mt-1 text-gray-500">
          내 체험의 내역들을 한 눈에 확인할 수 있습니다.
        </p>

        <div className="mt-[1.8rem] md:w-[47.6rem] lg:w-[63.6rem]">
          <Dropdown
            trigger={
              <div
                role="button"
                tabIndex={0}
                onClick={handleDropdownOpen}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handleDropdownOpen();
                }}
                className="shadow-experience-card flex h-[5.4rem] w-full cursor-pointer items-center justify-end rounded-[1rem] border border-gray-100 bg-white text-[1.4rem] text-gray-950 md:text-[1.6rem]"
              >
                <span className="mr-auto pl-[2.6rem]">
                  {selectedActivityTitle}
                </span>
                <ChevronDown className="mr-[2rem] size-[2rem]" />
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
                    className="txt-13-medium block w-full cursor-pointer py-2 text-left hover:bg-gray-50"
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
        </div>
      </div>

      <div className="flex gap-8">
        <div className="md:w-[47.6rem] lg:w-[63.6rem]">
          {selectedActivityId ? (
            <CalendarWithReservations
              reservationArray={reservationArray}
              calendarWidth="w-full md:rounded-[2rem] border border-gray-50 shadow-experience-card"
              dayOfWeekStyle="w-[5.35rem] md:w-[6.8rem] lg:w-[9.143rem]"
              onCellClick={handleDateClick}
              calendarRef={calendarRef}
            >
              {/* 모달 위치 제어하기 위한 div 태그 */}
              <div style={modalPosition}>
                {/* 예약 현황 모달 */}
                <AdaptiveModal extraClassName="shadow-experience-card category-scroll h-[50.8rem] overflow-scroll border border-gray-50 md:h-[39.7rem] lg:h-[44.4rem] lg:w-[32.3rem]">
                  <div className="p-4">
                    {selectedReservationsOfDate.length > 0 ? (
                      <ContentReservation
                        teamId="15-6"
                        activityId={Number(selectedActivityId)}
                        scheduleId={selectedScheduleId}
                        status={'pending'}
                        selectedDate={selectedDate || ''}
                        onStatusChange={updateReservationStatus}
                      />
                    ) : (
                      <EmptyReservation />
                    )}
                  </div>
                </AdaptiveModal>
              </div>
            </CalendarWithReservations>
          ) : (
            <div className="mt-24 flex flex-col items-center justify-center">
              <Image
                src="/images/sad-laptop.svg"
                alt="Sad laptop"
                width={246}
                height={200}
              />
              <p className="mt-14 text-[1.8rem] font-medium text-gray-600">
                등록한 체험을 선택해주세요.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReserveCalendarPage;
