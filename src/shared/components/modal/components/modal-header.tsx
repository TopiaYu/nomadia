import { ReactNode } from 'react';

import { modalHeaderClasses } from '@/shared/components/modal/libs/modalClasses';
import { useModalStore } from '@/shared/components/modal/libs/stores/useModalStore';
import { cn } from '@/shared/libs/cn';

/**
 * @author 지윤
 * @component Modal.Header -- 모달의 제목 또는 안내 문구를 표시하는 영역입니다.
 * @param {ReactNode} props.children - 표시할 텍스트 또는 요소
 * @example
 * <Modal.Header>정말로 삭제하시겠습니까?</Modal.Header>
 */
export const Header = ({ children }: { children: ReactNode }) => {
  const { modalType } = useModalStore();

  return (
    <p
      className={cn(
        'text-[1.6rem] font-semibold text-black md:text-[2rem]',
        modalHeaderClasses[modalType],
      )}
    >
      {children}
    </p>
  );
};
