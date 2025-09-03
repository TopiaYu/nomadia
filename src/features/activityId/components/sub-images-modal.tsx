'use client';
import { Search, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { SubImages as SubImagesType } from '@/features/activityId/libs/types/activityInfo';
import Modal from '@/shared/components/modal/components';
import { useModalStore } from '@/shared/components/modal/libs/stores/useModalStore';

const SubImagesModal = ({ images }: { images: SubImagesType[] }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const { closeModal, modalName } = useModalStore();

  return (
    <>
      {modalName === 'image-modal' && (
        <Modal
          type="custom"
          extraClassName="relative h-[85vh] w-[90vw] p-0 py-[5rem] md:px-[5rem] md:pt-[2rem] md:pb-[3rem]"
        >
          {/* 닫기 버튼 */}
          <button
            onClick={() => closeModal()}
            onKeyDown={(e) => {
              if (e.key === 'Enter') closeModal();
            }}
          >
            <X
              size={30}
              color="black"
              className="absolute top-[1.4rem] right-[1.4rem]"
            />
          </button>
          {/* 대표 이미지 */}
          <div className="grid size-full grid-rows-[1fr_6rem] flex-col gap-[1rem] md:grid-rows-[1fr_7rem]">
            <div className="relative size-full">
              <Image
                src={images[selectedImage].imageUrl}
                alt="activity-image"
                fill
                className="rounded-2xl object-contain"
              />
            </div>
            {/* 기타 이미지 선택지 */}
            <div className="mx-auto flex gap-2 md:gap-[1rem]">
              {images.map((image, i) => {
                return (
                  <button
                    key={i}
                    className="relative size-[6rem] cursor-pointer md:size-[7rem]"
                    onClick={() => setSelectedImage(i)}
                    onMouseEnter={() => {
                      if (i === selectedImage) return;
                      setSelectedImage(i);
                    }}
                  >
                    <Image
                      key={i}
                      src={image.imageUrl}
                      alt="activity-image"
                      fill
                      className="object-cover"
                    />
                    {/* selected 이미지 - 오버레이 스타일 */}
                    {i === selectedImage && (
                      <div className="flex-center absolute top-0 left-0 size-[6rem] bg-black/50 md:size-[7rem]">
                        <Search size={20} color="white" strokeWidth="2.5" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};
export default SubImagesModal;
