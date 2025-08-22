import { ReactNode } from 'react';

import {
  modalButtonClasses,
  modalButtonColorClasses,
} from '@/shared/components/modal/libs/modalClasses';
import { useModalStore } from '@/shared/components/modal/libs/stores/useModalStore';
import { cn } from '@/shared/libs/cn';

/**
 * @author 지윤
 * @component Modal.Button -- 색상에 따라 스타일이 달라집니다. 그리고 클릭, 스타일, 비활성화 커스텀 가능합니다.
 * @param {'white' | 'blue'} props.color - 버튼 색상
 * @param {string} props.ariaLabel - 접근성 레이블
 * @param {() => void} [props.onClick] - 클릭 이벤트 핸들러
 * @param {string} props.extraClassName - 커스텀 클래스명 추가
 * @param {()=>boolean} props.controlDisabled - 버튼 비활성화에 대한 함수. boolean값을 리턴 --> 해당 값이 disabled={}에 반영됨
 * @param {ReactNode} props.children - 버튼 내부 텍스트
 * @example
 *   <Modal.Button color="white" ariaLabel="취소" onClick={closeModal}>취소</Modal.Button>
 */
export const Button = ({
  color,
  ariaLabel,
  onClick,
  extraClassName,
  controlDisabled,
  children,
}: {
  color: 'white' | 'blue';
  ariaLabel: string;
  onClick?: () => void;
  extraClassName?: string;
  controlDisabled?: () => boolean;
  children: ReactNode;
}) => {
  const { modalType } = useModalStore();

  return (
    <button
      className={cn(
        'flex-center cursor-pointer rounded-[1.2rem] text-[1.4rem] md:rounded-[1.4rem] md:text-[1.6rem]',
        modalButtonColorClasses[color],
        modalButtonClasses[modalType],
        extraClassName,
      )}
      aria-label={ariaLabel}
      onClick={onClick}
      disabled={controlDisabled ? controlDisabled() : false}
    >
      {children}
    </button>
  );
};
