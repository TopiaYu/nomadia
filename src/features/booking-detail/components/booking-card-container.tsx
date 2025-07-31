import React from 'react';

import { useModalStore } from '@/shared/libs/stores/useModalStore';

import { Reservation } from '../libs/types/booking';
import BookingCard from './booking-card';

interface BookingCardContainerProps {
  reservation: Reservation;
  showDate?: boolean;
  showDivider?: boolean;
}

/**
 * @description 예약 카드의 비즈니스 로직과 상태 관리를 담당하는 컨테이너 컴포넌트
 *
 * @author 김영현
 *
 * @param reservation 예약 정보
 * @param showDate 날짜 표시 여부
 * @param showDivider 구분선 표시 여부
 */
const BookingCardContainer = ({
  reservation,
  showDate = true,
  showDivider = true,
}: BookingCardContainerProps) => {
  const { isModalOpen, activeReservationId, openModal, closeModal } =
    useModalStore();

  // 현재 카드의 모달인지 확인
  const isCurrentCardModal =
    isModalOpen && activeReservationId === reservation.id;

  // 예약 취소 버튼 클릭 시 현재 예약 ID와 함께 모달 열기
  const handleCancelClick = () => {
    openModal(reservation.id);
  };

  // 후기 작성 버튼 클릭 시 모달 열기
  const handleReviewClick = () => {
    openModal(reservation.id);
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
    />
  );
};

export default BookingCardContainer;
