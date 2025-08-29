import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

import { navigateToActivity } from '@/features/activities/libs/utils/navigation';
import { Activity } from '@/shared/types/activity';

import { PriceDisplay } from './price-display';
import RatingDisplay from './rating-display';

interface ActivityCardProps {
  activity: Activity;
  className?: string;
  isPriority?: boolean;
}

/**
 * 액티비티 카드 컴포넌트
 * @author 김영현
 * @param activity - 액티비티 데이터
 * @param className - 추가 스타일 클래스
 * @param isPriority - 이미지 우선 로딩 여부
 */
export const ActivityCard = ({
  activity,
  className = '',
  isPriority = false,
}: ActivityCardProps) => {
  const router = useRouter();

  // 카드 클릭 시 액티비티 상세 페이지로 이동
  const handleCardClick = () => {
    navigateToActivity(activity.id, router);
  };

  return (
    <div
      className={`shadow-experience-card flex h-[24.3rem] w-full cursor-pointer flex-col overflow-hidden rounded-[0.8rem] bg-white transition-transform hover:scale-[1.02] md:h-[42.3rem] md:rounded-[1.8rem] lg:h-[36.6rem] ${className}`}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
    >
      {/* 이미지 영역 */}
      <div className="relative aspect-[3/4] w-full overflow-hidden md:-mb-[2.6rem] md:aspect-11/10 lg:aspect-[3/4]">
        <Image
          src={activity.bannerImageUrl}
          alt={activity.title}
          fill
          className="rounded-t-[0.8rem] object-cover md:rounded-t-[1.8rem]"
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 50vw, 25vw"
          priority={isPriority}
          quality={isPriority ? 60 : 50}
        />
      </div>

      {/* 콘텐츠 영역 */}
      <div className="flex flex-1 flex-col rounded-[0.8rem] px-[1.7rem] py-[1.2rem] md:z-10 md:rounded-t-[1.8rem] md:bg-white md:px-[3rem] md:py-[2rem] lg:px-[2.8rem] lg:py-[2.4rem]">
        {/* 제목과 별점 그룹 */}
        <div className="mt-[0.5rem] flex flex-col gap-[0.6rem]">
          {/* 제목 */}
          <h3 className="line-clamp-1 text-[1.4rem] leading-[1.8rem] font-semibold text-gray-900 md:overflow-hidden md:text-[1.6rem] md:text-ellipsis md:whitespace-nowrap">
            {activity.title}
          </h3>

          {/* 별점, 리뷰 정보 - 컴포넌트로 분리 */}
          <div className="mt-[0.3rem] flex min-h-[1.8rem] items-center justify-between">
            <RatingDisplay
              activityId={activity.id}
              rating={activity.rating}
              reviewCount={activity.reviewCount}
            />
          </div>
        </div>

        {/* 가격 - 컴포넌트로 분리 */}
        <div className="mt-[2rem]">
          <PriceDisplay price={activity.price} />
        </div>
      </div>
    </div>
  );
};
