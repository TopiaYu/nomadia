'use client';

import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

import NotificationButton from '@/features/activities/components/notification-button';
import { useSearchStore } from '@/features/activities/libs/stores/searchStore';
import { useSavePathActivityId } from '@/features/activityId/libs/hooks/useSavePathActivityId';
import { useAuthStore } from '@/features/auth/stores/useAuthStore';
import { useRedirectAfterSuccess } from '@/features/auth/utils/hooks/useRedirectAfterSuccess';
import { LogoutConfirmModal } from '@/features/my/my-activities/components/logout-confirm-modal';
import { useMyProfile } from '@/features/my/profile/lib/hooks/useMyProfile';
import Dropdown from '@/shared/components/dropdown/dropdown';
import { useModalStore } from '@/shared/components/modal/libs/stores/useModalStore';
import useHydration from '@/shared/libs/hooks/useHydration';

const Header = () => {
  const hydrated = useHydration();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();
  const { data: myData } = useMyProfile();
  const queryClient = useQueryClient();
  const redirectAfterLogout = useRedirectAfterSuccess();
  const savePathActivityId = useSavePathActivityId();
  const { openModal, closeModal, modalName } = useModalStore();
  const resetSearch = useSearchStore((state) => state.reset);

  if (!hydrated) return <div className="h-[4.8rem] md:h-[6rem]"></div>;

  const handleLogoutConfirm = () => {
    queryClient.clear();
    logout();
    savePathActivityId();
    redirectAfterLogout('/activities');
    closeModal();
  };

  return (
    <>
      <nav className="bg-sub mx-auto flex h-[4.8rem] w-full items-center justify-between px-[2.4rem] py-[0.6rem] md:h-[6rem] md:px-[3rem] md:py-[1rem] lg:px-[20rem]">
        <div className="text-main txt-20-bold cursor-pointer md:flex md:gap-3">
          <Link
            href="/activities"
            className="flex items-center gap-3"
            onClick={(e) => {
              e.preventDefault();
              resetSearch();
              router.push('/activities?page=1');
            }}
          >
            <Image
              src="/images/icons/logo.svg"
              alt="Logo"
              width={29}
              height={24}
            />
            <Image
              src="/images/icons/nomadia.svg"
              alt="Logo Name"
              width={102}
              height={29}
              className="hidden md:block"
            />
          </Link>
        </div>

        <ul className="txt-14-medium relative flex items-center space-x-[2.5rem] text-gray-950">
          {isLoggedIn ? (
            <>
              {/* 로그인 상태일 때 */}
              <li>
                <NotificationButton />
              </li>

              <li className="text-gray-100">|</li>

              {/* 드롭다운 */}
              <Dropdown
                trigger={
                  <button className="flex cursor-pointer items-center gap-3">
                    <Image
                      src={
                        myData?.profileImageUrl ||
                        '/images/icons/profile-default.svg'
                      }
                      alt="프로필사진"
                      width={30}
                      height={30}
                      className="aspect-square rounded-full"
                    />
                    {isLoggedIn && user && (
                      <span className="txt-14-medium text-gray-950">
                        {myData?.nickname}
                      </span>
                    )}
                  </button>
                }
                dropdownClassName="absolute left-1/2 -translate-x-[55%]"
              >
                {(close) => (
                  <div className="border-sub-300 txt-16-medium h-[11rem] w-[11.2rem] overflow-hidden rounded-xl border-[0.1rem] bg-white">
                    <Link
                      href="/my"
                      className="flex-center hover:bg-sub block h-[5.5rem] rounded-b-lg"
                      onClick={close}
                    >
                      마이페이지
                    </Link>
                    <button
                      onClick={() => {
                        openModal('logout');
                        close();
                      }}
                      className="hover:bg-sub block h-[5.5rem] w-full cursor-pointer rounded-t-lg"
                    >
                      로그아웃
                    </button>
                  </div>
                )}
              </Dropdown>
            </>
          ) : (
            <>
              {/* 비로그인 상태일 때 */}
              <li>
                <button
                  className="cursor-pointer"
                  onClick={() => {
                    savePathActivityId();
                    router.push('/login');
                  }}
                >
                  로그인
                </button>
              </li>
              <li>
                <button
                  className="cursor-pointer"
                  onClick={() => {
                    savePathActivityId();
                    router.push('/signup');
                  }}
                >
                  회원가입
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>

      {/* 로그아웃 모달 */}
      {modalName === 'logout' && (
        <LogoutConfirmModal
          onClose={closeModal}
          onConfirm={handleLogoutConfirm}
        />
      )}
    </>
  );
};

export default Header;
