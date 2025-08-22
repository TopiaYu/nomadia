import { defaultCellStyle } from '@/shared/components/calendar/libs/constants/calendarStyles';
import { cn } from '@/shared/libs/cn';

interface NotThisMonthProps {
  daysArray: number[];
  cellStyle?: string;
}

const NotThisMonth = ({ daysArray, cellStyle }: NotThisMonthProps) => {
  return daysArray.map((date) => (
    <div
      key={`lead-${date}`}
      className={cn(defaultCellStyle, cellStyle, 'text-gray-100 select-none')}
    >
      {date}
    </div>
  ));
};

export default NotThisMonth;
