'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import ModalContent from '@/shared/components/modal/components/modal-content';
import { useKeydownEsc } from '@/shared/components/modal/libs/hooks/useKeydownEsc';
import { useModalStore } from '@/shared/components/modal/libs/stores/useModalStore';

/**
 * @component BasicModal
 * - `createPortal`을 사용하여 모달을 `document.body`에 직접 렌더링합니다.
 * - 전역 상태(`useModalStore`)를 통해 열림/닫힘 상태 및 모달 타입을 관리합니다.
 * @param {'confirm' | 'warning' | 'custom'} props.type - 모달의 타입. 전역 상태에 저장되어 모달 내부 버튼/헤더 등에서 참조됩니다.
 * @param {string} [props.extraClassName] - 모달 스타일 커스텀
 * @param {ReactNode} props.children - 모달 내부에 렌더링할 콘텐츠
 * @note `isModalOpen`이 `false`일 경우 아무것도 렌더링하지 않습니다.
 */
const BasicModal = ({
  type,
  extraClassName,
  children,
}: {
  type: 'confirm' | 'warning' | 'custom';
  extraClassName?: string;
  children: ReactNode;
}) => {
  const { isModalOpen, closeModal, setModalType } = useModalStore();
  const [isIconLoaded, setIsIconLoaded] = useState(false);
  useKeydownEsc(closeModal, isModalOpen, isIconLoaded);

  // 마운트 시 전역 타입 등록 - modal-button, modal-header에서 사용
  useEffect(() => {
    if (isModalOpen) {
      setModalType(type);
    }
  }, [isModalOpen, type, setModalType]);

  //warning 이미지를 미리 캐시에 로드
  useEffect(() => {
    if (type !== 'warning') setIsIconLoaded(true);
    const img = new window.Image();
    img.src = '/images/warning.svg';
    img.onload = () => {
      setIsIconLoaded(true); // 이미지가 다 로드된 후 모달 오픈
    };
  }, [type]);

  return createPortal(
    <AnimatePresence>
      {isModalOpen && (
        <>
          {/* 오버레이 */}
          <motion.div
            className="flex-center fixed inset-0 z-100 bg-black/50"
            onClick={() => {
              if (!isIconLoaded) return;
              closeModal();
            }}
            role="presentation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            {/* 모달 */}
            {isIconLoaded && (
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
              >
                <ModalContent type={type} extraClassName={extraClassName}>
                  {children}
                </ModalContent>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default BasicModal;
