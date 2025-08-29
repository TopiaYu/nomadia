'use client';
import { GalleryThumbnails } from 'lucide-react';
import Image from 'next/image';

import SubImagesModal from '@/features/activityId/components/sub-images-modal';
import { SubImages as SubImagesType } from '@/features/activityId/libs/types/activityInfo';
import { useModalStore } from '@/shared/components/modal/libs/stores/useModalStore';
import { cn } from '@/shared/libs/cn';

const SubImages = ({ images }: { images: SubImagesType[] | undefined }) => {
  const { modalName, openModal } = useModalStore();
  if (images === undefined) return null;
  const length = images.length;

  return (
    <>
      <div
        className={cn(
          // w-full + aspect클래스명으로 반응형 시 비율 유지
          'relative mb-[2rem] aspect-[5/3] w-full gap-2 overflow-hidden rounded-[1.6rem] md:gap-3 md:rounded-[2rem] lg:mb-[3.6rem]',
          length === 2 && 'grid grid-cols-2',
          length === 3 && 'grid grid-cols-[2fr_1fr]',
          length === 4 && 'grid grid-cols-[3fr_1fr] grid-rows-3',
        )}
      >
        {images.map((image, i) => {
          return (
            <button
              key={i}
              className={cn(
                'relative size-full',
                length === 3 && i === 0 && 'row-span-2',
                length === 4 && i === 0 && 'row-span-3',
              )}
              onClick={() => openModal('image-modal')}
            >
              <Image
                key={i}
                src={image.imageUrl}
                alt="activity-image"
                fill
                className="object-cover"
              />
            </button>
          );
        })}
        {length > 1 && (
          <button
            className="flex-center btn-action-blue absolute right-[1.6rem] bottom-[1.6rem] cursor-pointer gap-[0.4rem] rounded-[0.6rem] bg-white px-[0.8rem] py-[0.4rem] text-[1.2rem] md:right-[2.4rem] md:bottom-[2.4rem] md:gap-[0.6rem] md:rounded-[0.6rem] md:px-[1.2rem] md:py-[0.8rem] md:text-[1.4rem]"
            onClick={() => openModal('image-modal')}
          >
            <GalleryThumbnails className="size-[1rem] md:size-[1.8rem]" />
            이미지 전체
          </button>
        )}
      </div>
      {modalName === 'image-modal' && <SubImagesModal images={images} />}
    </>
  );
};

export default SubImages;
