'use client';
import { useState } from 'react';

import { mockScheduleData } from '@/features/(test)/mockSchedules';
import CalendarForForm from '@/shared/components/calendar/components/calendar-for-form';
import { useCalendarStore } from '@/shared/libs/stores/useCalendarStore';

const CALENDAR_STYLES = {
  calendarWidth: 'md:w-[35.9rem] lg:w-[35rem]',
  dayOfWeekStyle: 'md:my-[1.36rem] md:w-[5.128rem] lg:my-0 lg:w-[5rem]',
  cellStyle: 'md:my-[1.36rem] md:w-[5.128rem] lg:my-0 lg:w-[5rem]',
} as const;

export default function Page() {
  const [selectedId, setSelectedId] = useState<number>();
  const mockData = mockScheduleData; // mock data
  const { date, selectedDate } = useCalendarStore(); // display data for test

  return (
    <div className="bg-purple-100">
      <div className="text-3xl text-black">date:{date}</div>
      <div className="text-3xl text-black">selectedDate:{selectedDate}</div>
      <div className="text-3xl text-black">selectedId:{selectedId}</div>

      {/* 캘린더 컴포넌트 사용 */}
      <CalendarForForm
        setSelectedId={setSelectedId}
        scheduleArray={mockData}
        isForReservation={true}
        calendarWidth={CALENDAR_STYLES.calendarWidth}
        dayOfWeekStyle={CALENDAR_STYLES.dayOfWeekStyle}
        cellStyle={CALENDAR_STYLES.cellStyle}
      />
    </div>
  );
}
