'use client';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteActivities } from '@/features/my/my-activities/lib/api/myActivities.api';
import Modal from '@/shared/components/modal/components';
import { useModalStore } from '@/shared/libs/stores/useModalStore';

export const DeleteConfirmModal = () => {
  const { activeReservationId, closeModal } = useModalStore();
  const queryClient = useQueryClient();

  const handleConfirm = async () => {
    if (!activeReservationId) return;

    try {
      await deleteActivities(activeReservationId);
      toast.success('삭제가 완료되었습니다.');

      await queryClient.invalidateQueries({ queryKey: ['myActivities'] });
    } catch {
      toast.error('삭제에 실패하였습니다.');
    } finally {
      closeModal();
    }
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
