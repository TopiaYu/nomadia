import { defaultCellStyle } from '@/shared/components/calendar/libs/constants/calendarStyles';
import { cn } from '@/shared/libs/cn';

const NotThisMonth = ({
  daysArray,
  cellStyle,
}: {
  daysArray: number[];
  cellStyle?: string;
}) => {
  return daysArray.map((date) => (
    <div
      key={`lead-${date}`}
      className={cn(defaultCellStyle, cellStyle, 'text-gray-300 select-none')}
    >
      {date}
    </div>
  ));
};

export default NotThisMonth;
