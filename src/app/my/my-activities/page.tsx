'use client';
import Image from 'next/image';
import Link from 'next/link';

import { DeleteConfirmModal } from '@/features/my/my-activities/components/delete-confirm-modal';
import { MyActivitiesList } from '@/features/my/my-activities/components/my-activities-list';

const MyActivityPage = () => {
  return (
    <>
      {/* 페이지 헤더 */}
      <div className="mb-[2rem] flex items-start justify-between py-[1rem] md:mb-[2.4rem]">
        <header className="flex flex-col gap-[0.4rem]">
          <h1 className="text-[1.8rem] font-bold text-gray-950">내 체험관리</h1>
          <span className="text-[1.4rem] font-medium text-gray-500">
            체험을 등록하거나 수정 및 삭제가 가능합니다.
          </span>
        </header>
        <Link
          href="/my/my-activities/activity-registration"
          className="md:bg-main flex cursor-pointer items-center justify-center rounded-[1.4rem] text-[1.2rem] font-bold text-white transition-colors md:h-[4.8rem] md:w-[13.8rem] md:text-[1.6rem] md:hover:bg-blue-500"
        >
          <span className="block md:hidden">
            <Image
              src="/images/icons/plus-button.svg"
              alt="plus-button"
              width={42}
              height={42}
              className="hover:zoom transition-transform duration-300"
            />
          </span>
          <span className="hidden md:block">체험 등록하기</span>
        </Link>
      </div>
      {/* 내 체험 리스트 */}
      <MyActivitiesList />
      {/* 삭제 확인 모달 */}
      <DeleteConfirmModal />
    </>
  );
};

export default MyActivityPage;
