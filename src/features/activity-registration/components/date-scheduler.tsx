import Image from 'next/image';
import { useCallback, useEffect } from 'react';

import { TIME_OPTIONS } from '@/features/activity-registration/libs/constants/formOption';
import { validateTimeRange } from '@/features/activity-registration/libs/utils';
import { Schedule } from '@/shared/types/activity';

interface DateSchedulerProps {
  schedules: Schedule[];
  onChange: (schedules: Schedule[]) => void;
  errors?: {
    schedules?: { message?: string };
  };
}

const DateScheduler = ({ schedules, onChange, errors }: DateSchedulerProps) => {
  const getNextHour = useCallback((startTime: string): string => {
    const currentIndex = TIME_OPTIONS.findIndex(
      (option) => option.value === startTime,
    );
    if (currentIndex !== -1 && currentIndex < TIME_OPTIONS.length - 1) {
      return TIME_OPTIONS[currentIndex + 1].value;
    }
    return startTime;
  }, []);

  const addSchedule = useCallback(() => {
    const newSchedule: Schedule = {
      date: '',
      startTime: '',
      endTime: '',
    };
    onChange([...schedules, newSchedule]);
  }, [schedules, onChange]);

  // 스케줄 제거
  const removeSchedule = useCallback(
    (index: number) => {
      if (schedules.length > 1) {
        onChange(schedules.filter((_, i) => i !== index));
      }
    },
    [schedules, onChange],
  );

  const updateSchedule = useCallback(
    (index: number, field: keyof Schedule, value: string) => {
      const updatedSchedules = schedules.map((schedule, i) => {
        if (i === index) {
          const updated = { ...schedule, [field]: value };

          if (field === 'startTime' && value) {
            updated.endTime = getNextHour(value);
          }

          return updated;
        }
        return schedule;
      });

      onChange(updatedSchedules);
    },
    [schedules, onChange, getNextHour],
  );

  useEffect(() => {
    if (schedules.length === 0) {
      addSchedule();
    }
  }, [addSchedule, schedules.length]);

  return (
    <div className="flex flex-col gap-[1.8rem]">
      <span className="mt-[0.6rem] text-[1.6rem] font-bold text-gray-950">
        예약 가능한 시간대
      </span>

      {schedules.map((schedule, index) => {
        const isTimeRangeValid = validateTimeRange(
          schedule.startTime,
          schedule.endTime,
        );

        return (
          <div key={index} className="flex flex-col gap-[1rem]">
            {/* 모바일: 세로 레이아웃, 태블릿 이상: 한 줄 레이아웃 */}
            <div className="flex flex-col gap-[1rem] md:flex md:w-full md:flex-row md:items-end md:gap-[1.2rem]">
              {/* 날짜 입력 */}
              <div className="flex flex-col md:flex-1">
                <span className="mb-[0.4rem] text-[1.4rem] font-medium text-gray-950">
                  날짜 {schedules.length > 1 ? `${index + 1}` : ''}
                </span>
                <input
                  type="date"
                  value={schedule.date}
                  onChange={(e) =>
                    updateSchedule(index, 'date', e.target.value)
                  }
                  className="h-[5.4rem] w-full rounded-[1.2rem] border border-gray-200 px-[1.6rem] text-[1.4rem] focus:outline-0 md:text-[1.6rem]"
                />
              </div>

              {/* 시간 입력 */}
              <div className="flex items-end gap-[1.2rem] md:gap-[1.2rem]">
                {/* 시작 시간 */}
                <div className="flex flex-col">
                  <div className="relative">
                    <select
                      value={schedule.startTime}
                      onChange={(e) =>
                        updateSchedule(index, 'startTime', e.target.value)
                      }
                      className="h-[5.4rem] w-[12.8rem] appearance-none rounded-[1.2rem] border border-gray-200 px-[1.6rem] pr-[4.8rem] text-[1.4rem] focus:outline-0 md:w-[12rem] lg:w-[15rem]"
                    >
                      <option value="" disabled>
                        시작 시간
                      </option>
                      {TIME_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-[1.6rem]">
                      <Image
                        src="/images/icons/arrow.svg"
                        alt="dropdown-arrow"
                        width={16}
                        height={16}
                        className="rotate-270"
                      />
                    </div>
                  </div>
                </div>

                {/* 구분자 */}
                <div className="flex h-[5.4rem] items-center">
                  <span className="text-[1.6rem] font-semibold text-gray-800">
                    -
                  </span>
                </div>

                {/* 종료 시간 */}
                <div className="flex flex-col">
                  <div className="relative">
                    <select
                      value={schedule.endTime}
                      onChange={(e) =>
                        updateSchedule(index, 'endTime', e.target.value)
                      }
                      className={`h-[5.4rem] w-[12.8rem] appearance-none rounded-[1.2rem] border px-[1.6rem] pr-[4.8rem] text-[1.4rem] focus:outline-0 md:w-[12rem] lg:w-[15rem] ${
                        isTimeRangeValid ? 'border-gray-200' : 'border-red-500'
                      }`}
                    >
                      <option value="" disabled>
                        종료 시간
                      </option>
                      {TIME_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-[1.6rem]">
                      <Image
                        src="/images/icons/arrow.svg"
                        alt="dropdown-arrow"
                        width={16}
                        height={16}
                        className="rotate-270"
                      />
                    </div>
                  </div>
                </div>

                {/* 버튼들 */}
                {schedules.length > 1 && index !== schedules.length - 1 && (
                  <button
                    type="button"
                    onClick={() => removeSchedule(index)}
                    className="flex-center mb-[1.2rem] h-[2.8rem] w-[2.8rem] rounded-full bg-gray-50 text-gray-950 hover:bg-gray-200 md:mb-[0.5rem] md:h-[4.2rem] md:w-[4.2rem]"
                  >
                    <span className="text-[1.8rem] font-medium">-</span>
                  </button>
                )}

                {index === schedules.length - 1 && (
                  <button
                    type="button"
                    onClick={addSchedule}
                    className="bg-main flex-center mb-[1.2rem] h-[2.8rem] w-[2.8rem] rounded-full text-white hover:bg-blue-500 md:mb-[0.5rem] md:h-[4.2rem] md:w-[4.2rem]"
                  >
                    <span className="text-[1.8rem] font-medium">+</span>
                  </button>
                )}
              </div>
            </div>

            {/* 시간 유효성 검증 에러 메시지 */}
            {!isTimeRangeValid && schedule.startTime && schedule.endTime && (
              <p className="text-[1.2rem] font-medium text-red-500">
                종료 시간은 시작 시간보다 늦어야 합니다.
              </p>
            )}
          </div>
        );
      })}

      {/* 전체 에러 메시지 */}
      {errors?.schedules && (
        <p className="text-[1.2rem] font-medium text-red-500">
          {errors.schedules.message}
        </p>
      )}
    </div>
  );
};

export default DateScheduler;
