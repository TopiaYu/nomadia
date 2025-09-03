import Image from 'next/image';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { TIME_OPTIONS } from '@/features/activity-registration/libs/constants/formOption';
import { validateTimeRange } from '@/features/activity-registration/libs/utils';
import {
  getNextHour,
  getUsedStartTimes,
  isFieldTouched,
} from '@/features/activity-registration/libs/utils/schedule-utils';
import {
  getTomorrowDateString,
  isDateAfterTomorrow,
} from '@/shared/libs/utils/parseDate';
import {
  ActivityRegistrationFormData,
  Schedule,
} from '@/shared/types/activity';

interface DateSchedulerProps {
  schedules: Schedule[];
  onChange: (schedules: Schedule[]) => void;
  errors?: {
    schedules?: { message?: string };
  };
  register?: UseFormRegister<ActivityRegistrationFormData>;
  formErrors?: FieldErrors<ActivityRegistrationFormData>;
}

// Context 정의
interface ScheduleContextType {
  schedules: Schedule[];
  touchedFields: { [key: string]: boolean };
  formErrors?: FieldErrors<ActivityRegistrationFormData>;
  register?: UseFormRegister<ActivityRegistrationFormData>;
  onDateChange: (index: number, value: string) => void;
  onTimeChange: (
    index: number,
    field: 'startTime' | 'endTime',
    value: string,
  ) => void;
  onRemove: (index: number) => void;
  onAdd: () => void;
}

const ScheduleContext = createContext<ScheduleContextType | null>(null);

// Context 사용 훅
const useScheduleContext = () => {
  const context = useContext(ScheduleContext);
  if (!context) {
    throw new Error('useScheduleContext must be used within DateScheduler');
  }
  return context;
};

interface ScheduleItemProps {
  schedule: Schedule;
  index: number;
  isLast: boolean;
  canRemove: boolean;
}

/**
 * React Hook Form과 커스텀 핸들러를 통합하는 헬퍼 함수
 * @param register - RHF의 register 함수
 * @param fieldName - 폼 필드 이름
 * @param customHandler - 커스텀 핸들러 함수
 * @returns 통합된 onChange 핸들러
 */
const createUnifiedOnChange = (
  register: UseFormRegister<ActivityRegistrationFormData> | undefined,
  fieldName: string,
  customHandler: (value: string) => void,
) => {
  return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    // 1. RHF의 내부 onChange 호출 (폼 상태 동기화)
    if (register) {
      const registeredField = register(
        fieldName as keyof ActivityRegistrationFormData,
      );
      registeredField?.onChange?.(e);
    }

    // 2. 커스텀 핸들러 호출 (비즈니스 로직 실행)
    customHandler(e.target.value);
  };
};

/**
 * 개별 스케줄 아이템 컴포넌트 (Context 사용으로 props 최소화)
 */
