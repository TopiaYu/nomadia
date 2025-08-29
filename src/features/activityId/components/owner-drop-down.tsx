'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useAuthStore } from '@/features/auth/stores/useAuthStore';
import Dropdown from '@/shared/components/dropdown/dropdown';
import Modal from '@/shared/components/modal/components';
import { useModalStore } from '@/shared/components/modal/libs/stores/useModalStore';
import { useDeleteActivityMutation } from '@/shared/libs/hooks/useDeleteActivityMutation';

const OwnerDropdown = ({
  ownerId,
  activityId,
}: {
  ownerId: number | undefined;
  activityId: number;
}) => {
  const { openModal, closeModal, modalName } = useModalStore();
  const { mutate: deleteMutate } = useDeleteActivityMutation();
  const { user } = useAuthStore();
  const router = useRouter();
  const isOwner = user?.id === ownerId;

  const handleDeleteConfirm = () => {
    deleteMutate(activityId, { onSuccess: () => router.push('/activities') });
    closeModal();
  };

  return (
    <>
      {isOwner && (
        <Dropdown
          dropdownClassName="absolute top-8 right-2"
          trigger={
            <button>
              <Image
                src="/images/icons/more.svg"
                width={28}
                height={28}
                alt={'more-options'}
                className="cursor-pointer"
              />
            </button>
          }
        >
          {(close) => (
            <div className="border-sub-300 h-[10.8rem] overflow-hidden rounded-[0.8rem] border bg-white">
              <button
                onClick={() => {
                  router.push(`/my/my-activities/activity-edit/${activityId}`);
                  close();
                }}
                className="hover:text-main hover:bg-sub h-[5.4rem] w-[9.3rem] cursor-pointer px-[1.8rem] text-[1.6rem]"
              >
                수정하기
              </button>
              <hr />
              <button
                onClick={() => {
                  openModal('delete');
                  close();
                }}
                className="h-[5.4rem] w-[9.3rem] cursor-pointer px-[1.8rem] text-[1.6rem] hover:bg-red-100 hover:text-red-500"
              >
                삭제하기
              </button>
            </div>
          )}
        </Dropdown>
      )}
      {modalName === 'delete' && (
        <Modal type="warning">
          <Modal.Header>체험을 삭제하시겠습니까?</Modal.Header>
          <div className="flex gap-[0.8rem] md:gap-[1.2rem]">
            <Modal.Button color="white" ariaLabel="아니요" onClick={closeModal}>
              아니요
            </Modal.Button>
            <Modal.Button
              color="blue"
              ariaLabel="네"
              onClick={handleDeleteConfirm}
            >
              네
            </Modal.Button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default OwnerDropdown;
