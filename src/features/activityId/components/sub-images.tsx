'use client';
import Image from 'next/image';
import { useState } from 'react';

import { SubImages as SubImagesType } from '@/features/activityId/libs/types/activityInfo';
import { cn } from '@/shared/libs/cn';

// 이미지랑 본문은 ssr로 해보고 싶은데, 이미지 클릭해서 바뀌는거 하려면 useState사용해야 하고... 그리고 체험예약 페이지라 5분간격으로 재요청 보내는데,
// 근데 그러면 더 보여지는게 빠른 SSR이 좋지 않나. 근데 diff로 업데이트하니까 로딩이 눈에 보일잉ㄹ은 없을거 같긴 하구..
// seo도 중요한데, 적어도 타이틀이랑 본문은 ssr로 하는게 좋을거 같다.
// 구글 이미지 검색 결과에 나오려면, 이미지가 서버에서 HTML에 포함되어 있어야 좋음
// 대표이미지는 SSR로, 그 뒤에 CSR로 교체해본다거나(?)

const SubImages = ({ images }: { images: SubImagesType[] | undefined }) => {
  const [representImage, setRepresentImage] = useState(images && images[0]);
  const [imageChanged, setImageChanged] = useState(-1);

  const length = images?.length;
  const imagesToShow = images?.slice(1, length);

  return (
    <div className="flex-center w-full min-w-[32.7rem] flex-col md:w-[68.4rem] lg:w-[67rem]">
      {/* 대표 이미지 */}
      {representImage && (
        <div className="relative mb-[0.8rem] h-[24.5rem] w-full overflow-hidden rounded-[2.4rem] bg-gray-50 md:mb-[1.2rem] md:h-[40rem]">
          <Image
            src={representImage.imageUrl}
            alt="representative-image"
            fill
            className="object-cover"
          />
        </div>
      )}
      {/* 상세 이미지 */}
      <div className="flex gap-[0.6rem] md:gap-[1.2rem]">
        {imagesToShow?.map((image, idx) => {
          return (
            <button
              key={idx}
              className={cn(
                'relative h-[8rem] w-[10.5rem] overflow-hidden rounded-2xl bg-gray-50 md:h-[14rem] md:w-[22rem] md:rounded-3xl lg:w-[21.5rem]',
                length === 2
                  ? 'w-[21.6rem] md:h-[16rem] md:w-[44.2rem] lg:w-[44.2rem]'
                  : '',
              )}
              onClick={() => {
                if (representImage === image) {
                  setRepresentImage(images && images[0]);
                  setImageChanged(-1);
                } else {
                  setRepresentImage(image);
                  setImageChanged(idx);
                }
              }}
            >
              <Image
                src={image.imageUrl}
                alt="detail-image"
                fill
                className="object-cover"
              />
              <div
                className={cn(
                  'flex-center text-bold absolute inset-0 bg-black/30 text-[1.3rem] text-white opacity-0 transition-opacity duration-300 hover:opacity-100 md:text-[1.8rem]',
                  imageChanged === idx && 'opacity-100',
                )}
              >
                닫기
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SubImages;
