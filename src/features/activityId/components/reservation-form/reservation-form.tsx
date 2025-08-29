'use client';
import { Minus, Plus } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import NeedLoginModal from '@/features/activityId/components/reservation-form/modal-need-login';
import SuccessModal from '@/features/activityId/components/reservation-form/modal-success';
import ResponsiveHeader from '@/features/activityId/components/reservation-form/responsive-header';
import SubmitButton from '@/features/activityId/components/reservation-form/submit-button';
import SubmitInfoMobile from '@/features/activityId/components/reservation-form/submit-info-mobile';
import { reservationFormStyle } from '@/features/activityId/libs/constants/variants';
import { useReservationMutation } from '@/features/activityId/libs/hooks/useReservationMutation';
import { useSchedulesQuery } from '@/features/activityId/libs/hooks/useSchedulesQuery';
import { useSelectedDateChanged } from '@/features/activityId/libs/hooks/useSelectedDateChanged';
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
import { useCalendarStore } from '@/shared/components/calendar/libs/stores/useCalendarStore';
import { formatDateToYMD } from '@/shared/components/calendar/libs/utils/formatDateToYMD';
import { useModalStore } from '@/shared/components/modal/libs/stores/useModalStore';
import { cn } from '@/shared/libs/cn';
import useWindowSize from '@/shared/libs/hooks/useWindowSize';

import ScheduleCalendar from './schedule-calendar';

