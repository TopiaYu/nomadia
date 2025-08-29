import { useEffect } from 'react';
import { UseFormResetField } from 'react-hook-form';

import {
  AvailableScheduleList,
  TimeSlot,
} from '@/features/activityId/libs/types/availableSchedule';
import { ReservationRequestBody } from '@/features/activityId/libs/types/reservationType';
import { useCalendarStore } from '@/shared/components/calendar/libs/stores/useCalendarStore';

interface UseSelectedDateChangedProps {
  data: AvailableScheduleList | undefined;
  setSchedulesInDate: React.Dispatch<React.SetStateAction<TimeSlot[]>>;
  resetField: UseFormResetField<ReservationRequestBody>;
}

// selectedDate가 바뀌면, 이전에 선택한 스케줄을 취소함.
// 새로 선택한 날짜에 스케줄이 존재하면 TimeSlot선택지를 보여주기 위해 schedulesInDate 업데이트
export const useSelectedDateChanged = ({
  data,
  setSchedulesInDate,
  resetField,
}: UseSelectedDateChangedProps) => {
  const { selectedDate } = useCalendarStore();
  useEffect(() => {
    resetField('scheduleId');
    const match = data?.filter((schedule) => schedule.date === selectedDate);
    const schedules = match?.flatMap((schedule) => schedule.times);
    if (schedules) {
      setSchedulesInDate(schedules);
    } else {
      setSchedulesInDate([]);
    }
  }, [selectedDate, data, resetField, setSchedulesInDate]);
};
