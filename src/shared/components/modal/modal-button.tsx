import { ReactNode } from 'react';

import { cn } from '@/shared/libs/cn';
import { useModalStore } from '@/shared/libs/stores/useModalStore';

/**
 * Button
 *
 * 모달에서 사용하는 기본 버튼 컴포넌트입니다.
 * 색상에 따라 스타일이 달라지며, 클릭 시 동작을 전달받을 수 있습니다.
 *
 * @example
 *   <Modal.Button color="white" ariaLabel="취소" onClick={closeModal}>취소</Modal.Button>
 *
 * @param {'white' | 'blue'} props.color - 버튼 색상
 * @param {string} props.ariaLabel - 접근성 레이블
 * @param {() => void} [props.onClick] - 클릭 이벤트 핸들러
 * @param {ReactNode} props.children - 버튼 내부 텍스트
 */

export const Button = ({
  color,
  ariaLabel,
  onClick,
  children,
}: {
  color: 'white' | 'blue';
  ariaLabel: string;
  onClick?: () => void;
  children: ReactNode;
}) => {
  const { modalType } = useModalStore();

  return (
    <button
      className={cn(
        'w-full rounded-[1.2rem] py-3 text-[1.4rem] md:rounded-[1.4rem] md:py-3.5 md:text-[1.6rem]',
        color === 'white' &&
          'border border-gray-200 bg-white font-medium text-gray-600',
        color === 'blue' && 'bg-main font-semibold text-white',
        modalType === 'confirm' && 'w-[16rem] md:w-[20rem]',
        modalType === 'warning' && 'w-[11.3rem] md:w-[13.5rem]',
        modalType === 'custom' && 'w-full md:mb-[2rem]',
      )}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
