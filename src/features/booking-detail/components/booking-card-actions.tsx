import React from 'react';

import { Reservation } from '../libs/types/booking';

interface BookingCardActionsProps {
  reservation: Reservation;
  onCancelClick?: () => void;
  onReviewClick?: () => void;
}

/**
 * 예약 카드의 액션 버튼들을 렌더링하는 컴포넌트
 * @description 예약 카드의 액션 버튼들을 렌더링하는 컴포넌트
 * @author 김영현
 * @param reservation 예약 정보
 * @param onCancelClick 예약 취소 클릭 시 콜백
 * @param onReviewClick 후기 작성 클릭 시 콜백
 */
const BookingCardActions = ({
  reservation,
  onCancelClick,
  onReviewClick,
}: BookingCardActionsProps) => {
  // 예약 신청 상태일 때 취소 버튼 표시
  if (reservation.status === 'pending') {
    return (
      <button
        type="button"
        className="flex-center btn-action-red w-full cursor-pointer gap-[0.4rem] rounded-[0.8rem] bg-gray-50 p-[1rem] text-[1.4rem] font-medium text-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
        onClick={onCancelClick || (() => {})}
      >
        예약 취소
      </button>
    );
  }

  // 체험 완료 상태일 때 후기 작성 관련 버튼 표시
  if (reservation.status === 'completed') {
    if (!reservation.reviewSubmitted) {
      return (
        <button
          type="button"
          className="flex-center bg-main btn-action-blue w-full cursor-pointer gap-[0.4rem] rounded-[0.8rem] p-[1rem] text-[1.4rem] font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
          onClick={onReviewClick || (() => {})}
        >
          후기 작성
        </button>
      );
    }

    return (
      <div className="flex-center w-full gap-[0.4rem] rounded-[0.8rem] bg-gray-50 p-[1rem] text-[1.4rem] font-medium text-gray-600">
        후기 작성 완료
      </div>
    );
  }

  return null;
};

export default BookingCardActions;
