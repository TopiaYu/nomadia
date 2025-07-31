import { ReactNode } from 'react';

import DayOfWeek from '@/shared/components/calendar/components/day-of-week';
import NotThisMonth from '@/shared/components/calendar/components/not-this-month';
import { getMonthRange } from '@/shared/components/calendar/libs/utils/getMonthRange';
import { useCalendarStore } from '@/shared/libs/stores/useCalendarStore';

interface CalendarProps {
  inactiveCellStyle?: string;
  dayOfWeekStyle?: string;
  children?: ReactNode;
}

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
      {/* </div> */}
    </div>
  );
};
export default DaysOfMonth;
