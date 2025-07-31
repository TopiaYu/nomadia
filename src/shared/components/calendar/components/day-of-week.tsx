import { defaultDayOfWeekStyle } from '@/shared/components/calendar/libs/constants/calendarStyles';
import { cn } from '@/shared/libs/cn';

const DayOfWeek = ({ dayOfWeekStyle }: { dayOfWeekStyle?: string }) => {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  return (
    <>
      {days.map((day, i) => (
        <div
          key={`${i}-${day}`}
          className={cn(defaultDayOfWeekStyle, dayOfWeekStyle)}
        >
          {day}
        </div>
      ))}
    </>
  );
};
export default DayOfWeek;
