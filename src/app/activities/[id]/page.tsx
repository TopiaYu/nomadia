'use client';

import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';

import AddressWithMap from '@/features/activityId/components/map/address-with-map';
import OwnerDropdown from '@/features/activityId/components/owner-drop-down';
import ReservationModal from '@/features/activityId/components/reservation-modal';
import Reviews from '@/features/activityId/components/reviews';
import Star from '@/features/activityId/components/star';
import SubImages from '@/features/activityId/components/sub-images';
import { activityIdStyle } from '@/features/activityId/libs/constants/variants';
import { useActivityIdQuery } from '@/features/activityId/libs/hooks/useActivityIdQuery';
import LoadingSpinner from '@/shared/components/loading-spinner/loading-spinner';

// TODO
// 🐛 1.  calendar-for-form에서 클릭 시 id 저장하는 코드 제거하기 O
// 3. isDesktop활용하여, 캘린더를 모달로 감싸서 사용 O
// * mockData pageID = 5192

const ActivityPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useActivityIdQuery(id);

  const schedules = data?.schedules;
  const images = data?.subImages;

  if (isError) {
    console.error('에러 발생:', error);
    if (error.message === 'Request failed with status code 404') {
      notFound();
    }
  }

  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="flex-center flex-col p-[2.4rem]">
      <div>
        <div className="flex flex-col gap-[2rem] md:gap-[2.4rem] lg:flex-row lg:gap-[4rem]">
          <SubImages images={images} />
          <div className="relative">
            {/* 타이틀 헤더 */}
            <header className="order-2 lg:w-[41rem]">
              <div className="mt-[2rem] flex items-start justify-between">
                <div>
                  <div className="text-[1.4rem] font-medium text-gray-700">
                    {data?.category}
                  </div>
                  <h1 className={activityIdStyle.h1}>{data?.title}</h1>
                </div>
                <OwnerDropdown ownerId={data?.userId} activityId={Number(id)} />
              </div>
              {/* 별점 & 후기 & 구분선 */}
              <div className="mb-[1rem] flex items-center gap-[0.6rem] text-[1.4rem] leading-none text-gray-700">
                <Star />
                <p>
                  {data?.rating}({data?.reviewCount})
                </p>
              </div>
              <div className="flex items-center gap-[0.2rem] text-[1.4rem] leading-none text-gray-700">
                <Image
                  src="/images/icons/map-spot.svg"
                  width={16}
                  height={16}
                  alt={'address'}
                />
                <p>{data?.address}</p>
              </div>
            </header>
            {/* 체험 예약 캘린더 */}
            <section className="lg:absolute lg:top-[21rem] lg:left-0">
              <ReservationModal
                scheduleArray={schedules}
                price={data?.price}
                activityId={Number(id)}
              />
            </section>
          </div>
        </div>
        <div className="lg:w-[67rem]">
          <hr className="mt-[2rem] mb-[2rem]" />
          {/* 체험 설명 */}
          <section>
            <h2 className={activityIdStyle.h2}>체험 설명</h2>
            <p className={activityIdStyle.content}>{data?.description}</p>
          </section>
          <hr className="mt-[2rem] mb-[2rem]" />
          {/* 오시는 길 */}
          <AddressWithMap address={data?.address} />
          <hr className="mb-[2rem] lg:mb-[4rem]" />
          {/* 체험 후기 */}
          <Reviews activityId={Number(id)} />
        </div>
      </div>
    </div>
  );
};
export default ActivityPage;
