'use client';

import { AxiosError } from 'axios';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

import AddressWithMap from '@/features/activityId/components/map/address-with-map';
import OwnerDropdown from '@/features/activityId/components/owner-drop-down';
import ReservationModal from '@/features/activityId/components/reservation-modal';
import Reviews from '@/features/activityId/components/reviews';
import SubImages from '@/features/activityId/components/sub-images';
import { activityIdStyle } from '@/features/activityId/libs/constants/variants';
import { useActivityIdQuery } from '@/features/activityId/libs/hooks/useActivityIdQuery';
import LoadingSpinner from '@/shared/components/loading-spinner/loading-spinner';
import StarImage from '@/shared/components/star';

const ActivityPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useActivityIdQuery(id);
  const router = useRouter();
  if (isError) {
    if (error instanceof AxiosError && error.response) {
      const status = error.response.status;

      if (status === 404 || status === 500) {
        router.push('/not-found');
      } else {
        throw new Error(String(status));
      }
    }
  }

  if (isLoading || !data) return <LoadingSpinner />;

  return (
    <div className="flex-center flex-col p-[2.4rem]">
      <div>
        <div className="flex flex-col gap-[2rem] md:gap-[2.4rem] lg:flex-row lg:gap-[4rem]">
          <SubImages images={data?.subImages} />
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
                <StarImage />
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
              <ReservationModal price={data?.price} activityId={Number(id)} />
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
