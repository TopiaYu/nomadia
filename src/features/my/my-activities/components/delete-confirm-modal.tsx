'use client';

import { useActivityIdStore } from '@/features/my/my-activities/lib/stores/useActivityIdStore';
import Modal from '@/shared/components/modal/components';
import { useModalStore } from '@/shared/components/modal/libs/stores/useModalStore';
import { useDeleteActivityMutation } from '@/shared/libs/hooks/useDeleteActivityMutation';

export const DeleteConfirmModal = () => {
  const { closeModal } = useModalStore();
  const { mutate } = useDeleteActivityMutation();
  const { activityId, setActivityId } = useActivityIdStore();

  const handleConfirm = () => {
    mutate(activityId);
    setActivityId(0); //reset
    closeModal();
  };

  return (
    <Modal type="warning">
      <Modal.Header>체험을 삭제하시겠습니까?</Modal.Header>
      <div className="flex gap-[0.8rem] md:gap-[1.2rem]">
        <Modal.Button
          color="white"
          ariaLabel="취소"
          onClick={closeModal}
          extraClassName="hover:bg-gray-200 cursor-pointer"
        >
          취소
        </Modal.Button>
        <Modal.Button
          color="blue"
          ariaLabel="확인"
          extraClassName="hover:bg-blue-500 cursor-pointer"
          onClick={handleConfirm}
        >
          확인
        </Modal.Button>
      </div>
    </Modal>
  );
};
