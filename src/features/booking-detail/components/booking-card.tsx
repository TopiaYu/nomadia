import Image from 'next/image';
import React from 'react';

import { useModalStore } from '@/shared/components';
import { formatPrice } from '@/shared/libs/utils/formatPrice';
import {
  generateResponsiveSizes,
  optimizeImageQuality,
} from '@/shared/libs/utils/imageOptimization';
import { Reservation } from '@/shared/types/reservation';

import {
  formatBookingTime,
  getStatusColorClass,
  getStatusLabel,
} from '../libs/utils/bookingUtils';
import BookingCardActions from './booking-card-actions';
import BookingModal from './booking-modal';

interface BookingCardProps {
  reservation: Reservation;
  showDate?: boolean;
  showDivider?: boolean;
  isModalOpen?: boolean;
  onCancelClick?: () => void;
  onReviewClick?: () => void;
  onModalClose?: () => void;
  isPriority?: boolean;
}

/**
 * 예약 카드 UI 컴포넌트 - 순수한 렌더링만 담당
 * @description 예약 카드 UI 컴포넌트 - 순수한 렌더링만 담당
 * @author 김영현
 * @param reservation 예약 정보
 * @param showDate 날짜 표시 여부
 * @param showDivider 구분선 표시 여부
 * @param isModalOpen 모달 열림 여부
 * @param onCancelClick 예약 취소 클릭 시 콜백
 * @param onReviewClick 후기 작성 클릭 시 콜백
 * @param onModalClose 모달 닫기 시 콜백
 */
const BookingCard = ({
  reservation,
  showDate = true,
  showDivider = true,
  isModalOpen = false,
  onCancelClick,
  onReviewClick,
  onModalClose,
  isPriority = false,
}: BookingCardProps) => {
  const statusLabel = getStatusLabel(reservation.status);
  const statusColorClass = getStatusColorClass(reservation.status);
  const time = formatBookingTime(reservation.startTime, reservation.endTime);
  const { modalName } = useModalStore();

  return (
    <div className="flex w-full max-w-[50rem] flex-col gap-[1.2rem] lg:max-w-[60rem]">
      {showDate && (
        <div className="text-[1.6rem] font-bold text-gray-800 md:text-[1.8rem]">
          {reservation.date}
        </div>
      )}

      {/* 기존 코드에서 max-w 제거 (상위에서 처리) */}
      <div className="shadow-experience-card relative h-[13.6rem] w-full overflow-hidden rounded-[2.4rem] md:h-[14rem] lg:h-[18.1rem]">
        {/* 배경 이미지 */}
        <div className="absolute top-0 right-0 h-full w-[13.6rem] md:w-[14rem] lg:w-[18.1rem]">
          <Image
            src={reservation.activity.bannerImageUrl}
            alt={reservation.activity.title}
            fill
            quality={optimizeImageQuality(isPriority)}
            priority={isPriority}
            loading={isPriority ? undefined : 'lazy'}
            className="size-[13.6rem] object-cover md:size-[14rem] lg:size-[18.1rem]"
            sizes={generateResponsiveSizes({
              mobile: '100vw',
              tablet: '50vw',
              desktop: '25vw',
            })}
          />
        </div>

        <div className="relative flex h-full w-[70%] flex-col justify-between gap-[0.8rem] rounded-[2.4rem] bg-white px-[2.2rem] py-[2rem] min-[470px]:w-[75%] sm:w-[75%] md:w-[75%]">
          {/* 상단 정보 영역 */}
          <div className="mb-[0.2rem] flex w-full flex-col">
            {/* 상태 뱃지 */}
            <span
              className={`flex-center mb-[0.5rem] w-[7rem] gap-[0.8rem] rounded-full px-[0.8rem] py-[0.4rem] text-[1.3rem] font-bold ${statusColorClass}`}
            >
              {statusLabel}
            </span>

            {/* 타이틀 */}
            <div className="truncate text-[1.4rem] font-bold text-gray-950 lg:text-[1.8rem]">
              {reservation.activity.title}
            </div>
            {/* 시간 */}
            <div className="text-[1.3rem] font-medium text-gray-500 lg:text-[1.6rem]">
              {time}
            </div>
          </div>
          {/* 가격/인원 영역 */}
          <div className="flex items-center gap-[0.4rem]">
            <span className="text-[1.6rem] font-bold text-gray-950 lg:text-[1.8rem]">
              {`₩${formatPrice(reservation.totalPrice)}`}
            </span>
            <span className="text-[1.4rem] font-medium text-gray-400 lg:text-[1.6rem]">
              {reservation.headCount}명
            </span>
          </div>
        </div>
      </div>

      {/* 액션 버튼들 */}
      <BookingCardActions
        reservation={reservation}
        onCancelClick={onCancelClick}
        onReviewClick={onReviewClick}
      />

      {showDivider && <div className="mt-[3rem] h-[1px] w-full bg-gray-50" />}

      {/* 모달 */}
      {modalName === 'delete-review-modal' && (
        <BookingModal
          reservation={reservation}
          statusLabel={statusLabel}
          isOpen={isModalOpen}
          onClose={onModalClose || (() => {})}
        />
      )}
    </div>
  );
};

export default BookingCard;
