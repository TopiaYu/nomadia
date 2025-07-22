import Image from 'next/image';
import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { cn } from '@/shared/libs/cn';
import { useModalStore } from '@/shared/libs/stores/useModalStore';

type ModalProps = {
  type: 'confirm' | 'warning' | 'custom';
  children: ReactNode;
};

/**
 * 모달을 렌더링하는 공통 Modal 컴포넌트입니다.
 *
 * * `type`에 따라 confirm/warning/custom 형태로 스타일이 적용되며,
 * * `type`에 따라 서브 컴포넌트인 Header/Button의 스타일이 알맞게 적용됩니다.
 * * children으로 Header/Footer/Button 또는 <div></div>등 하위 컴포넌트를 직접 조합하여 사용할 수 있습니다.
 *
 * 전역 상태 관리(`useModalStore`)에 의존하여 열림/닫힘, 모달 타입을 처리합니다.
 *
 * @component
 * @example
 * ```tsx
 * <Modal type="confirm">
 *   <Modal.Header>저장되었습니다</Modal.Header>
 *   <Modal.Button color="blue" ariaLabel="확인 버튼" onClick={closeModal}>
 *     확인
 *   </Modal.Button>
 * </Modal>
 * ```
 *
 * @param {'confirm' | 'warning' | 'custom'} props.type - 모달 타입에 따라 다른 스타일이 적용됩니다.
 * @param {ReactNode} props.children - Modal.Header, Modal.Button 등을 자식으로 넣어 구성합니다.
 */

const BaseModal = ({ type, children }: ModalProps) => {
  const { isModalOpen, closeModal, setModalType, modalType } = useModalStore();

  useEffect(() => {
    if (isModalOpen) {
      setModalType(type);
    }
  }, [isModalOpen, type, setModalType]);

  if (!isModalOpen) return null;
  return createPortal(
    <div
      className="flex-center fixed inset-0 bg-black/50"
      onClick={closeModal} // 배경 클릭 시 닫힘
      role="presentation"
    >
      <div
        className={cn(
          'rounded-[3rem] bg-white',
          modalType === 'confirm' &&
            'flex h-[14rem] w-[32rem] flex-col items-center p-[3rem] pt-[3.4rem] text-center md:h-[17rem] md:w-[40rem] md:p-[4rem] md:pb-[3rem]',
          modalType === 'warning' &&
            'flex w-[32rem] flex-col items-center p-[3rem] pb-[2.4rem] text-center md:w-[40rem] md:p-[3rem]',
          modalType === 'custom' && 'p-[2.4rem]',
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
    </div>,
    document.body,
  );
};

export default BaseModal;
