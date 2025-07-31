import { Star } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

import { formatPrice } from '@/shared/libs/utils/formatPrice';
import { Activity } from '@/shared/types/activity';

interface ActivityCardProps {
  activity: Activity;
  className?: string;
}

/**
 * 액티비티 카드 컴포넌트
 * @author 김영현
 * @param activity - 액티비티 데이터
 * @param className - 추가 스타일 클래스
 */
export const ActivityCard = ({
  activity,
  className = '',
}: ActivityCardProps) => {
  const router = useRouter();

  // 카드 클릭 시 액티비티 상세 페이지로 이동
  const handleCardClick = () => {
    router.push(`/activities/${activity.id}`);
  };

  return (
    <div
      className={`shadow-experience-card flex h-[24.3rem] w-full cursor-pointer flex-col overflow-hidden rounded-[1.2rem] bg-white transition-transform hover:scale-[1.02] md:h-[42.3rem] md:rounded-[2.6rem] lg:h-[36.6rem] ${className}`}
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
          className="rounded-t-3xl object-cover md:rounded-t-[2.6rem]"
          sizes="(max-width: 768px) 50vw, 25vw"
          priority={false}
        />
      </div>

      {/* 콘텐츠 영역 */}
      <div className="flex flex-1 flex-col rounded-[1.2rem] px-[1.7rem] py-[1.2rem] md:z-10 md:rounded-t-[2.6rem] md:bg-white md:px-[3rem] md:py-[2rem] lg:px-[2.8rem] lg:py-[2.4rem]">
        {/* 제목과 별점 그룹 */}
        <div className="mt-[0.5rem] flex flex-col gap-[0.6rem]">
          {/* 제목 */}
          <h3 className="line-clamp-1 text-[1.4rem] leading-[1.8rem] font-semibold text-gray-900 md:overflow-hidden md:text-[1.8rem] md:text-ellipsis md:whitespace-nowrap">
            {activity.title}
          </h3>
          {/* 별점과 리뷰 */}
          <div className="flex items-center gap-[0.2rem] md:gap-[0.3rem]">
            <Star className="text-yellow h-[1.25rem] w-[1.25rem] md:h-[2rem] md:w-[2rem]" />
            <span className="text-[1.2rem] font-medium text-gray-950 md:text-[1.4rem]">
              {activity.rating}
            </span>
            <span className="text-[1.2rem] font-medium text-gray-400 md:text-[1.4rem]">
              ({activity.reviewCount})
            </span>
          </div>
        </div>

        {/* 가격 */}
        <div className="mt-[2rem] flex items-baseline gap-1">
          <span className="text-[1.5rem] leading-[1.8rem] font-bold text-gray-950 md:text-[1.8rem]">
            ₩ {formatPrice(activity.price)}
          </span>
          <span className="text-[1.2rem] font-semibold text-gray-400 md:text-[1.6rem]">
            /인
          </span>
        </div>
      </div>
    </div>
  );
};
