import Image from 'next/image';

import OwnerDropdown from '@/features/activityId/components/owner-drop-down';
import { textStyle } from '@/features/activityId/libs/constants/variants';
import StarImage from '@/shared/components/star/star';

import { ActivityInfo } from '../libs/types/activityInfo';

const Header = ({
  data,
  id,
}: {
  data: ActivityInfo | undefined;
  id: string;
}) => {
  return (
    <header>
      {/* 카테고리, 제목, 드롭다운 */}
      <div className="flex items-start justify-between">
        <div>
          <span className={textStyle.category}>{data?.category}</span>
          <h1 className={textStyle.h1}>{data?.title}</h1>
        </div>
        <OwnerDropdown ownerId={data?.userId} activityId={Number(id)} />
      </div>
      {/* 별점 */}
      <div className="mb-[1rem] flex items-center gap-[0.6rem]">
        <StarImage />
        <span className={textStyle.caption}>
          {data?.rating.toFixed(1)} ({data?.reviewCount})
        </span>
      </div>
      {/* 주소 */}
      <div className="flex items-center gap-[0.2rem]">
        <Image
          src="/images/icons/map-spot.svg"
          width={16}
          height={16}
          alt={'address'}
        />
        <p className={textStyle.caption}>{data?.address}</p>
      </div>
    </header>
  );
};
export default Header;
