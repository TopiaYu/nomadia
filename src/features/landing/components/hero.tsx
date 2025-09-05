import { ArrowDown, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useAuthStore } from '@/features/auth/stores/useAuthStore';
import { ErrorMessage } from '@/shared/components/error-message/error-message';
import { HeroSkeletonGrid } from '@/shared/components/skeleton/skeleton';
import useActivityQuery from '@/shared/libs/hooks/useActivityQuery';
import type { Activity } from '@/shared/types/activity';

interface HeroProps {
  swiperRef: React.MutableRefObject<SwiperType | null>;
  ActivityCard: React.FC<{ activity: Activity; className?: string }>;
  router: ReturnType<typeof import('next/navigation').useRouter>;
}

/**
 * 랜딩페이지 상단의 히어로 영역 컴포넌트
 * @description 랜딩페이지 상단의 히어로 영역 컴포넌트
 * @author 김영현
 */
const Hero = ({ swiperRef, ActivityCard, router }: HeroProps) => {
  const { data, isLoading, isError } = useActivityQuery({
    sort: 'most_reviewed',
    page: 1,
    size: 8,
  });

  // 로그인 여부 확인
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  // 버튼 클릭 핸들러
  const handleButtonClick = () => {
    if (isLoggedIn) {
      router.push('/my/my-activities');
    } else {
      router.push('/login');
    }
  };

  const activities = data?.pages?.flatMap((page) => page.activities) ?? [];

  return (
    <div className="bg-background">
      <div className="mx-auto max-w-[120rem] px-[1.6rem] py-[4rem] md:py-[7rem] lg:py-[8rem]">
        {/* 메인 컨텐츠 */}
        <div className="mb-[4rem] text-center md:mb-[2rem]">
          <div className="relative mb-[2.8rem] md:mb-[1.6rem] lg:mb-[1.8rem]">
            <p className="text-[1.8rem] leading-[3rem] text-gray-700 md:text-[3rem] lg:text-[3.4rem]">
              체험을
              <span className="border-sub-300 mr-1 ml-1 rounded-full border bg-[oklch(0.957_0.022_243.9)] px-4 py-1.5 font-semibold text-[oklch(0.682_0.153_248.5)] md:px-7 md:py-3">
                찾는 사람도
              </span>
              <br className="md:hidden" />
              <span className="border-sub-300 mr-1 rounded-full border bg-[oklch(0.957_0.022_243.9)] px-4 py-1.5 font-semibold text-[oklch(0.682_0.153_248.5)] md:px-7 md:py-3">
                만드는 사람도
              </span>
              될 수 있는 플랫폼
            </p>
          </div>
          <h1 className="mb-[3rem] text-[3rem] leading-snug font-bold md:mb-[7rem] md:text-[4.6rem] md:tracking-[0.1rem] lg:text-[6rem]">
            <span className="bg-gradient-to-r from-[oklch(0.682_0.153_248.5)] via-[oklch(0.6_0.18_260)] to-[oklch(0.72_0.14_235)] bg-clip-text text-transparent">
              새로운 취미, 특별한 체험을{' '}
            </span>
            <span className="text-gray-800">한 곳에서</span>
          </h1>
          <div className="via-main/90 flex-center from-sub to-sub mb-[1.6rem] block flex-col bg-gradient-to-r bg-clip-text text-[1.8rem] font-bold text-transparent md:mb-[2.6rem] md:text-[2.4rem] lg:mb-[2rem]">
            지금 시작하세요
            <ArrowDown
              strokeWidth={2.4}
              className="text-main/90 lg:size-[3rem]"
            />
          </div>
          <div className="flex-center flex-col">
            <div className="flex-center w-[28rem] gap-[0.8rem] md:w-[36rem] md:gap-[1.6rem]">
              <button
                className="bg-main btn-action-landing-blue flex-1 cursor-pointer rounded-full py-5 text-[1.8rem] font-semibold text-white transition-colors md:py-6 md:text-[2.4rem]"
                onClick={() => router.push('/activities')}
              >
                체험 찾기
              </button>
              <button
                className="bg-sub border-sub-300 btn-action-landing-white text-main flex-1 cursor-pointer rounded-full border py-5 text-[1.8rem] font-semibold transition-colors md:py-6 md:text-[2.4rem]"
                onClick={handleButtonClick}
              >
                호스트 되기
              </button>
            </div>
          </div>
        </div>
        {/* Swiper/로딩/에러 분기 */}
        <div className="relative">
          <div className="flex items-center justify-end md:mb-6 lg:mt-[5rem]">
            <div className="mr-[1rem] flex space-x-2">
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="btn-action-carousel border-sub bg-sub cursor-pointer rounded-full border-1 p-2 transition-colors"
              >
                <ChevronLeft className="text-main h-7 w-7 md:h-10 md:w-10" />
              </button>
              <button
                onClick={() => swiperRef.current?.slideNext()}
                className="btn-action-carousel border-sub bg-sub cursor-pointer rounded-full border-1 p-2 transition-colors"
              >
                <ChevronRight className="text-main h-7 w-7 md:h-10 md:w-10" />
              </button>
            </div>
          </div>
          <div className="overflow-hidden px-0">
            {isLoading ? (
              <HeroSkeletonGrid />
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
