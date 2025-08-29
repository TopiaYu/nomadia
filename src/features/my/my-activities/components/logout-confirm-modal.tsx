'use client';

import Modal from '@/shared/components/modal/components';

interface Props {
  onClose: () => void;
  onConfirm: () => void;
}

export const LogoutConfirmModal: React.FC<Props> = ({ onClose, onConfirm }) => {
  return (
    <Modal type="warning">
      <Modal.Header>정말 로그아웃 하시겠습니까?</Modal.Header>
      <div className="flex gap-[0.8rem] md:gap-[1.2rem]">
        <Modal.Button
          color="white"
          ariaLabel="취소"
          onClick={onClose}
          extraClassName="hover:bg-gray-200 cursor-pointer"
        >
          취소
        </Modal.Button>
        <Modal.Button
          color="blue"
          ariaLabel="확인"
          extraClassName="hover:bg-blue-500 cursor-pointer"
          onClick={onConfirm}
        >
          확인
        </Modal.Button>
      </div>
    </Modal>
  );
};
