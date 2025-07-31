import { Schedules } from '@/features/activityId/libs/types/activityInfo';
import ArrowButton from '@/shared/components/calendar/components/arrow-button';
import DaysOfMonth from '@/shared/components/calendar/components/days-of-month';
import {
  defaultCellStyle,
  selectedCircle,
} from '@/shared/components/calendar/libs/constants/calendarStyles';
import { monthName } from '@/shared/components/calendar/libs/constants/monthName';
import { formatDateToYMD } from '@/shared/components/calendar/libs/utils/formatDateToYMD';
import { getMonthRange } from '@/shared/components/calendar/libs/utils/getMonthRange';
import { cn } from '@/shared/libs/cn';
import { useCalendarStore } from '@/shared/libs/stores/useCalendarStore';

/**
 * @author 지윤
 * @component
 * 폼 내에서 사용할 캘린더 컴포넌트입니다. 날짜를 선택하거나, 날짜별 스케줄을 확인할 수 있습니다.
 * 모든 프롭은 선택값이며, 필요에 따라 선택적으로 사용해주세요.
 * 스타일 커스터마이징을 위한 프롭을 활용해서 반응형 스타일 등을 추가할수 있습니다.
 *
 * @param {function} [setSelectedId] - 특정 날짜(혹은 셀)의 ID를 선택할 때 호출되는 상태 설정 함수입니다. 날짜 클릭 시 트리거됩니다.
 * @param {Schedules[]} [scheduleArray] - 날짜별 스케줄 정보 배열입니다.
 * @param {string} [calendarWidth] - 캘린더 전체의 가로폭을 조정하는 Tailwind 클래스 문자열입니다. 예:"md:w-[38rem]".
 * @param {string} [dayOfWeekStyle] - 요일(일~토) 셀에 적용할 Tailwind 클래스 문자열입니다. 반응형 스타일도 전달 가능.
 * @param {string} [cellStyle] - 날짜 셀에 적용할 Tailwind 클래스 문자열입니다. 선택 상태, 스케줄 상태 등에 병합되어 사용됩니다.
 * @param {boolean} [isForReservation=false] - 예약 선택 용도로 사용하는지 여부를 나타냅니다. `true`일 경우 스케줄이 있는 날짜가 표시됩니다.(체험상세페이지에서 사용)
 * @param {()=>void} [changeFormValue] - 폼 내부의 value값 업데이트를 selectedDate업데이트 시점과 동시에 하고 싶은 경우
 *
 * @example
 * <CalendarForForm
 *   setSelectedId={setScheduleId}
 *   scheduleArray={data}
 *   calendarWidth="md:w-[38rem] lg:w-[40rem]..."
 *   dayOfWeekStyle="text-gray-500 md:w-[2rem]..."
 *   cellStyle="relative h-[10rem] text-[1.4rem]..."
 *   isForReservation={true}
 * />
 *
 * @note
 * - ✅ `calendarWidth`, `dayOfWeekStyle`, `cellStyle` 프롭을 통해 스타일을 외부에서 커스터마이징할 수 있습니다.
 * - ❗️반응형 클래스(`md:`, `lg:` 등)를 프롭으로 넘길 경우, 클래스 순서나 병합 문제로 스타일이 무시될 수 있습니다.
 *   이 경우에는 임시 `div`에 클래스를 붙여보고, 적용 순서를 정리한 후 복붙하는 방식이 안정적입니다.
 */

const CalendarForForm = ({
  scheduleArray,
  calendarWidth,
  dayOfWeekStyle,
  cellStyle,
  isForReservation = false,
  changeFormValue,
}: {
  scheduleArray?: Schedules[];
  calendarWidth?: string;
  dayOfWeekStyle?: string;
  cellStyle?: string;
  isForReservation?: boolean;
  changeFormValue?: () => void;
}) => {
  const { setDate, setSelectedDate, year, month, date } = useCalendarStore();
  const { thisMonthDays } = getMonthRange(year, month);

  const handleClick = (day: number) => {
    setDate(day);
    setSelectedDate(year, month, day);

    // 스케줄 표시하는 캘린더로 사용중인 경우
    if (scheduleArray && changeFormValue) {
      changeFormValue();
    }
  };

  return (
    <div
      className={cn(
        'flex h-fit w-[32.69rem] flex-wrap bg-white',
        isForReservation && calendarWidth,
      )}
    >
      {/* year, month */}
      <div
        className={cn(
          'flex w-full items-center justify-between bg-white text-[1.6rem] font-medium text-gray-950',
        )}
      >
        <div className={cn('mb-[0.8rem] flex gap-[0.2rem]')}>
          <div>{monthName[month]}</div>
          <div>{year}</div>
        </div>
        <div className="flex gap-[1.2rem]">
          <ArrowButton type="left" />
          <ArrowButton type="right" />
        </div>
      </div>
      {/* 이번달 날짜*/}
      <DaysOfMonth
        inactiveCellStyle={cn('flex-center', defaultCellStyle, cellStyle)}
        dayOfWeekStyle={dayOfWeekStyle}
      >
        {/* children */}
        {thisMonthDays.map((day) => {
          const dateStr = formatDateToYMD(new Date(year, month, day));
          const hasSchedule = scheduleArray?.find(
            (schedule) => schedule.date === dateStr,
          );
          const isSelected = day === date; //--> bg-main 적용

          return (
            <button
              type="button"
              key={day}
              onKeyDown={(e) => e.key === 'Enter' && handleClick(day)}
              onClick={() => handleClick(day)}
              className={cn(
                'flex-center hover:bg-sub',
                defaultCellStyle,
                cellStyle,
                hasSchedule && 'text-main',
                isSelected && 'text-white',
              )}
            >
              {day}
              {isSelected && <div className={cn(selectedCircle, 'bg-main')} />}
              {hasSchedule && (
                <div className={cn(selectedCircle, 'bg-sub -z-2')} />
              )}
            </button>
          );
        })}
      </DaysOfMonth>
    </div>
  );
};

export default CalendarForForm;
