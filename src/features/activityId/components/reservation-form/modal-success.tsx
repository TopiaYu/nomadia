import Modal from '@/shared/components/modal/components';
import { useModalStore } from '@/shared/components/modal/libs/stores/useModalStore';

const SuccessModal = () => {
  const { closeModal } = useModalStore();
  return (
    <Modal type="confirm">
      <Modal.Header>예약이 완료되었습니다.</Modal.Header>
      <Modal.Button color="blue" ariaLabel="확인" onClick={closeModal}>
        확인
      </Modal.Button>
    </Modal>
  );
};
export default SuccessModal;
