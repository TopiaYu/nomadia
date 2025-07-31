import Image from 'next/image';
import { ReactNode } from 'react';

import { modalContentClasses } from '@/shared/components/modal/libs/modalClasses';
import { cn } from '@/shared/libs/cn';
import { useModalStore } from '@/shared/libs/stores/useModalStore';

const ModalContent = ({
  children,
  isCenter,
  extraClassName,
}: {
  children: ReactNode;
  isCenter?: boolean;
  extraClassName?: string;
}) => {
  const { isModalOpen, closeModal, modalType } = useModalStore();

  if (!isModalOpen) return null;

  return (
    <>
      {/* 모달을 중앙정렬 하기 위한 div 태그*/}

      <div
        className={cn(
          isCenter && 'flex-center pointer-events-none fixed inset-0 z-99',
        )}
      >
        {/* 모달 */}
        <div
          className={cn(
            'pointer-events-auto rounded-[3rem] bg-white',
            modalContentClasses[modalType],
            extraClassName,
            'z-100',
          )}
          onClick={(e) => e.stopPropagation()} // 모달 내용 클릭 시 닫힘 방지
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              closeModal();
            }
          }}
          role="dialog"
          tabIndex={-1}
        >
          {modalType === 'warning' && (
            <Image
              src="/images/warning.svg"
              alt="warning image"
              width={49}
              height={49}
              className="md:size-[8.8rem]"
            />
          )}
          {children}
        </div>
      </div>
    </>
  );
};

export default ModalContent;
