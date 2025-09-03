import Image from 'next/image';

import SubImagesButton from '@/features/activityId/components/sub-images-button';
import SubImagesModal from '@/features/activityId/components/sub-images-modal';
import { SubImages as SubImagesType } from '@/features/activityId/libs/types/activityInfo';
import { cn } from '@/shared/libs/cn';

const SubImages = ({ images }: { images: SubImagesType[] | undefined }) => {
  if (images === undefined) return null;
  const length = images.length;
  const noImage = !images || images.length === 0;

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
            <div
              key={i}
              className={cn(
                'relative size-full',
                length === 3 && i === 0 && 'row-span-2',
                length === 4 && i === 0 && 'row-span-3',
              )}
            >
              <Image
                key={i}
                src={image.imageUrl}
                alt="activity-image"
                fill
                className="object-cover"
                priority={i === 0}
              />
            </div>
          );
        })}
        {length > 1 && <SubImagesButton />}
      </div>
      {!noImage && <SubImagesModal images={images} />}
    </>
  );
};

export default SubImages;