const ScheduleItem = ({
  schedule,
  index,
  isLast,
  canRemove,
}: ScheduleItemProps) => {
  const {
    schedules,
    touchedFields,
    formErrors,
    register,
    onDateChange,
    onTimeChange,
    onRemove,
    onAdd,
  } = useScheduleContext();

  const isTimeRangeValid = validateTimeRange(
    schedule.startTime,
    schedule.endTime,
  );

  const dateFieldTouched = isFieldTouched(touchedFields, index, 'date');
  const startTimeFieldTouched = isFieldTouched(
    touchedFields,
    index,
    'startTime',
  );
  const endTimeFieldTouched = isFieldTouched(touchedFields, index, 'endTime');

  const usedStartTimes = getUsedStartTimes(schedules, schedule.date, index);

  // 통합된 onChange 핸들러들 생성
  const handleDateChange = createUnifiedOnChange(
    register,
    `schedules.${index}.date`,
    (value) => onDateChange(index, value),
  );

  const handleStartTimeChange = createUnifiedOnChange(
    register,
    `schedules.${index}.startTime`,
    (value) => onTimeChange(index, 'startTime', value),
  );

  const handleEndTimeChange = createUnifiedOnChange(
    register,
    `schedules.${index}.endTime`,
    (value) => onTimeChange(index, 'endTime', value),
  );

  return (
    <div className="flex flex-col gap-[1rem]">
      {/* 날짜 및 시간 입력 영역 */}
      <div className="flex flex-col gap-[1rem] md:flex md:w-full md:flex-row md:items-end md:gap-[1.2rem]">
        {/* 날짜 입력 */}
        <div className="flex flex-col md:flex-1">
          <span className="mb-[0.4rem] text-[1.4rem] font-medium text-gray-950">
            날짜 {schedules.length > 1 ? `${index + 1}` : ''}
          </span>
          <input
            type="date"
            {...(register && register(`schedules.${index}.date`))}
            value={schedule.date}
            onChange={handleDateChange}
            min={getTomorrowDateString()}
            className={`h-[5.4rem] w-full rounded-[1.2rem] border px-[1.6rem] text-[1.4rem] focus:outline-0 md:text-[1.6rem] ${
              formErrors?.schedules?.[index]?.date && dateFieldTouched
                ? 'border-red-500'
                : 'border-gray-200'
            }`}
          />
        </div>

        {/* 시간 입력 */}
        <div className="flex items-end gap-[1.2rem] md:gap-[1.2rem]">
          {/* 시작 시간 */}
          <div className="flex flex-col">
            <div className="relative">
              <select
                {...(register && register(`schedules.${index}.startTime`))}
                value={schedule.startTime}
                onChange={handleStartTimeChange}
                className={`h-[5.4rem] w-[12.8rem] appearance-none rounded-[1.2rem] border px-[1.6rem] pr-[4.8rem] text-[1.4rem] focus:outline-0 md:w-[12rem] lg:w-[15rem] ${
                  formErrors?.schedules?.[index]?.startTime &&
                  startTimeFieldTouched
                    ? 'border-red-500'
                    : 'border-gray-200'
                }`}
              >
                <option value="" disabled>
                  시작 시간
                </option>
                {TIME_OPTIONS.map((option) => {
                  const isUsed =
                    schedule.date && usedStartTimes.includes(option.value);
                  return (
                    <option
                      key={option.value}
                      value={option.value}
                      disabled={isUsed || undefined}
                      style={isUsed ? { color: '#ccc' } : {}}
                    >
                      {option.label} {isUsed ? '(이미 선택됨)' : ''}
                    </option>
                  );
                })}
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
            <span className="text-[1.6rem] font-semibold text-gray-800">-</span>
          </div>

          {/* 종료 시간 */}
          <div className="flex flex-col">
            <div className="relative">
              <select
                {...(register && register(`schedules.${index}.endTime`))}
                value={schedule.endTime}
                onChange={handleEndTimeChange}
                className={`h-[5.4rem] w-[12.8rem] appearance-none rounded-[1.2rem] border px-[1.6rem] pr-[4.8rem] text-[1.4rem] focus:outline-0 md:w-[12rem] lg:w-[15rem] ${
                  (formErrors?.schedules?.[index]?.endTime &&
                    endTimeFieldTouched) ||
                  (!isTimeRangeValid &&
                    startTimeFieldTouched &&
                    endTimeFieldTouched)
                    ? 'border-red-500'
                    : 'border-gray-200'
                }`}
              >
                <option value="" disabled>
                  종료 시간
                </option>
                {TIME_OPTIONS.map((option) => {
                  // 시작 시간이 선택된 경우, 종료 시간은 시작 시간보다 큰 값만 표시
                  const isAfterStartTime =
                    !schedule.startTime ||
                    validateTimeRange(schedule.startTime, option.value);

                  return (
                    <option
                      key={option.value}
                      value={option.value}
                      disabled={!isAfterStartTime || undefined}
                      style={!isAfterStartTime ? { color: '#ccc' } : {}}
                    >
                      {option.label}{' '}
                      {!isAfterStartTime ? '(시작 시간 이후만 선택 가능)' : ''}
                    </option>
                  );
                })}
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

          {/* 액션 버튼들 */}
          {canRemove && (
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="flex-center btn-action-gray mb-[1.2rem] h-[2.8rem] w-[2.8rem] rounded-full bg-gray-50 text-gray-950 md:mb-[0.5rem] md:h-[4.2rem] md:w-[4.2rem]"
            >
              <span className="text-[1.8rem] font-medium">-</span>
            </button>
          )}

          {isLast && (
            <button
              type="button"
              onClick={onAdd}
              className="bg-main flex-center btn-action-blue mb-[1.2rem] h-[2.8rem] w-[2.8rem] rounded-full text-white md:mb-[0.5rem] md:h-[4.2rem] md:w-[4.2rem]"
            >
              <span className="text-[1.8rem] font-medium">+</span>
            </button>
          )}
        </div>
      </div>

      {/* 에러 메시지들 */}
      <div className="flex flex-col gap-[0.4rem]">
        {formErrors?.schedules?.[index]?.date && dateFieldTouched && (
          <p className="text-[1.2rem] font-medium text-red-500">
            {formErrors.schedules[index]?.date?.message}
          </p>
        )}
      </div>

      {/* 시간 유효성 검증 에러 메시지 */}
      {!isTimeRangeValid &&
        schedule.startTime &&
        schedule.endTime &&
        startTimeFieldTouched &&
        endTimeFieldTouched && (
          <p className="text-[1.2rem] font-medium text-red-500">
            종료 시간은 시작 시간보다 늦어야 합니다.
          </p>
        )}
    </div>
  );
};

