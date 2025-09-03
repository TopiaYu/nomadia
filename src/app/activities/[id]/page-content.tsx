import CleanUp from '@/features/activityId/components/cleanup';
import Header from '@/features/activityId/components/header';
import AddressWithMap from '@/features/activityId/components/map/address-with-map';
import ReservationModal from '@/features/activityId/components/reservation-modal';
import ReviewsWrapper from '@/features/activityId/components/reviews-wrapper';
import SubImages from '@/features/activityId/components/sub-images';
import { textStyle } from '@/features/activityId/libs/constants/variants';
import { ActivityInfo } from '@/features/activityId/libs/types/activityInfo';

const ActivityPageContent = ({
  id,
  data,
}: {
  id: string;
  data: ActivityInfo;
}) => {
  return (
    <div className="mx-auto w-full justify-center p-[2.4rem] md:px-[4rem] lg:max-w-[120rem] lg:pt-[1.6rem]">
      {/* 체험 이미지 */}
      <SubImages images={data?.subImages} />
      <div className={'lg:grid lg:grid-cols-[1fr_41.9rem] lg:gap-[4rem]'}>
        <div>
          {/* 헤더 영역(분류, 제목, 별점, 주소, 드롭다운) */}
          <Header data={data} id={id} />
          {/* 체험 설명 */}
          <hr className="mt-[2rem] mb-[2rem]" />
          <section>
            <h2 className={textStyle.h2}>체험 설명</h2>
            <p className={textStyle.content}>{data?.description}</p>
          </section>
          {/* 오시는 길 */}
          <hr className="mt-[2rem] mb-[2rem]" />
          <AddressWithMap address={data?.address} />
          {/* 체험 후기 */}
          <hr className="mb-[2rem] lg:mb-[4rem]" />
          <ReviewsWrapper activityId={Number(id)} />
        </div>
        {/* 체험 예약 캘린더 */}
        <ReservationModal price={data?.price} activityId={Number(id)} />
      </div>
      <CleanUp />
    </div>
  );
};
export default ActivityPageContent;
