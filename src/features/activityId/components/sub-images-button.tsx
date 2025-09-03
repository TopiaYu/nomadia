'use client';
import { GalleryThumbnails } from 'lucide-react';

import { useModalStore } from '@/shared/components';
import useWindowSize from '@/shared/libs/hooks/useWindowSize';

const SubImagesButton = () => {
  const { isMobile } = useWindowSize();
  const { openModal } = useModalStore();

  return (
    <button
      className="flex-center btn-action-blue absolute right-[1.6rem] bottom-[1.6rem] cursor-pointer gap-[0.4rem] rounded-[0.6rem] bg-black/50 px-[0.8rem] py-[0.4rem] text-[1.2rem] md:right-[2.4rem] md:bottom-[2.4rem] md:gap-[0.6rem] md:rounded-[0.6rem] md:bg-white md:px-[1.2rem] md:py-[0.8rem] md:text-[1.4rem]"
      onClick={() => openModal('image-modal')}
      aria-label="이미지 전체 보기"
    >
      <GalleryThumbnails
        className="size-[2.4rem] md:size-[1.8rem]"
        color={isMobile ? 'white' : undefined}
      />
      {isMobile ? '' : '이미지 전체'}
    </button>
  );
};

export default SubImagesButton;
