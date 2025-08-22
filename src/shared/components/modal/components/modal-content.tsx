'use client';
import Image from 'next/image';
import { ReactNode, useEffect, useRef } from 'react';

import { modalContentClasses } from '@/shared/components/modal/libs/modalClasses';
import { useModalStore } from '@/shared/components/modal/libs/stores/useModalStore';
import { cn } from '@/shared/libs/cn';

const ModalContent = ({
  type,
  children,
  extraClassName,
}: {
  type: 'confirm' | 'warning' | 'custom';
  children: ReactNode;
  extraClassName?: string;
}) => {
  const { isModalOpen, closeModal } = useModalStore();

  // 모달에 먼저 포커스 -> esc동작 가능
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isModalOpen && modalRef.current) modalRef.current.focus();
  }, [isModalOpen]);

  return (
    <>
      <div
        ref={modalRef}
        className={cn(
          'pointer-events-auto rounded-[3rem] bg-white',
          modalContentClasses[type],
          extraClassName,
        )}
        onClick={(e) => e.stopPropagation()} // 모달 내용 클릭 시 닫힘 방지
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            closeModal();
          }
        }}
        role="dialog"
        tabIndex={0}
      >
        {/* 경고 이미지 */}
        {type === 'warning' && (
          <Image
            src="/images/warning.svg"
            alt="warning image"
            width={49}
            height={49}
            className="md:size-[8.8rem]"
            priority
          />
        )}
        {children}
      </div>
    </>
  );
};

export default ModalContent;
