import React from 'react';

// 배너 스켈레톤
export const BannerSkeleton = () => {
  return (
    <div className="relative h-[18.1rem] animate-pulse overflow-hidden rounded-[1.2rem] bg-gray-200 md:h-[37.5rem] md:rounded-[1.8rem] lg:h-[50rem] lg:rounded-[2.4rem]">
      {/* 배경 이미지 영역 */}
      <div className="h-full w-full bg-gray-300" />

      {/* 그라데이션 오버레이와 텍스트 영역 */}
      <div className="absolute inset-0 flex flex-col justify-end p-2 md:p-8 lg:p-12">
        {/* 제목 skeleton */}
        <div className="mb-2 flex justify-center">
          <div className="h-[1.8rem] w-2/3 rounded bg-gray-400 md:h-[2.4rem] lg:h-[3.2rem]" />
        </div>

        {/* 이달의 인기체험 BEST 🔥 skeleton */}
        <div className="mt-[1rem] flex justify-center pb-[2rem] md:pb-[4rem]">
          <div className="h-[1.4rem] w-1/3 rounded bg-gray-400 md:h-[1.6rem] lg:h-[1.8rem]" />
        </div>
      </div>
    </div>
  );
};

// 메인화면 체험 카드 베이스 스켈레톤
const ActivityCardSkeleton = () => {
  return (
    <div className="mb-[2.4rem] flex h-[24.3rem] w-full animate-pulse flex-col overflow-hidden rounded-[0.8rem] bg-white md:mb-[8rem] md:h-[42.3rem] md:rounded-[1.8rem] lg:h-[36.6rem]">
      {/* 이미지 영역 - 실제 ActivityCard와 동일한 비율 */}
      <div className="relative aspect-[3/4] w-full overflow-hidden md:-mb-[2.6rem] md:aspect-11/10 lg:aspect-[3/4]">
        <div className="h-full w-full rounded-t-[0.8rem] bg-gray-300 md:rounded-t-[1.8rem]" />
      </div>

      {/* 콘텐츠 영역 - 실제 ActivityCard와 동일한 구조 */}
      <div className="flex flex-1 flex-col rounded-[0.8rem] px-[1.7rem] py-[1.2rem] md:z-10 md:rounded-t-[1.8rem] md:bg-white md:px-[3rem] md:py-[2rem] lg:px-[2.8rem] lg:py-[2.4rem]">
        {/* 제목 영역 */}
        <div className="mt-[0.5rem] flex flex-col gap-[0.6rem]">
          <div className="h-[1.4rem] w-3/4 rounded bg-gray-300 md:h-[1.6rem]" />
          <div className="mt-[0.3rem] flex min-h-[1.8rem] items-center justify-between">
            <div className="h-[1.4rem] w-16 rounded bg-gray-300 md:h-[1.6rem] md:w-20" />
          </div>
        </div>

        {/* 가격 영역 */}
        <div className="mt-[1rem]">
          <div className="h-[1.5rem] w-20 rounded bg-gray-300 md:h-[1.8rem] md:w-24" />
        </div>
      </div>
    </div>
  );
};

/**
 * Hero 영역 스켈레톤 그리드 컴포넌트
 * @description 화면 크기에 따라 다른 개수의 스켈레톤을 보여줍니다
 * - 모바일 (< 640px): 1개
 * - 태블릿 (640px ~ 1024px): 2개
 * - PC (≥ 1024px): 3개
 */
export const HeroSkeletonGrid = () => {
  return (
    <div className="grid grid-cols-1 gap-[1.8rem] sm:grid-cols-2 sm:gap-[2.4rem] lg:grid-cols-3 lg:gap-[3rem]">
      {/* 모바일: 1개, 640px~: 2개, PC: 3개 */}
      {Array.from({ length: 1 }, (_, index) => (
        <ActivityCardSkeleton key={`mobile-${index}`} />
      ))}
      {/* 640px 이상에서만 보이는 추가 1개 */}
      <div className="hidden sm:contents">
        {Array.from({ length: 1 }, (_, index) => (
          <ActivityCardSkeleton key={`sm-${index}`} />
        ))}
      </div>
      {/* PC에서만 보이는 추가 1개 */}
      <div className="hidden lg:contents">
        {Array.from({ length: 1 }, (_, index) => (
          <ActivityCardSkeleton key={`pc-${index}`} />
        ))}
      </div>
    </div>
  );
};

