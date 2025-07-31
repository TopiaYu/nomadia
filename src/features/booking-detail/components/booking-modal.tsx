import { X } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';

import Modal from '@/shared/components/modal/components';
import { useModalStore } from '@/shared/libs/stores/useModalStore';

import { useCancelMutation } from '../libs/hooks/useCancelMutation';
import { usePostReviewMutation } from '../libs/hooks/usePostReviewMutation';
import { Reservation } from '../libs/types/booking';
import StarRating from './star-rating';

interface BookingModalProps {
  reservation: Reservation;
  statusLabel: string;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * @description 예약 관련 모달을 관리하는 컴포넌트 (예약 취소, 리뷰 작성(custom 모달))
 *
 * @author 김영현
 * @param reservation 예약 정보
 * @param statusLabel 예약 상태
 * @param isOpen 모달 열림 여부
 * @param onClose 모달 닫기 함수
 */
const BookingModal = ({
  reservation,
  statusLabel,
  isOpen,
}: BookingModalProps) => {
  const { closeModal } = useModalStore();

  // 예약 취소 mutation
  const { mutate: cancelBooking, isPending } = useCancelMutation();

  // 리뷰 작성 mutation
  const { mutate: postReview, isPending: isPostingReview } =
    usePostReviewMutation();

  // 리뷰 입력 상태 관리
  const [review, setReview] = useState('');
  const [reviewRating, setReviewRating] = useState(0);
  const maxLength = 100;

  // 리뷰 입력 핸들러
  const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value.slice(0, maxLength);
    setReview(value);
  };

  // 리뷰 작성 취소 핸들러
  const handleQuitClick = () => {
    setReview('');
    setReviewRating(0);
    closeModal();
  };

  // 예약 취소 모달에서 확인 버튼 클릭 시
  const handleModalCancelBooking = () => {
    cancelBooking(reservation.id);
    closeModal();
  };

  // 리뷰 작성 모달에서 작성하기 버튼 클릭 시
  const handleModalPostReview = () => {
    if (reviewRating === 0) {
      toast.error('별점을 선택해주세요.');
      return;
    }

    if (review.trim().length === 0) {
      toast.error('리뷰를 입력해주세요.');
      return;
    }

    postReview({
      reservationId: reservation.id,
      rating: reviewRating,
      content: review,
    });
    closeModal();
  };

  if (!isOpen) return null;

  return (
    <Modal
      type={statusLabel === '예약 신청' ? 'warning' : 'custom'}
      extraClassName={
        statusLabel === '체험 완료'
          ? 'w-full h-[47.9rem] mx-[2.4rem] md:w-[50rem] md:h-[54.9rem]'
          : ''
      }
    >
      {statusLabel === '예약 신청' ? (
        <>
          <Modal.Header>예약을 취소하시겠어요?</Modal.Header>
          <div className="flex gap-[0.8rem] md:gap-[1.2rem]">
            <Modal.Button color="white" ariaLabel="취소" onClick={closeModal}>
              아니오
            </Modal.Button>
            <Modal.Button
              color="blue"
              ariaLabel="확인"
              onClick={handleModalCancelBooking}
            >
              {isPending ? '처리 중...' : '취소하기'}
            </Modal.Button>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-end">
            <X
              className="text-gray-850 size-[2rem] cursor-pointer"
              onClick={handleQuitClick}
            />
          </div>
          <div className="flex-center mb-[2rem] flex-col gap-[0.6rem]">
            <p className="truncate text-[1.6rem] font-bold text-gray-950 md:text-[1.8rem]">
              {reservation.activity.title}
            </p>
            <p className="text-[1.3rem] font-medium text-gray-500 md:text-[1.4rem]">
              {`${reservation.date} / ${reservation.startTime} - ${reservation.endTime} (${reservation.headCount}명)`}
            </p>
            <StarRating onRatingChange={setReviewRating} />
          </div>
          <div className="flex flex-col gap-[0.8rem]">
            <Modal.Header>
              <span className="text-[1.8rem] font-bold text-gray-950">
                소중한 경험을 들려주세요
              </span>
            </Modal.Header>
            <div className="mb-[1rem] flex w-full flex-col gap-[0.8rem]">
              <textarea
                className="focus:border-main shadow-experience-card h-[17.9rem] w-full resize-none rounded-[1.2rem] border border-gray-200 bg-white p-[2rem] text-[1.6rem] text-gray-800 outline-none placeholder:text-gray-400"
                placeholder="체험에서 느낀 경험을 자유롭게 남겨주세요"
                value={review}
                onChange={handleReviewChange}
                maxLength={maxLength}
              ></textarea>
              <span className="text-right text-[1.3rem] font-medium text-gray-600 md:text-[1.4rem]">
                {review.length}/{maxLength}
              </span>
            </div>
          </div>
          <div>
            <Modal.Button
              color="blue"
              ariaLabel="작성하기 버튼"
              onClick={isPostingReview ? undefined : handleModalPostReview}
            >
              {isPostingReview ? '작성 중...' : '작성하기'}
            </Modal.Button>
          </div>
        </>
      )}
    </Modal>
  );
};

export default BookingModal;
