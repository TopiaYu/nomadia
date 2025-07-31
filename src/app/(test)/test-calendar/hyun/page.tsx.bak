'use client';

import CalendarForForm from '@/shared/components/calendar/components/calendar-for-form';
import { useCalendarStore } from '@/shared/libs/stores/useCalendarStore';

export default function Page() {
  const { date, selectedDate } = useCalendarStore();

  return (
    <div className="bg-green-100">
      <div className="text-3xl text-black">date:{date}</div>
      <div className="text-3xl text-black">selectedDate:{selectedDate}</div>

      {/* 캘린더 컴포넌트 사용 */}
      <CalendarForForm />
    </div>
  );
}
