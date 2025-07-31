import { useEffect } from 'react';

import { useModalStore } from '@/shared/libs/stores/useModalStore';

const ModalOverlay = ({ onClickOverlay }: { onClickOverlay?: () => void }) => {
  const { isModalOpen, closeModal } = useModalStore();

  // esc 이벤트 등록(closeModal)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, closeModal]);

  if (!isModalOpen) return null;
  return (
    <>
      <div
        className="fixed inset-0 z-80 bg-black/50"
        onClick={() => {
          if (onClickOverlay) {
            onClickOverlay();
          } else {
            closeModal();
          }
        }} // 배경 클릭 시 닫힘
        role="presentation"
      ></div>
    </>
  );
};

export default ModalOverlay;