/**
 * AllActivities, BestActivities 페이지 스켈레톤 그리드 컴포넌트
 * @description 화면 크기에 따라 다른 개수의 스켈레톤을 보여줍니다
 * - 모바일/태블릿 (< 1024px): 2개
 * - PC (≥ 1024px): 4개
 */
export const AllActivitiesSkeletonGrid = () => {
  return (
    <div className="grid grid-cols-2 gap-[1.8rem] md:gap-[2.4rem] lg:grid-cols-4 lg:gap-[3rem]">
      {/* 모바일/태블릿: 2개, PC: 4개 */}
      {Array.from({ length: 2 }, (_, index) => (
        <ActivityCardSkeleton key={index} />
      ))}
      {/* PC에서만 보이는 추가 2개 */}
      <div className="hidden lg:contents">
        {Array.from({ length: 2 }, (_, index) => (
          <ActivityCardSkeleton key={`pc-${index}`} />
        ))}
      </div>
    </div>
  );
};

// 예약 내역 페이지 스켈레톤
export const BookingCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-[2rem]">
      {Array.from({ length: 3 }, (_, index) => (
        <div
          key={`booking-card-skeleton-${index}`}
          className="flex flex-col gap-[1.2rem]"
        >
          <div className="shadow-experience-card h-[2rem] w-1/3 animate-pulse rounded-[2.4rem] bg-gray-200 sm:w-1/2 md:h-[2.7rem] md:w-1/3" />
          <div className="shadow-experience-card flex h-[13.6rem] w-full animate-pulse justify-between rounded-[2.4rem] bg-gray-200 sm:h-[14rem] md:h-[14rem] lg:h-[18.1rem]" />
        </div>
      ))}
    </div>
  );
};

// 내 체험 관리 페이지 스켈레톤
export const MyActivitiesSkeleton = () => {
  return (
    <div className="flex flex-col gap-[2.4rem]">
      {Array.from({ length: 3 }, (_, index) => (
        <div key={`my-activities-skeleton-${index}`}>
          <div className="shadow-experience-card h-[17.2rem] w-full animate-pulse rounded-[2.4rem] bg-gray-200 lg:h-[20.2rem]" />
        </div>
      ))}
    </div>
  );
};

// 상세 페이지 서브 이미지 스켈레톤
export const DetailSubImagesSkeleton = () => {
  return (
    <div className="shadow-experience-card mb-[2rem] aspect-[5/3] w-full animate-pulse rounded-[1.6rem] bg-gray-200 md:rounded-[2rem] lg:mb-[3.6rem]" />
  );
};

// 상세 페이지 카카오 맵 스켈레톤
export const DetailKakaoMapSkeleton = () => {
  return (
    <div className="shadow-experience-card h-[18rem] w-full animate-pulse rounded-[1.6rem] bg-gray-200 md:h-[38rem] lg:h-[45rem]" />
  );
};

// 상세 페이지 후기 스켈레톤
export const DetailReviewsSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* 후기 리스트 */}
      <ul className="mb-[11.5rem] space-y-[4rem] lg:mb-[21rem]">
        {Array.from({ length: 3 }, (_, index) => (
          <li key={`review-skeleton-${index}`}>
            <article
              className={`shadow-experience-card h-[11rem] rounded-[2.4rem] bg-gray-200 p-[2rem] md:h-[11.3rem]`}
            ></article>
          </li>
        ))}
      </ul>
    </div>
  );
};
