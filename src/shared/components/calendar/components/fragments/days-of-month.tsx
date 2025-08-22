import { ReactNode } from 'react';

import DayOfWeek from '@/shared/components/calendar/components/fragments/day-of-week';
import NotThisMonth from '@/shared/components/calendar/components/fragments/not-this-month';
import { useCalendarStore } from '@/shared/components/calendar/libs/stores/useCalendarStore';
import { getMonthRange } from '@/shared/components/calendar/libs/utils/getMonthRange';

interface CalendarProps {
  inactiveCellStyle?: string;
  dayOfWeekStyle?: string;
  children?: ReactNode;
}

// 요일 + 날짜
const DaysOfMonth = ({
  inactiveCellStyle,
  dayOfWeekStyle,
  children,
}: CalendarProps) => {
  const { month, year } = useCalendarStore();
  const { leadingDays, trailingDays } = getMonthRange(year, month);

  return (
    <div className="grid grid-cols-7">
      {/* 요일(일~토) */}
      <DayOfWeek dayOfWeekStyle={dayOfWeekStyle} />
      {/* 앞 달 날짜*/}
      <NotThisMonth daysArray={leadingDays} cellStyle={inactiveCellStyle} />
      {/* 이번달 날짜*/}
      {children}
      {/* 다음달 날짜*/}
      <NotThisMonth daysArray={trailingDays} cellStyle={inactiveCellStyle} />
    </div>
  );
};
export default DaysOfMonth;
