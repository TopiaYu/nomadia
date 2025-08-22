// Compound 조립
import BasicModal from '@/shared/components/modal/components/basic-modal/basic-modal';
import { Button } from '@/shared/components/modal/components/modal-button';
import { Header } from '@/shared/components/modal/components/modal-header';
/**
 * @component Modal (BasicModal 사용)
 * @example
 * ```tsx
 * <Modal type="warning">
 *   <Modal.Header>정말로 삭제하시겠습니까?</Modal.Header>
 * </Modal>
 * ```
 * @note ### 한 페이지에서 여러가지 모달을 사용하는 경우
 * 1. openModal에 모달명을 넘겨주고, 
 * 2. modalName을 체크하여 특정 모달만 열리도록 할 수 있음
 * @example
 * ```tsx
 * const { openModal, closeModal, modalName } = useModalStore();
 *   <button onClick={() => openModal('delete')}></button> // 모달 이름: delete
 *  {modalName === 'delete' && ( // 모달 이름 체크 후 렌더링 여부 결정
        <Modal type="warning">
          <Modal.Header>체험을 삭제하시겠습니까?</Modal.Header>
        </Modal>
      )}
 * ```
 */
const Modal = Object.assign(BasicModal, {
  Header,
  Button,
});

export default Modal;
