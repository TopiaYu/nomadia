//테스트 파일입니다
'use client';
import { useState } from 'react';

import Modal from '@/shared/components/modal/components';
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
          <div className="flex gap-2 md:gap-3">
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
          </div>
        </Modal>
      )}
      {/* 모달이 하단에서 위로 쑥 올라오는 모션은 못넣을거임.. */}
      {chooseModal === 3 && (
        <Modal type="custom" extraClassName="w-[38.5rem] h-[54.9rem]">
          {/* children */}
          <div className="flex-center flex-col text-3xl">
            <p>함께 배우면 즐거운 스트릿 댄스</p>
            <span>⭐️⭐️⭐️⭐️⭐️</span>
            <Modal.Header>소중한 경험을 들려주세요</Modal.Header>
            <Modal.Button
              color="blue"
              ariaLabel="작성하기 버튼"
              onClick={closeModal}
            >
              작성하기
            </Modal.Button>
          </div>
        </Modal>
      )}
    </div>
  );
}
