//테스트 파일입니다
//테스트용 코드니까, 참고만 하고 슥 넘어가세요~
'use client';
import { useState } from 'react';

import Modal from '@/shared/components/modal';
import Pagination from '@/shared/components/pagination/pagination';
import { Button } from '@/shared/libs/shadcn/components/ui/button';
import { useModalStore } from '@/shared/libs/stores/useModalStore';

export default function Page() {
  const [page, setPage] = useState(3);
  const [chooseModal, setChooseModal] = useState(1);

  const { openModal, closeModal } = useModalStore();
  return (
    <div className="flex flex-col gap-2.5">
      <Pagination totalPages={33} currentPage={page} setPage={setPage} />
      <Pagination totalPages={5} currentPage={page} setPage={setPage} />

      <Button
        className="text-2xl"
        onClick={() => {
          openModal();
          setChooseModal(1);
        }}
      >
        Modal: type-confirm
      </Button>
      <Button
        className="bg-amber-700 text-2xl"
        onClick={() => {
          openModal();
          setChooseModal(2);
        }}
      >
        Modal: type-warning
      </Button>
      <Button
        className="bg-pink-900 text-2xl"
        onClick={() => {
          openModal();
          setChooseModal(3);
        }}
      >
        Modal: type-custom
      </Button>

      {chooseModal === 1 && (
        <Modal type="confirm">
          <Modal.Header>수정이 완료되었습니다.</Modal.Header>
          <Modal.Button color="blue" ariaLabel="확인 버튼" onClick={closeModal}>
            확인
          </Modal.Button>
        </Modal>
      )}
      {chooseModal === 2 && (
        <Modal type="warning">
          <Modal.Header>
            저장되지 않았습니다
            <br />
            정말로 뒤로 가시겠습니까?
          </Modal.Header>

          <Modal.Footer>
            <Modal.Button color="white" ariaLabel="취소" onClick={closeModal}>
              취소
            </Modal.Button>
            <Modal.Button
              color="blue"
              ariaLabel="확인"
              onClick={() => {
                setPage(22);
                closeModal();
              }}
            >
              확인
            </Modal.Button>
          </Modal.Footer>
        </Modal>
      )}
      {chooseModal === 3 && (
        <Modal type="custom">
          <div className="h-[24.3rem] w-[27.9rem] bg-amber-300 text-3xl">
            커스텀 공간: 기본 패딩 24px입니다. ...
            <Modal.Header>소중한 경험을 들려주세요</Modal.Header>
          </div>
          <Modal.Button color="blue" ariaLabel="확인 버튼" onClick={closeModal}>
            확인
          </Modal.Button>
        </Modal>
      )}
    </div>
  );
}
