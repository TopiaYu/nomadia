'use client';

import 'swiper/css';
import 'swiper/css/navigation';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ActivityCard } from '@/features/activities/components/activity-card';
import { ErrorMessage } from '@/shared/components/error-message/error-message';
import LoadingSpinner from '@/shared/components/loading-spinner/loading-spinner';
import useActivity from '@/shared/libs/hooks/useActivityQuery';

/**
 * 인기 체험 컴포넌트
 * @author 김영현
 * @returns 인기 체험 컴포넌트
 */
const BestActivities = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  const { data, isLoading, isError } = useActivity({
    sort: 'most_reviewed',
    page: 1,
    size: 8,
  });

  const activities = data?.activities ?? [];

  const handlePrevSlide = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNextSlide = () => {
    swiperRef.current?.slideNext();
  };

  return (
    <div className="mt-[4rem] px-[2.4rem] md:mt-[6rem] md:px-[3rem] lg:px-[4rem]">
      {/* 헤더: 항상 노출 */}
      <div className="mb-[4rem] flex items-center justify-between md:mb-[1.6rem] lg:mb-[2rem]">
        <p className="flex items-center gap-2 text-[1.8rem] font-bold text-gray-950 md:text-[3.2rem]">
          <span role="img" aria-label="fire">
            🔥
          </span>{' '}
          인기 체험
        </p>
        <div className="flex gap-2">
          <button
            onClick={handlePrevSlide}
            className="hover:bg-sub-300 border-sub rounded-full border-1 bg-white p-2 transition-colors"
            aria-label="이전"
          >
            <ChevronLeft className="text-main h-[1.8rem] w-[1.8rem] md:h-[2.8rem] md:w-[2.8rem]" />
          </button>
          <button
            onClick={handleNextSlide}
            className="hover:bg-sub-300 border-sub rounded-full border-1 bg-white p-2 transition-colors"
            aria-label="다음"
          >
            <ChevronRight className="text-main h-[1.8rem] w-[1.8rem] md:h-[2.8rem] md:w-[2.8rem]" />
          </button>
        </div>
      </div>
      {/* 컨텐츠: 로딩/에러/데이터 분기 */}
      <div className="overflow-hidden px-0">
        {isLoading ? (
          <LoadingSpinner />
        ) : isError ? (
          <ErrorMessage message="인기 체험을 불러오는 중 오류가 발생했습니다." />
        ) : (
          <Swiper
            modules={[Navigation, Autoplay]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            spaceBetween={18} // gap-[1.8rem] = 18px
            slidesPerView={2} // 모바일에서 2개씩 표시
            slidesPerGroup={2} // 2개씩 그룹으로 슬라이드
            loop={true}
            speed={500}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            breakpoints={{
              768: {
                slidesPerView: 2, // 태블릿 2개
                slidesPerGroup: 2,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 4, // 데스크톱 4개
                slidesPerGroup: 2,
                spaceBetween: 30,
              },
            }}
            className="best-activities !overflow-visible !px-0"
          >
            {activities.map((activity) => (
              <SwiperSlide key={activity.id}>
                <ActivityCard
                  activity={activity}
                  className="mb-[2.4rem] md:mb-[8rem]"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default BestActivities;