/**
 * 예약 가능한 시간대 스케줄러 컴포넌트
 * @description 예약 가능한 시간대 스케줄러 컴포넌트
 * @author 김영현
 */
const DateScheduler = ({
  schedules,
  onChange,
  errors,
  register,
  formErrors,
}: DateSchedulerProps) => {
  // 사용자 상호작용 추적 상태
  const [isTouched, setIsTouched] = useState(false);
  const [touchedFields, setTouchedFields] = useState<{
    [key: string]: boolean;
  }>({});

  // 스케줄 관리 함수들
  const addSchedule = useCallback(() => {
    const newSchedule: Schedule = { date: '', startTime: '', endTime: '' };
    onChange([...schedules, newSchedule]);
  }, [schedules, onChange]);

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
      setIsTouched(true);

      const fieldKey = `schedules.${index}.${field}`;
      setTouchedFields((prev) => ({ ...prev, [fieldKey]: true }));

      const updatedSchedules = schedules.map((schedule, i) => {
        if (i === index) {
          const updated = { ...schedule, [field]: value };

          // 시작 시간 변경 시 종료 시간 자동 설정
          if (field === 'startTime' && value) {
            updated.endTime = getNextHour(value);
          }

          return updated;
        }
        return schedule;
      });

      onChange(updatedSchedules);
    },
    [schedules, onChange],
  );

  // 날짜 변경 핸들러 (iOS 호환성 개선)
  const handleDateChange = useCallback(
    (index: number, value: string) => {
      if (!isDateAfterTomorrow(value)) return;
      updateSchedule(index, 'date', value);
    },
    [updateSchedule],
  );

  // 시간 변경 핸들러
  const handleTimeChange = useCallback(
    (index: number, field: 'startTime' | 'endTime', value: string) => {
      updateSchedule(index, field, value);
    },
    [updateSchedule],
  );

  // Context 값
  const contextValue: ScheduleContextType = {
    schedules,
    touchedFields,
    formErrors,
    register,
    onDateChange: handleDateChange,
    onTimeChange: handleTimeChange,
    onRemove: removeSchedule,
    onAdd: addSchedule,
  };

  // 초기 스케줄 추가
  useEffect(() => {
    if (schedules.length === 0) {
      addSchedule();
    }
  }, [addSchedule, schedules.length]);

  return (
    <ScheduleContext.Provider value={contextValue}>
      <div className="flex flex-col gap-[1.8rem]">
        <span className="mt-[0.6rem] text-[1.6rem] font-bold text-gray-950">
          예약 가능한 시간대
        </span>

        {schedules.map((schedule, index) => (
          <ScheduleItem
            key={index}
            schedule={schedule}
            index={index}
            isLast={index === schedules.length - 1}
            canRemove={schedules.length > 1 && index !== schedules.length - 1}
          />
        ))}

        {/* 전체 에러 메시지 */}
        {errors?.schedules && isTouched && (
          <p className="mt-[0.8rem] text-[1.4rem] font-medium text-red-500">
            {errors.schedules.message}
          </p>
        )}
      </div>
    </ScheduleContext.Provider>
  );
};

export default DateScheduler;
