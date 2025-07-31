'use client';

import { mockReservationData } from '@/features/(test)/mockReservation';
import CalendarWithReservations from '@/shared/components/calendar/components/calendar-with-reservations';
import { useCalendarStore } from '@/shared/libs/stores/useCalendarStore';

export default function Page() {
  const mockData = mockReservationData; // mock data
  const { selectedDate, date } = useCalendarStore();

  return (
    <div className="bg-sub">
      <div className="text-3xl">selectedDate:{selectedDate}</div>
      <div className="text-3xl">date:{date}</div>

      {/* 캘린더 컴포넌트 사용 */}
      <CalendarWithReservations reservationArray={mockData} />
    </div>
  );
}
