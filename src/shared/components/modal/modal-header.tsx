import { ReactNode } from 'react';

import { cn } from '@/shared/libs/cn';
import { useModalStore } from '@/shared/libs/stores/useModalStore';

/**
 * Modal.Header
 *
 * 모달의 제목 또는 안내 문구를 표시하는 영역입니다.
 *
 * @example
 * <Modal.Header>정말로 삭제하시겠습니까?</Modal.Header>
 *
 * @param {ReactNode} props.children - 표시할 텍스트 또는 요소
 */

export const Header = ({ children }: { children: ReactNode }) => {
  const { modalType } = useModalStore();

  return (
    <p
      className={cn(
        'text-[1.6rem] font-semibold text-black md:text-[2rem]',
        modalType === 'confirm' && 'mb-[1.4rem] md:mt-[0.6rem] md:mb-[1.6rem]',
        modalType === 'warning' && 'mb-[2rem] md:mb-[2.4rem]',
        modalType === 'custom' && 'mb-[1.2rem] md:mb-[1.6rem]',
      )}
    >
      {children}
    </p>
  );
};
