'use client';

import React, { useState } from 'react';

import {
  AllActivitiesSkeletonGrid,
  BannerSkeleton,
  BookingCardSkeleton,
  DetailKakaoMapSkeleton,
  DetailReviewsSkeleton,
  DetailSubImagesSkeleton,
  HeroSkeletonGrid,
  MyActivitiesSkeleton,
} from '@/shared/components/skeleton/skeleton';

const SkeletonTestPage = () => {
  const [showSkeletons, setShowSkeletons] = useState(true);

  const toggleSkeletons = () => {
    setShowSkeletons(!showSkeletons);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-[2rem]">
      <div className="mx-auto max-w-[120rem]">
        {/* 헤더 */}
        <div className="mb-[4rem] flex items-center justify-between">
          <h1 className="text-[3.2rem] font-bold text-gray-900">
            스켈레톤 UI 테스트 페이지
          </h1>
          <button
            onClick={toggleSkeletons}
            className="rounded-[0.8rem] bg-blue-600 px-[2rem] py-[1rem] text-white hover:bg-blue-700"
          >
            {showSkeletons ? '스켈레톤 숨기기' : '스켈레톤 보기'}
          </button>
        </div>

        {showSkeletons && (
          <div className="space-y-[6rem]">
            {/* 배너 스켈레톤 */}
            <section>
              <h2 className="mb-[2rem] text-[2.4rem] font-semibold text-gray-800">
                1. 배너 스켈레톤 (BannerSkeleton)
              </h2>
              <p className="mb-[2rem] text-[1.4rem] text-gray-600">
                메인 페이지의 배너 영역 스켈레톤
              </p>
              <BannerSkeleton />
            </section>

            {/* Hero 그리드 스켈레톤 */}
            <section>
              <h2 className="mb-[2rem] text-[2.4rem] font-semibold text-gray-800">
                2. Hero 그리드 스켈레톤 (HeroSkeletonGrid)
              </h2>
              <p className="mb-[2rem] text-[1.4rem] text-gray-600">
                메인 페이지의 인기 체험 그리드 스켈레톤 (반응형: 모바일 1개,
                태블릿 2개, PC 3개)
              </p>
              <HeroSkeletonGrid />
            </section>

            {/* All Activities 그리드 스켈레톤 */}
            <section>
              <h2 className="mb-[2rem] text-[2.4rem] font-semibold text-gray-800">
                3. All Activities 그리드 스켈레톤 (AllActivitiesSkeletonGrid)
              </h2>
              <p className="mb-[2rem] text-[1.4rem] text-gray-600">
                전체 체험 목록 페이지의 그리드 스켈레톤 (반응형: 모바일/태블릿
                2개, PC 4개)
              </p>
              <AllActivitiesSkeletonGrid />
            </section>

            {/* 예약 내역 스켈레톤 */}
            <section>
              <h2 className="mb-[2rem] text-[2.4rem] font-semibold text-gray-800">
                4. 예약 내역 스켈레톤 (BookingCardSkeleton)
              </h2>
              <p className="mb-[2rem] text-[1.4rem] text-gray-600">
                마이페이지 _ 예약 내역 페이지의 예약 카드 스켈레톤 (2개 카드)
              </p>
              <div className="max-w-[60rem]">
                <BookingCardSkeleton />
              </div>
            </section>

            {/* 내 체험관리 스켈레톤 */}
            <section>
              <h2 className="mb-[2rem] text-[2.4rem] font-semibold text-gray-800">
                5. 내 체험관리 스켈레톤 (MyActivitiesSkeleton)
              </h2>
              <p className="mb-[2rem] text-[1.4rem] text-gray-600">
                마이페이지 _ 내 체험관리 페이지의 체험 카드 스켈레톤
              </p>
              <div className="max-w-[63.6rem]">
                <MyActivitiesSkeleton />
              </div>
            </section>

            {/* 체험 상세 페이지 스켈레톤들 */}
            <section>
              <h2 className="mb-[2rem] text-[2.4rem] font-semibold text-gray-800">
                6. 체험 상세 페이지 스켈레톤들
              </h2>
              <div className="space-y-[4rem]">
                {/* 서브 이미지 스켈레톤 */}
                <div>
                  <h3 className="mb-[1.6rem] text-[1.8rem] font-medium text-gray-700">
                    6-1. 서브 이미지 스켈레톤 (DetailSubImagesSkeleton)
                  </h3>
                  <p className="mb-[1.6rem] text-[1.4rem] text-gray-600">
                    체험 상세 페이지의 서브 이미지 영역 스켈레톤 (반응형 비율
                    유지)
                  </p>
                  <DetailSubImagesSkeleton />
                </div>

                {/* 카카오 맵 스켈레톤 */}
                <div>
                  <h3 className="mb-[1.6rem] text-[1.8rem] font-medium text-gray-700">
                    6-2. 카카오 맵 스켈레톤 (DetailKakaoMapSkeleton)
                  </h3>
                  <p className="mb-[1.6rem] text-[1.4rem] text-gray-600">
                    체험 상세 페이지의 지도 영역 스켈레톤
                  </p>
                  <DetailKakaoMapSkeleton />
                </div>

                {/* 후기 스켈레톤 */}
                <div>
                  <h3 className="mb-[1.6rem] text-[1.8rem] font-medium text-gray-700">
                    6-3. 후기 스켈레톤 (DetailReviewsSkeleton)
                  </h3>
                  <p className="mb-[1.6rem] text-[1.4rem] text-gray-600">
                    체험 상세 페이지의 후기 리스트 스켈레톤 (3개 후기 카드)
                  </p>
                  <DetailReviewsSkeleton />
                </div>
              </div>
            </section>

            {/* 반응형 테스트 */}
            <section>
              <h2 className="mb-[2rem] text-[2.4rem] font-semibold text-gray-800">
                7. 반응형 테스트
              </h2>
              <p className="mb-[2rem] text-[1.4rem] text-gray-600">
                브라우저 크기를 조절해보세요. 스켈레톤들이 반응형으로 동작하는지
                확인할 수 있습니다.
              </p>
              <div className="rounded-[1.6rem] border-2 border-dashed border-gray-300 p-[2rem]">
                <div className="grid gap-[2rem] md:grid-cols-2 lg:grid-cols-3">
                  <div>
                    <h4 className="mb-[1rem] text-[1.6rem] font-medium">
                      서브 이미지
                    </h4>
                    <DetailSubImagesSkeleton />
                  </div>
                  <div>
                    <h4 className="mb-[1rem] text-[1.6rem] font-medium">
                      카카오 맵
                    </h4>
                    <DetailKakaoMapSkeleton />
                  </div>
                  <div>
                    <h4 className="mb-[1rem] text-[1.6rem] font-medium">
                      후기
                    </h4>
                    <DetailReviewsSkeleton />
                  </div>
                </div>
              </div>
            </section>

            {/* 사용법 가이드 */}
            <section>
              <h2 className="mb-[2rem] text-[2.4rem] font-semibold text-gray-800">
                8. 사용법 가이드
              </h2>
              <div className="rounded-[1.6rem] bg-white p-[2rem] shadow-lg">
                <div className="space-y-[2rem]">
                  <div>
                    <h4 className="mb-[1rem] text-[1.6rem] font-semibold text-gray-900">
                      📦 Import 방법:
                    </h4>
                    <code className="block rounded-[0.8rem] bg-gray-100 p-[1.2rem] text-[1.2rem]">
                      {`import { 
  BannerSkeleton,
  HeroSkeletonGrid,
  AllActivitiesSkeletonGrid,
  BookingCardSkeleton,
  MyActivitiesSkeleton,
  DetailSubImagesSkeleton,
  DetailKakaoMapSkeleton,
  DetailReviewsSkeleton
} from '@/shared/components/skeleton/skeleton';`}
                    </code>
                  </div>

                  <div>
                    <h4 className="mb-[1rem] text-[1.6rem] font-semibold text-gray-900">
                      🔧 사용 예시:
                    </h4>
                    <div className="space-y-[1.2rem]">
                      <div>
                        <p className="mb-[0.8rem] text-[1.4rem] font-medium text-gray-700">
                          예약 내역 페이지:
                        </p>
                        <code className="block rounded-[0.4rem] bg-gray-100 px-[0.8rem] py-[0.4rem] text-[1.2rem]">
                          {`{isLoading ? <BookingCardSkeleton /> : <BookingList />}`}
                        </code>
                      </div>
                      <div>
                        <p className="mb-[0.8rem] text-[1.4rem] font-medium text-gray-700">
                          체험 상세 페이지:
                        </p>
                        <code className="block rounded-[0.4rem] bg-gray-100 px-[0.8rem] py-[0.4rem] text-[1.2rem]">
                          {`{isLoading ? <DetailSubImagesSkeleton /> : <SubImages images={data?.subImages} />}`}
                        </code>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-[1rem] text-[1.6rem] font-semibold text-gray-900">
                      ✨ 특징:
                    </h4>
                    <ul className="space-y-[0.8rem] text-[1.4rem] text-gray-700">
                      <li>• 모든 스켈레톤은 반응형으로 동작합니다</li>
                      <li>
                        • 실제 컴포넌트와 동일한 크기와 레이아웃을 유지합니다
                      </li>
                      <li>
                        • 로딩 완료 후 레이아웃 시프트가 발생하지 않습니다
                      </li>
                      <li>• 일관된 디자인 시스템을 따릅니다</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {!showSkeletons && (
          <div className="flex-center h-[40rem] rounded-[1.6rem] border-2 border-dashed border-gray-300">
            <p className="text-[1.8rem] text-gray-500">
              스켈레톤을 보려면 위의 버튼을 클릭하세요
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkeletonTestPage;
