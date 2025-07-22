import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import type { Activity } from '@/features/activities/libs/types/activity';
import { ErrorMessage } from '@/shared/components/error-message/error-message';
import LoadingSpinner from '@/shared/components/loading-spinner/loading-spinner';
import useActivity from '@/shared/libs/hooks/useActivityQuery';

interface HeroProps {
  swiperRef: React.MutableRefObject<SwiperType | null>;
  ActivityCard: React.FC<{ activity: Activity; className?: string }>;
  router: ReturnType<typeof import('next/navigation').useRouter>;
}

const Hero = ({ swiperRef, ActivityCard, router }: HeroProps) => {
  const { data, isLoading, isError } = useActivity({
    sort: 'most_reviewed',
    page: 1,
    size: 8,
  });

  const activities = data?.activities ?? [];

  return (
    <div className="bg-background">
      <div className="mx-auto max-w-[120rem] px-[1.6rem] py-[6.4rem]">
        {/* 메인 컨텐츠 */}
        <div className="mb-16 text-center">
          <h1 className="mb-6 text-[2.4rem] leading-tight font-black tracking-tight md:text-[4rem]">
            <span className="bg-gradient-to-r from-[oklch(0.682_0.153_248.5)] via-[oklch(0.6_0.18_260)] to-[oklch(0.72_0.14_235)] bg-clip-text text-transparent">
              새로운 취미, 특별한 체험을
            </span>
            <br />
            <span className="text-gray-900">한 곳에서</span>
          </h1>
          <div className="relative mb-12">
            <p className="text-[1.6rem] leading-relaxed font-medium text-gray-700 md:text-[2.2rem]">
              체험을
              <span className="mx-2 rounded-full bg-[oklch(0.957_0.022_243.9)] px-3 py-1 font-bold text-[oklch(0.682_0.153_248.5)]">
                찾는 사람도
              </span>
              <br className="md:hidden" />
              <span className="mx-2 rounded-full bg-[oklch(0.957_0.022_243.9)] px-3 py-1 font-bold text-[oklch(0.682_0.153_248.5)]">
                만드는 사람도
              </span>
              될 수 있는 플랫폼
            </p>
          </div>
          <div className="mb-16 flex justify-center space-x-4">
            <button
              className="bg-main max-w-xs flex-1 rounded-full px-8 py-3 text-[1.4rem] font-semibold text-white transition-colors hover:opacity-90 md:text-[1.8rem]"
              onClick={() => router.push('/activities')}
            >
              체험 찾기
            </button>
            <button
              className="bg-sub text-main max-w-xs flex-1 rounded-full px-8 py-3 text-[1.4rem] font-semibold transition-colors hover:opacity-80 md:text-[1.8rem]"
              onClick={() => router.push('/activities')}
            >
              호스트 되기
            </button>
          </div>
        </div>
        {/* Swiper/로딩/에러 분기 */}
        <div className="relative">
          <div className="mb-6 flex items-center justify-between">
            <p className="flex items-center gap-2 text-[1.8rem] font-bold text-gray-950 md:text-[3rem]">
              <span role="img" aria-label="인기 체험을 나타내는 불 아이콘">
                🔥
              </span>{' '}
              인기 체험
            </p>
            <div className="flex space-x-2">
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="bg-sub rounded-full p-2 transition-colors hover:bg-gray-200"
              >
                <ChevronLeft className="h-5 w-5 md:h-7 md:w-7" />
              </button>
              <button
                onClick={() => swiperRef.current?.slideNext()}
                className="bg-sub rounded-full p-2 transition-colors hover:bg-gray-200"
              >
                <ChevronRight className="h-5 w-5 md:h-7 md:w-7" />
              </button>
            </div>
          </div>
          <div className="flex min-h-[28rem] items-center justify-center overflow-hidden px-[1.6rem]">
            {isLoading ? (
              <LoadingSpinner />
            ) : isError ? (
              <ErrorMessage />
            ) : (
              <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={24}
                slidesPerView={1}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                loop={true}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 16,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 16,
                  },
                }}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                className="pb-2"
              >
                {activities.map((activity) => (
                  <SwiperSlide
                    key={activity.id}
                    className="px-[0.5rem] pb-[1rem]"
                  >
                    <div className="mx-auto max-w-[32.8rem] md:max-w-none">
                      <ActivityCard
                        activity={activity}
                        className="h-[24.3rem] md:h-[42.3rem] lg:h-[36.6rem]"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
