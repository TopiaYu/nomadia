'use client';

import ArrowButton from '@/shared/components/calendar/components/arrow-button';
import DaysOfMonth from '@/shared/components/calendar/components/days-of-month';
import { cellStyleForCWR } from '@/shared/components/calendar/libs/constants/calendarStyles';
import { MonthReservations } from '@/shared/components/calendar/libs/types/data';
import { formatDateToYMD } from '@/shared/components/calendar/libs/utils/formatDateToYMD';
import { getMonthRange } from '@/shared/components/calendar/libs/utils/getMonthRange';
import { cn } from '@/shared/libs/cn';
import { useCalendarStore } from '@/shared/libs/stores/useCalendarStore';

/**
 * @author 지윤
 * @component
 * 캘린더 UI를 렌더링하며, 날짜별 예약 현황(완료/승인/예약)을 표시해줍니다.
 *
 *
 * @param {MonthReservations[]} reservationArray - 날짜별 예약 데이터 배열. (특정 날짜에 대한 예약 현황)
 * @param {string} [calendarWidth] - 캘린더 전체의 가로폭을 조정하는 Tailwind 클래스 문자열입니다. (예: "w-[38rem]")
 * @param {string} [dayOfWeekStyle] - 요일(일~토) 셀에 적용할 Tailwind 클래스 문자열입니다. 반응형 스타일도 가능.
 * @param {string} [cellStyle] - 날짜 셀에 적용할 Tailwind 클래스 문자열입니다. 예약 상태나 선택 상태 등과 병합되어 사용됩니다.
 * @param {string} [onCellClick] - 날짜 셀을 클릭했을때 발생하는 이벤트 함수 전달
 *
 * @example
 * <CalendarWithReservations
 *   reservationArray={data}
 *   calendarWidth="md:w-[38rem] lg:w-[40rem]..."
 *   dayOfWeekStyle="text-gray-500 md:w-[2rem]..."
 *   cellStyle="relative h-[10rem] text-[1.4rem]..."
 *   onCellClick={()=>{appearModal}}
 * />
 *
 * @note
 * - ✅ `calendarWidth`, `dayOfWeekStyle`, `cellStyle` 프롭을 통해 스타일을 외부에서 커스터마이징할 수 있습니다.
 * - ❗️반응형 클래스(`md:`, `lg:` 등)를 프롭으로 넘길 경우, 클래스 순서나 병합 문제로 스타일이 무시될 수 있습니다.
 *   이 경우에는 임시 `div`에 클래스를 붙여보고, 적용 순서를 정리한 후 복붙하는 방식이 안정적입니다.
 */

const CalendarWithReservations = ({
  reservationArray,
  calendarWidth,
  dayOfWeekStyle,
  cellStyle,
  onCellClick,
}: {
  reservationArray: MonthReservations[];
  calendarWidth?: string;
  dayOfWeekStyle?: string;
  cellStyle?: string;
  onCellClick?: (dateStr: string) => void;
}) => {
  const { year, month, date, setDate, setSelectedDate } = useCalendarStore();
  const { thisMonthDays } = getMonthRange(year, month);

  const handleClick = (day: number) => {
    setDate(day);
    setSelectedDate(year, month, day);
    if (onCellClick) {
      const dateStr = formatDateToYMD(new Date(year, month, day));
      onCellClick(dateStr);
    }
  };

  return (
    <div>
      {/* 캘린더 전체 틀 */}
      <div
        className={cn(
          'flex-center h-fit w-[37.5rem] flex-wrap bg-white',
          calendarWidth,
        )}
      >
        {/* <- 0000년 00월 -> */}
        <div className="flex-center h-[4.4rem] w-full gap-10 text-[1.6rem] font-bold">
          <ArrowButton type="left" />
          <div>
            {year}년 {month + 1}월
          </div>
          <ArrowButton type="right" />
        </div>

        {/* 날짜 칸 */}
        <DaysOfMonth
          // 이번달 아닌 날짜 칸 스타일(이번달 날짜 스타일과 동일해야함)
          inactiveCellStyle={cn(cellStyleForCWR, cellStyle)}
          // 요일 칸 스타일
          dayOfWeekStyle={cn(
            'mb-[0.4rem] h-[4rem] w-[5.35rem] text-[1.3rem] font-bold',
            dayOfWeekStyle,
          )}
        >
          {thisMonthDays.map((day) => {
            const dateStr = formatDateToYMD(new Date(year, month, day));
            const hasReservation = reservationArray.find(
              (reservation) => reservation.date === dateStr,
            );
            const resStatus = hasReservation?.reservations;
            const isSelected = date === day;

            return (
              <button
                key={day}
                onKeyDown={(e) => e.key === 'Enter' && handleClick(day)}
                onClick={() => handleClick(day)}
                // 이번달 날짜 칸 스타일
                className={cn(
                  !isSelected ? 'hover:bg-sub' : 'hover:bg-orange-100',
                  cellStyleForCWR,
                  cellStyle,
                  isSelected && 'bg-red-100',
                )}
              >
                {day}
                {/* ✅ 날짜별 예약 현황 표시 */}
                {resStatus &&
                  Object.entries(resStatus).map(([key, value]) => {
                    if (value === 0) return null;
                    const isCompleted = key === 'completed';
                    const isConfirmed = key === 'confirmed';
                    const isPending = key === 'pending';

                    return (
                      <div
                        key={key + day}
                        // ✅ 예약 상태 - 반응형 스타일 추가해주세요
                        className={cn(
                          'mt-[0.6rem] w-full rounded-[0.4rem] text-[1.1rem] font-medium',
                          isCompleted && 'bg-gray-50 text-gray-500',
                          isConfirmed && 'bg-orange-100 text-orange-400',
                          isPending && 'bg-sub text-main',
                        )}
                      >
                        <div>
                          {isCompleted && '완료'}
                          {isConfirmed && '승인'}
                          {isPending && '예약'}
                          {value}
                        </div>

                        {/* ✅ 빨간 점 표시 - 반응형 스타일 추가해주세요 */}
                        <div className="absolute top-[0.9rem] left-[3.39rem] size-[0.4rem] rounded-full bg-red-500" />
                      </div>
                    );
                  })}
              </button>
            );
          })}
        </DaysOfMonth>
      </div>
    </div>
  );
};
export default CalendarWithReservations;
