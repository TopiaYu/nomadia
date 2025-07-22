import { ReactNode } from 'react';

/**
 * Modal.Footer
 *
 * 내부를 flex,gap-2로 정렬해주는 래퍼 컴포넌트입니다.
 * 주로 Modal.Button 등을 감싸기 위해 사용됩니다.
 *
 * @example
 * <Modal.Footer>
 *   <Modal.Button color="white" ariaLabel="취소" onClick={closeModal}>취소</Modal.Button>
 *   <Modal.Button color="blue" ariaLabel="확인" onClick={...}>확인</Modal.Button>
 * </Modal.Footer>
 *
 * @param {ReactNode} props.children - 버튼 등 하단에 위치할 요소들
 */

export const Footer = ({ children }: { children: ReactNode }) => {
  return <div className="flex gap-2 md:gap-3">{children}</div>;
};
