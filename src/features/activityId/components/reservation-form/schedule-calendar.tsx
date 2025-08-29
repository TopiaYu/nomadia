import { calendarStyle } from '@/features/activityId/libs/constants/variants';
import { AvailableScheduleList } from '@/features/activityId/libs/types/availableSchedule';
import CalendarForForm from '@/shared/components/calendar/components/calendar-for-form';
import { cn } from '@/shared/libs/cn';
import useWindowSize from '@/shared/libs/hooks/useWindowSize';

const ScheduleCalendar = ({
  nextStep,
  scheduledDate,
}: {
  nextStep: boolean;
  scheduledDate: AvailableScheduleList;
}) => {
  const { isMobile } = useWindowSize();

  return (
    <section className={cn(isMobile && nextStep && 'hidden')}>
      <h2 className="mb-[0.8rem] text-[1.8rem] font-bold text-gray-950 md:mb-[2.4rem] lg:mb-[0.8rem]">
        날짜
      </h2>
      <div className="flex-center">
        <CalendarForForm
          scheduleArray={scheduledDate}
          calendarWidth={calendarStyle.calendarWidth}
          dayOfWeekStyle={calendarStyle.dayOfWeekStyle}
          cellStyle={calendarStyle.cellStyle}
        />
      </div>
    </section>
  );
};
export default ScheduleCalendar;
