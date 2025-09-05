'use client';

import 'swiper/css';
import 'swiper/css/navigation';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { navigateToActivity } from '@/features/activities/libs/utils/navigation';
import { ErrorMessage } from '@/shared/components';
import { BannerSkeleton } from '@/shared/components/skeleton/skeleton';
import useActivityQuery from '@/shared/libs/hooks/useActivityQuery';

/**
 * 배너 캐러셀 컴포넌트
 * @author 김영현
 * @returns 배너 캐러셀 컴포넌트
 * @description 배너 캐러셀을 표시하는 컴포넌트입니다.
 */
const BannerCarousel = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const isFetchingRef = useRef(false); // 중복 호출 방지를 위한 뮤텍스
  const { data, isLoading, isError, hasNextPage, fetchNextPage } =
    useActivityQuery({
      sort: 'most_reviewed',
      page: 1,
      size: 4,
    });

  const router = useRouter();

  const banners = data?.pages?.flatMap((page) => page.activities) ?? [];

  const handleSlideChange = (swiper: SwiperType) => {
    const currentIndex = swiper.realIndex;

    // 초기 로딩이 완료되고 최소 1개 이상의 배너가 있을 때만 prefetch 실행
    if (
      !isLoading && // 초기 로딩이 완료된 상태
      banners.length > 0 && // 최소 1개 이상의 배너가 있는 상태
      hasNextPage &&
      currentIndex >= banners.length - 1 &&
      !isFetchingRef.current &&
      banners.length < 8 // 최대 8개까지만 로드 (2페이지)
    ) {
      isFetchingRef.current = true; // 뮤텍스 잠금

      fetchNextPage().finally(() => {
        // API 요청 완료 후 뮤텍스 해제
        isFetchingRef.current = false;
      });
    }
  };

  // 배너 클릭 시 액티비티 상세 페이지로 이동
  const handleBannerClick = (activityId: number) => {
    navigateToActivity(activityId, router);
  };

  return (
    <div className="mx-auto mt-[3.2rem] w-full max-w-[112rem] px-[2.4rem] md:mt-[5rem] md:px-[3rem] lg:mt-[7rem] lg:px-[4rem]">
      <Swiper
        modules={[Navigation, Autoplay]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        spaceBetween={18}
        slidesPerView={1}
        slidesPerGroup={1}
        loop={true}
        speed={700}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={handleSlideChange}
        breakpoints={{
          768: {
            spaceBetween: 24,
          },
          1024: {
            spaceBetween: 30,
          },
        }}
        className="rounded-[1.2rem] md:rounded-[1.8rem] lg:rounded-[2.4rem]"
      >
        {isLoading ? (
          <SwiperSlide>
            <BannerSkeleton />
          </SwiperSlide>
        ) : isError ? (
          <SwiperSlide>
            <ErrorMessage message="배너를 불러오는 중 오류가 발생했습니다." />
          </SwiperSlide>
        ) : !banners.length ? (
          <SwiperSlide>
            <div className="flex h-[18.1rem] items-center justify-center text-gray-400 md:h-[37.5rem] lg:h-[50rem]">
              현재 표시할 배너가 없습니다.
            </div>
          </SwiperSlide>
        ) : (
          banners.map((banner, idx) => (
            <SwiperSlide key={banner.id}>
              <div
                className="relative h-[18.1rem] w-full cursor-pointer overflow-hidden rounded-[1.2rem] shadow-lg transition-transform hover:scale-[1.02] md:h-[37.5rem] md:rounded-[1.8rem] lg:h-[50rem] lg:rounded-[2.4rem]"
                onClick={() => handleBannerClick(banner.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleBannerClick(banner.id);
                  }
                }}
              >
                <Image
                  src={banner.bannerImageUrl}
                  alt={banner.title}
                  fill
                  className="object-cover"
                  priority={idx === 0}
                  quality={idx === 0 ? 60 : 50}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 112rem"
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 to-transparent p-2 transition-opacity duration-700 md:p-8 lg:p-12">
                  <div className="mb-2 text-center text-[1.8rem] font-bold text-white drop-shadow-lg md:text-[2.4rem] lg:text-[3.2rem]">
                    {banner.title || '제목 없음'}
                  </div>
                  <div className="pb-[2rem] text-center text-[1.4rem] font-bold text-white drop-shadow-lg md:pb-[4rem] md:text-[1.6rem] lg:text-[1.8rem]">
                    이달의 인기체험 BEST 🔥
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </div>
  );
};

export default BannerCarousel;
