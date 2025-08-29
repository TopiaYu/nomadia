import KakaoMap from '@/features/activityId/components/map/kakao-map';
import { textStyle } from '@/features/activityId/libs/constants/variants';

const AddressWithMap = ({ address }: { address: string | undefined }) => {
  return (
    <>
      <section className="flex flex-col gap-[0.8rem]">
        <h2 className={textStyle.h2}>오시는 길</h2>
        <p className="text-[1.4rem] font-semibold text-gray-800">{address}</p>
        <div
          id="map"
          className="mb-[2rem] h-[18rem] w-full overflow-hidden rounded-[1.6rem] md:h-[38rem] lg:mb-[4rem] lg:h-[45rem] lg:rounded-[2.4rem]"
        >
          <KakaoMap address={address} />
        </div>
      </section>
    </>
  );
};
export default AddressWithMap;
