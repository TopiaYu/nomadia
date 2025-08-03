'use client';
import axios from 'axios';
import { ArrowLeft, Minus, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { reservationFormStyle } from '@/features/activityId/libs/constants/variants';
import { useIsTablet } from '@/features/activityId/libs/hooks/useIsTablet';
import { useReservationMutation } from '@/features/activityId/libs/hooks/useReservationMutation';
import { useSchedulesQuery } from '@/features/activityId/libs/hooks/useSchedulesQuery';
import {
  AvailableScheduleList,
  TimeSlot,
} from '@/features/activityId/libs/types/availableSchedule';
import { ReservationRequestBody } from '@/features/activityId/libs/types/reservationType';
import {
  addReservation,
  getMyResertvation,
} from '@/features/activityId/libs/utils/addReservation';
import { useAuthStore } from '@/features/auth/stores/useAuthStore';
import CalendarForForm from '@/shared/components/calendar/components/calendar-for-form';
import { formatDateToYMD } from '@/shared/components/calendar/libs/utils/formatDateToYMD';
import Modal from '@/shared/components/modal/components';
import SecondModal from '@/shared/components/modal/components/second-modal/second-modal';
import { cn } from '@/shared/libs/cn';
import { useCalendarStore } from '@/shared/libs/stores/useCalendarStore';
import { useModalStore } from '@/shared/libs/stores/useModalStore';
import { formatPrice } from '@/shared/libs/utils/formatPrice';

const CALENDAR_STYLES = {
  calendarWidth: 'md:w-[35.9rem] lg:w-[35rem]',
  dayOfWeekStyle: 'md:my-[1.36rem] md:w-[5.128rem] lg:my-0 lg:w-[5rem]',
  cellStyle: 'md:my-[1.36rem] md:w-[5.128rem] lg:my-0 lg:w-[5rem]',
} as const;

const ReservationForm = ({
  price,
  activityId,
}: {
  price: number | undefined;
  activityId: number;
}) => {
  const {
    selectedDate,
    resetSelectedDate,
    year,
    month,
    setMonth,
    setYear,
    resetDate,
  } = useCalendarStore();
  const {
    appear,
    disappearModal,
    appearModal,
    isDesktop,
    secondModalName,
    closeSecondModal,
    openSecondModal,
  } = useModalStore();
  const [schedulesInDate, setSchedulesInDate] = useState<
    TimeSlot[] | undefined
  >([]);
  const [scheduledDate, setScheduledDate] = useState<AvailableScheduleList>();
  const [selectedTime, setSelectedTime] = useState('');
  const [nextStep, setNextStep] = useState(false);
  const isTablet = useIsTablet();
  const { isLoggedIn } = useAuthStore();
  const { mutate } = useReservationMutation(activityId);
  const { data, isLoading, error } = useSchedulesQuery(activityId, {
    year: String(year),
    month: String(month + 1).padStart(2, '0'),
  });

  // 리액트훅폼
  const {
    control,
    handleSubmit,
    getValues,
    resetField,
    reset,
    formState: { isValid },
  } = useForm<ReservationRequestBody>();

  // 지난 날짜의 일정을 걸러냄 //오늘까지는 포함되는지 테스트 필요
  useEffect(() => {
    if (!data || isLoading || error) return;

    const today = formatDateToYMD(new Date());
    const notYetPassed = data?.filter((schedule) => schedule.date >= today);
    setScheduledDate(notYetPassed);
    console.log(today);
  }, [data, isLoading, error]);

  // 선택한 날짜가 바뀌면, 이전에 선택한 스케줄을 취소함. 새로운 날짜에 스케줄이 존재하면 TimeSlot선택지를 보여주기 위해 schedulesInDate 업데이트
  useEffect(() => {
    resetField('scheduleId');
    const match = data?.filter((schedule) => schedule.date === selectedDate);
    const schedules = match?.flatMap((schedule) => schedule.times);
    setSchedulesInDate(schedules);
  }, [selectedDate, data, resetField]);

  // useEffect cleanup --> 컴포넌트 언마운트 시 캘린더 리셋
  useEffect(() => {
    return () => {
      const today = new Date();
      setYear(today.getFullYear());
      setMonth(today.getMonth());
      resetDate();
    };
  }, [setMonth, setYear, resetDate]);

  return (
    <>
      {/* 캘린더 컴포넌트 사용 */}
      {/* 🐛 폼 제출에는 selectedDate값이 필요가 없다. 일단은 컨트롤러로 필드값을 업데이트 하고 있지만, 그냥 캘린더로만 사용해도 문제 없을거 같다. */}
      {/* 🐛 handleSubmit 제출 전에, 밸류를 Number로 형변환 체크 필요함 */}
      {!appear && <hr className="lg:hidden" />}
      <div className="hidden">{activityId}</div>
      <form
        // data: { scheduleId, headCount }
        onSubmit={handleSubmit((data) => {
          console.log('제출', data, typeof getValues('scheduleId'));
          mutate(data, {
            onSuccess: (res) => {
              console.log('✅ 예약 성공:', res);
              openSecondModal(undefined, 'success');
              addReservation(data.scheduleId); //save id in localStorage
              resetSelectedDate(); //🐛이거 해도 제출후 다시 열어보면, 이전 선택 날짜가 칠해져있음...:스타일링은 date 담당이기 떄문이었다.
              resetDate(); //이거까지 해야함
              setSelectedTime('');
              reset(); // 제출 후 폼 초기화
            },
            onError: (err) => {
              console.error('❌ 예약 실패:', err);
              if (axios.isAxiosError(err)) {
                const errorMessage = err.response?.data.message;
                toast.error(`<예약 실패>❗️ ${errorMessage}`);
              }
            },
          });
        })}
        className="shadow-experience-card flex flex-col overflow-auto p-[2.4rem] pb-[1.8rem] md:px-[3rem] lg:!rounded-[3rem] lg:p-[3rem]"
      >
        {/* 모바일 - 스텝2(인원 체크) */}
        {!isDesktop && !isTablet && appear && nextStep && (
          <>
            <button
              className="flex items-center gap-[0.6rem]"
              onClick={() => setNextStep(false)}
            >
              <ArrowLeft />
              <h2 className="text-[1.8rem] font-bold text-gray-950">인원</h2>
            </button>
            <p className="mt-[0.8rem] mb-[2rem] text-[1.6rem] text-gray-900">
              예약할 인원을 선택해주세요
            </p>
          </>
        )}
        {/* 데스크탑 - 캘린더 상단에 '0000/인' 표시 */}
        {isDesktop && price && (
          <p className="mb-[2.4rem] flex items-center gap-[0.6rem]">
            <span className="inline-block text-[1.8rem] leading-none font-bold text-gray-950">
              ₩{formatPrice(price)}
            </span>
            <span className="inline-block text-[1.6rem] leading-none text-gray-600">
              / 인
            </span>
          </p>
        )}

        {/* Group - 캘린더 + 인원 수 + 시간 선택 */}
        <div
          className={cn(
            isDesktop ? '' : appear ? 'order-1' : 'order-2',
            isTablet &&
              'md:mb-[4rem] md:flex md:justify-center md:gap-[2.4rem]',
          )}
        >
          {/* 날짜 선택 캘린더(폼 제출 값에는 미반영) */}
          <section
            className={cn(!isDesktop && !isTablet && nextStep && 'hidden')}
          >
            <h2 className="mb-[0.8rem] text-[1.8rem] font-bold text-gray-950 md:mb-[2.4rem] lg:mb-[0.8rem]">
              날짜
            </h2>
            <div className="flex-center">
              <CalendarForForm
                scheduleArray={scheduledDate}
                isForReservation={true}
                calendarWidth={CALENDAR_STYLES.calendarWidth}
                dayOfWeekStyle={CALENDAR_STYLES.dayOfWeekStyle}
                cellStyle={CALENDAR_STYLES.cellStyle}
              />
            </div>
          </section>

          {/* Group - 인원 수 + 시간 선택 */}
          <div
            className={cn(
              isTablet &&
                'shadow-experience-card mt-[4.8rem] flex w-full flex-col-reverse justify-end rounded-[2.4rem] p-[2.4rem] pt-0',
            )}
          >
            <Controller
              name="headCount"
              control={control}
              defaultValue={1}
              rules={{ min: 1 }}
              render={({ field }) => {
                const value = Number(field.value);
                return (
                  <section
                    className={cn(
                      'mb-[3rem] flex items-center justify-between',
                      'lg:my-[2.4rem]',
                      !isDesktop && !nextStep && 'hidden md:block',
                    )}
                  >
                    <label
                      htmlFor="headCount"
                      className={cn(reservationFormStyle.labelFont, 'lg:mb-0')}
                    >
                      참여 인원 수
                    </label>
                    <div
                      className={cn(
                        'flex h-[4.8rem] w-[14.4rem] items-center justify-between rounded-[1.2rem] border border-gray-100 text-[1.6rem] font-bold text-gray-900 md:w-full',
                        'lg:h-[4rem] lg:w-[14rem]',
                      )}
                    >
                      <button
                        type="button"
                        className="p-[1rem]"
                        disabled={value <= 1}
                        onClick={() => {
                          field.onChange(value - 1);
                        }}
                      >
                        <Minus strokeWidth={1.5} size={20} />
                      </button>
                      <input
                        id="headCount"
                        {...field}
                        value={field.value}
                        readOnly
                        className="hidden"
                      />
                      <p className="w-[4rem] text-center">
                        {getValues('headCount')}
                      </p>
                      <button
                        type="button"
                        className="p-[1rem]"
                        onClick={() => {
                          field.onChange(value + 1);
                        }}
                      >
                        <Plus strokeWidth={1.5} size={20} />
                      </button>
                    </div>
                  </section>
                );
              }}
            />
            {/* 예약 시간 선택지 */}
            <Controller
              name="scheduleId"
              control={control}
              rules={{ required: '예약 시간을 선택해 주세요' }}
              render={({ field }) => {
                return (
                  <section
                    className={cn(
                      'mb-[3.6rem]',
                      !isDesktop && !isTablet && nextStep && 'hidden',
                      'lg:mb-0',
                    )}
                  >
                    <label
                      htmlFor="resrvationTime"
                      className={cn(
                        reservationFormStyle.labelFont,
                        'mt-[2.4rem] mb-[1.4rem] md:mb-[2rem]',
                        'lg:mb-[1.4rem]',
                      )}
                    >
                      예약 가능한 시간
                    </label>
                    <div>
                      {schedulesInDate?.length === 0 && (
                        <p className="text-[1.6rem] text-gray-900">
                          예약 가능한 날짜를 선택해주세요
                        </p>
                      )}
                      <div className="flex flex-col gap-[1.2rem]">
                        {schedulesInDate?.map((schedule) => {
                          const isSelected = field.value === schedule?.id;
                          const didIBooked = getMyResertvation().find(
                            (id) => id === schedule?.id,
                          );
                          return (
                            <div key={schedule?.id}>
                              <button
                                type="button"
                                onClick={() => {
                                  if (didIBooked) return;
                                  field.onChange(
                                    isSelected ? '' : schedule?.id,
                                  );
                                  if (!isSelected) {
                                    setSelectedTime(
                                      `${schedule?.startTime}~${schedule?.endTime}`,
                                    );
                                  } else setSelectedTime('');
                                }}
                                className={cn(
                                  'flex-center border-sub w-full rounded-[1.2rem] border-2 py-[1.4rem] text-[1.4rem] text-gray-950',
                                  isSelected &&
                                    'text-main border-sub-300 bg-sub',
                                  didIBooked && 'bg-gray-50 text-gray-600',
                                )}
                              >
                                {didIBooked ? (
                                  '내가 예약한 체험'
                                ) : (
                                  <>
                                    {schedule?.startTime} ~ {schedule?.endTime}
                                  </>
                                )}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </section>
                );
              }}
            />
          </div>
        </div>

        {isDesktop && <hr className="mt-[3.3rem] mb-[2rem]" />}
        {/* Group - sm,md: 가격,선택한 값 표시 + 확인 버튼 */}
        <section
          className={cn(
            isDesktop ? '' : appear ? 'order-2' : 'order-1 pb-[1.6rem]',
            'flex flex-col items-center justify-center',
            'lg:flex-row lg:justify-between',
          )}
        >
          {/* Group - 0000원/n명 + 00/00/00 00:00~00:00 */}
          <div
            className={cn(
              'flex h-[2.4rem] w-full flex-wrap items-center justify-between',
              'lg:h-[5rem] lg:w-fit',
              appear ? 'hidden' : '',
            )}
          >
            {/* 가격/n명 */}
            <p className="flex-center gap-[0.6rem]">
              {isDesktop && (
                <span className="text-[2rem] text-gray-700">총 합계</span>
              )}
              {price && (
                <span className="inline-block text-[1.8rem] leading-none font-bold text-gray-950">
                  ₩{formatPrice(price * getValues('headCount'))}
                </span>
              )}
              {!isDesktop && (
                <span className="inline-block text-[1.6rem] leading-none text-gray-800">
                  / {getValues('headCount')}명
                </span>
              )}
            </p>
            {/* 00/00/00 00:00~00:00 */}
            <button
              className="text-main text-[1.6rem] font-bold underline underline-offset-4 lg:hidden"
              onClick={() => !appear && appearModal()}
              type="button"
            >
              {selectedDate} {selectedTime}
              {/* 날짜 포맷해야함 formatToYYMMDD */}
            </button>
          </div>

          {/* 예약하기/확인 버튼 */}
          <button
            disabled={!isLoggedIn}
            type="submit"
            className={cn(
              isValid && isLoggedIn ? 'bg-main' : 'bg-gray-200',
              appear && !isValid ? 'bg-gray-300' : '',
              'mt-[1.2rem] w-full rounded-[1.4rem] py-[1.4rem] text-[1.6rem] font-bold text-white',
              'h-[5rem] lg:mt-0 lg:w-[13.5rem]',
              'z-100',
            )}
            onClick={(e) => {
              if (!isDesktop) {
                if (!appear && !isValid) {
                  appearModal();
                }
                if (!isTablet) {
                  if (appear && !nextStep) {
                    setNextStep(true);
                    e.preventDefault();
                  }
                  if (appear && nextStep) {
                    disappearModal();
                    setNextStep(false);
                    e.preventDefault();
                  }
                } else {
                  if (appear) {
                    disappearModal();
                    e.preventDefault();
                  }
                }
              }
            }}
          >
            {isDesktop ? '예약하기' : !appear ? '예약하기' : '확인'}
          </button>
        </section>
      </form>
      {secondModalName === 'success' && (
        <SecondModal type="confirm" extraClassName="md:pb-[1rem]">
          <Modal.Header>예약이 완료되었습니다.</Modal.Header>
          <div className="w-[18rem] md:w-[20rem]">
            <Modal.Button
              color="blue"
              ariaLabel="확인"
              onClick={closeSecondModal}
            >
              확인
            </Modal.Button>
          </div>
        </SecondModal>
      )}
    </>
  );
};
export default ReservationForm;
