import { ReactNode, useEffect } from 'react';

import ModalContent from '@/shared/components/modal/components/modal-content';
import ModalOverlay from '@/shared/components/modal/components/modal-overlay';
import { useModalStore } from '@/shared/libs/stores/useModalStore';

interface ModalProps {
  children: ReactNode;
  type: 'confirm' | 'warning' | 'custom';
  hasOverlay?: boolean;
  isCenter?: boolean;
  extraClassName?: string;
  onClickOverlay?: () => void;
}

/**
 * @author 지윤
 * @component 모달을 렌더링하는 공통 Modal 컴포넌트입니다.
 *
 * - 전역 상태 관리(`useModalStore`)에 의존하여 열림/닫힘, 모달 타입을 처리합니다.
 * - {children}으로 하위 컴포넌트를 직접 조합하여 사용할 수 있습니다.(Header/Button 또는 <div></div>등)
 *
 * @param {ReactNode} children - 모달 내부에 표시될 콘텐츠. 일반적으로 Header, Button 등의 서브 컴포넌트 포함.
 *
 * @param {'confirm' | 'warning' | 'custom'} type - 모달의 유형.
 *    - confirm: 확인/취소 버튼이 있는 모달
 *    - warning: 경고 또는 주의가 필요한 경우
 *    - custom: 사용자 정의 스타일의 모달
 *    이 값은 `useModalStore`에서 상태로 관리되며, 스타일 결정에 사용됨.
 *
 * @param {boolean} [hasOverlay=true] - 모달 뒤에 반투명 오버레이를 표시할지 여부.
 *    - true: `<ModalOverlay />`가 렌더링됨
 *    - false: 오버레이 없음
 *
 * @param {boolean} [isCenter=true] - 모달 콘텐츠를 화면 가운데에 정렬할지 여부.
 *
 * @param {string} [extraClassName] - `ModalContent`에 전달되는 추가 클래스명.(사용자 정의 스타일을 덧붙일 수 있음)
 *
 * @example
 * ```tsx
 * <Modal type="confirm">
 *   <Modal.Header>저장되었습니다</Modal.Header>
 *   <Modal.Button color="blue" ariaLabel="확인 버튼" onClick={closeModal}>
 *     확인
 *   </Modal.Button>
 * </Modal>
 * ```
 */
const BaseModal = ({
  children,
  type,
  hasOverlay = true,
  isCenter = true,
  extraClassName,
  onClickOverlay,
}: ModalProps) => {
  const { isModalOpen, setModalType } = useModalStore(); //모달을 중첨해서 여는 경우는 없어서, 전역상태로 관리

  useEffect(() => {
    if (isModalOpen) {
      setModalType(type);
    }
  }, [isModalOpen, type, setModalType]);

  return (
    <>
      {hasOverlay && <ModalOverlay onClickOverlay={onClickOverlay} />}
      <ModalContent isCenter={isCenter} extraClassName={extraClassName}>
        {children}
      </ModalContent>
    </>
  );
};

export default BaseModal;
