import { ReactNode } from 'react';

import {
  modalButtonClasses,
  modalButtonColorClasses,
} from '@/shared/components/modal/libs/modalClasses';
import { cn } from '@/shared/libs/cn';
import { useModalStore } from '@/shared/libs/stores/useModalStore';

/**
 * @author 지윤
 * @component Modal.Button
 *
 * 색상에 따라 스타일이 달라지며, 클릭 시 동작을 전달받을 수 있습니다.
 *
 * @example
 *   <Modal.Button color="white" ariaLabel="취소" onClick={closeModal}>취소</Modal.Button>
 *
 * @param {'white' | 'blue'} props.color - 버튼 색상
 * @param {string} props.ariaLabel - 접근성 레이블
 * @param {() => void} [props.onClick] - 클릭 이벤트 핸들러
 * @param {string} props.extraClassName - 커스텀 클래스명 추가
 * @param {ReactNode} props.children - 버튼 내부 텍스트
 * @param {()=>boolean} props.controlDisabled - 버튼 비활성화에 대한 함수. boolean값을 리턴 --> 해당 값이 disabled={}에 반영됨
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

  // ariaLabel값은 children으로 대체하려다가, 자식으로 <span></span>같은 문자열이 아닌 요소일 경우를 고려하여, 안전하게 프롭으로 받는거로 결정
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