const ReservationForm = ({
  price,
  activityId,
}: {
  price: number | undefined;
  activityId: number;
}) => {
  const { mutate } = useReservationMutation();
  const { selectedDate, year, month } = useCalendarStore();
  const { appear, openModal, modalName } = useModalStore();
  const { isDesktop, isTablet, isMobile } = useWindowSize();
  const [countUpdateForRender, setCountUpdateForRender] = useState(1);
  const [schedulesInDate, setSchedulesInDate] = useState<TimeSlot[]>([]);
  const [scheduledDate, setScheduledDate] = useState<AvailableScheduleList>([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [nextStep, setNextStep] = useState(false);

  // data fetch
  const { data } = useSchedulesQuery(activityId, {
    year: String(year),
    month: String(month + 1).padStart(2, '0'),
  });
  // useForm
  const {
    control,
    handleSubmit,
    getValues,
    resetField,
    reset,
    formState: { isValid },
  } = useForm<ReservationRequestBody>();

  useSelectedDateChanged({ data, setSchedulesInDate, resetField }); // selectedDate가 바뀌면, 스케줄 선택지 업데이트

  // 지난 날짜 일정 제거
  useEffect(() => {
    if (!data) return;
    const today = formatDateToYMD(new Date());
    const notYetPassed = data?.filter((schedule) => schedule.date >= today);
    setScheduledDate(notYetPassed);
  }, [data, setScheduledDate]);

  // 폼 제출 함수
  const { isLoggedIn } = useAuthStore();
  const submittingRef = useRef(false);
  const onSubmit = (data: ReservationRequestBody) => {
    // 비로그인 상태에서 '예약하기' 클릭한 경우
    if (!isLoggedIn) {
      openModal('need-login');
      return;
    }
    // 아직 앞 예약 요청이 완료되지 않은 경우
    if (submittingRef.current) {
      alert('아직 예약이 완료되지 않았습니다.');
      return;
    } else {
      submittingRef.current = true;
    }
    // 예약 요청
    mutate(
      { activityId, body: data }, // data: { scheduleId, headCount }
      {
        onSuccess: () => {
          addReservation(data.scheduleId); // save id in localStorage
          setSelectedTime('');
          reset(); // 제출 후 폼 초기화
          submittingRef.current = false;
        },
        onError: () => {
          submittingRef.current = false;
        },
      },
    );
  };

  return (
    <>
      {!appear && <hr className="lg:hidden" />}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="shadow-experience-card flex flex-col overflow-auto p-[2.4rem] pb-[1.8rem] md:px-[4rem] lg:!rounded-[3rem] lg:p-[3rem]"
      >
        <ResponsiveHeader
          nextStep={nextStep}
          setNextStep={setNextStep}
          price={price}
        />

        {/* Group - 캘린더 + 인원 수 + 시간 선택 */}
        <div
          className={cn(
            isDesktop ? '' : appear ? 'order-1' : 'order-2',
            isTablet &&
              'md:mb-[4rem] md:flex md:justify-center md:gap-[2.4rem]',
          )}
        >
          {/* 날짜 선택 캘린더(폼 제출 값에는 미반영) */}
          <ScheduleCalendar nextStep={nextStep} scheduledDate={scheduledDate} />
          <div
            className={cn(
              isTablet &&
                'shadow-experience-card mt-[4.8rem] flex w-full flex-col-reverse justify-end rounded-[2.4rem] p-[2.4rem] pt-0',
            )}
          >
            {/* 인원 수 선택 */}
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
                      'mb-[3rem] flex items-center justify-between lg:my-[2.4rem]',
                      !isDesktop && !nextStep && 'hidden md:block',
                      isTablet && 'flex-col items-start',
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
                        'flex h-[4.8rem] w-[14.4rem] items-center justify-between rounded-[1.2rem] border border-gray-100 text-[1.6rem] font-bold text-gray-900 md:w-full lg:h-[4rem] lg:w-[14rem]',
                      )}
                    >
                      <button
                        type="button"
                        className="cursor-pointer p-[1rem]"
                        disabled={value <= 1}
                        onClick={() => {
                          field.onChange(value - 1);
                          setCountUpdateForRender((prev) => prev - 1);
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
                        className="cursor-pointer p-[1rem]"
                        onClick={() => {
                          field.onChange(value + 1);
                          setCountUpdateForRender((prev) => prev + 1);
                        }}
                      >
                        <Plus strokeWidth={1.5} size={20} />
                      </button>
                    </div>
                  </section>
                );
              }}
            />
            {/* 예약 시간 선택 */}
            <Controller
              name="scheduleId"
              control={control}
              rules={{ required: '예약 시간을 선택해 주세요' }}
              render={({ field }) => {
                return (
                  <section
                    className={cn(
                      'mb-[3.6rem] lg:mb-0',
                      isMobile && nextStep && 'hidden',
                    )}
                  >
                    <label
                      htmlFor="resrvationTime"
                      className={cn(
                        reservationFormStyle.labelFont,
                        'mt-[2.4rem] mb-[1.4rem] md:mb-[2rem] lg:mb-[1.4rem]',
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
                                  'flex-center border-sub w-full cursor-pointer rounded-[1.2rem] border-2 py-[1.4rem] text-[1.4rem] text-gray-950',
                                  didIBooked
                                    ? 'cursor-auto bg-gray-50 text-gray-600'
                                    : isSelected
                                      ? 'text-main border-sub-300 bg-sub-50 hover:text-main-600 hover:bg-sub trans-colors-200 font-semibold'
                                      : 'btn-action-white',
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

        {/* 폼 제출 */}
        {isDesktop && <hr className="mt-[3.3rem] mb-[2rem]" />}
        <section
          className={cn(
            isDesktop ? '' : appear ? 'order-2' : 'order-1 pb-[1.6rem]',
            'flex flex-col items-center justify-center lg:flex-row lg:justify-between',
          )}
        >
          {/* 0000원/n명 + 00/00/00 00:00~00:00 */}
          <SubmitInfoMobile
            headCount={getValues('headCount')}
            price={price}
            countUpdateForRender={countUpdateForRender}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
          />
          {/* 예약하기/확인 버튼 */}
          <SubmitButton
            isValid={isValid}
            nextStep={nextStep}
            setNextStep={setNextStep}
          />
        </section>
      </form>

      {/* 모달 */}
      {modalName === 'success' && <SuccessModal />}
      {modalName === 'need-login' && <NeedLoginModal />}
    </>
  );
};
export default ReservationForm;
