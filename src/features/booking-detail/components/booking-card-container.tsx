import React from 'react';

import { useScheduleIdStore } from '@/features/activityId/libs/stores/useScheduleIdStore';
import { useReservationIdStore } from '@/features/booking-detail/libs/stores/useReservationIdStore';
import { useModalStore } from '@/shared/components/modal/libs/stores/useModalStore';
import { Reservation } from '@/shared/types/reservation';

import BookingCard from './booking-card';

interface BookingCardContainerProps {
  reservation: Reservation;
  showDate?: boolean;
  showDivider?: boolean;
  isPriority?: boolean;
}

/**
 * 예약 카드의 비즈니스 로직과 상태 관리를 담당하는 컨테이너 컴포넌트
 * @description 예약 카드의 비즈니스 로직과 상태 관리를 담당하는 컨테이너 컴포넌트
 * @author 김영현
 * @param reservation 예약 정보
 * @param showDate 날짜 표시 여부
 * @param showDivider 구분선 표시 여부
 */
const BookingCardContainer = ({
  reservation,
  showDate = true,
  showDivider = true,
  isPriority = false,
}: BookingCardContainerProps) => {
  const { isModalOpen, openModal, closeModal } = useModalStore();
  const { reservationId, setReservationId } = useReservationIdStore();
  const { setScheduleId } = useScheduleIdStore();

  // 현재 카드의 모달인지 확인
  const isCurrentCardModal = isModalOpen && reservationId === reservation.id;

  // 예약 취소 버튼 클릭 시 현재 예약 ID와 함께 모달 열기
  const handleCancelClick = () => {
    setReservationId(reservation.id);
    setScheduleId(reservation.scheduleId);
    openModal();
  };

  // 후기 작성 버튼 클릭 시 모달 열기
  const handleReviewClick = () => {
    setReservationId(reservation.id);
    openModal();
  };

  return (
    <BookingCard
      reservation={reservation}
      showDate={showDate}
      showDivider={showDivider}
      isModalOpen={isCurrentCardModal}
      onCancelClick={handleCancelClick}
      onReviewClick={handleReviewClick}
      onModalClose={closeModal}
      isPriority={isPriority}
    />
  );
};

export default BookingCardContainer;
