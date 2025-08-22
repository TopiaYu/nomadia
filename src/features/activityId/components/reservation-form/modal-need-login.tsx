'use client';
import { usePathname, useRouter } from 'next/navigation';

import Modal from '@/shared/components/modal/components';
import { useModalStore } from '@/shared/components/modal/libs/stores/useModalStore';

const NeedLoginModal = () => {
  const { closeModal } = useModalStore();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Modal type="warning">
      <Modal.Header>로그인이 필요합니다.</Modal.Header>
      <div className="flex gap-[0.8rem] md:gap-[1.2rem]">
        <Modal.Button color="white" ariaLabel="취소" onClick={closeModal}>
          취소
        </Modal.Button>
        <Modal.Button
          color="blue"
          ariaLabel="로그인하기"
          onClick={() => {
            sessionStorage.setItem('redirectAfterSuccess', pathname);
            router.push('/login');
            closeModal();
          }}
        >
          로그인 하기
        </Modal.Button>
      </div>
    </Modal>
  );
};
export default NeedLoginModal;
