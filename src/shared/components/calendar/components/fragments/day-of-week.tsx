import { defaultDayOfWeekStyle } from '@/shared/components/calendar/libs/constants/calendarStyles';
import { DAYS } from '@/shared/components/calendar/libs/constants/constants';
import { cn } from '@/shared/libs/cn';

const DayOfWeek = ({ dayOfWeekStyle }: { dayOfWeekStyle?: string }) => {
  return (
    <>
      {DAYS.map((day, i) => (
        <div
          key={`${i}-${day}`}
          className={cn('select-none', defaultDayOfWeekStyle, dayOfWeekStyle)}
        >
          {day}
        </div>
      ))}
    </>
  );
};
export default DayOfWeek;
