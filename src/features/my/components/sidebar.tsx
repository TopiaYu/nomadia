'use client';

import { CalendarDays, MessageSquareText, Settings, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { useMyProfile } from '@/features/my/profile/lib/hooks/useMyProfile';

const Sidebar = () => {
  const defaultProfileImage = '/images/icons/profile-default.svg';
  const pathname = usePathname();
  const menus = [
    {
      key: 'profile',
      label: '내 정보',
      icon: User,
    },
    {
      key: 'reservation',
      label: '예약 내역',
      icon: MessageSquareText,
    },
    {
      key: 'my-activities',
      label: '내 체험 관리',
      icon: Settings,
    },
    {
      key: 'reserve-calendar',
      label: '예약 현황',
      icon: CalendarDays,
    },
  ];

  const { data: myData } = useMyProfile();

  return (
    <div className="shadow-experience-card flex h-[45rem] w-[32.7rem] flex-col items-center rounded-[1.2rem] border border-gray-50 bg-white px-[1.4rem] py-[2.4rem] md:h-[34.2rem] md:w-[17.8rem] lg:h-[45rem] lg:w-[29rem]">
      <Image
        src={myData?.profileImageUrl || defaultProfileImage}
        alt="profile-image"
        width={120}
        height={120}
        className="mb-[2.4rem] aspect-square w-[12rem] rounded-full object-cover md:mb-[1.2rem] md:w-[7rem] lg:mb-[2.4rem] lg:w-[12rem]"
      />
      <ul className="flex w-full flex-col gap-[1.4rem] md:gap-[1.2rem] lg:gap-[1.4rem]">
        {menus.map((menu) => {
          const isActive = pathname === `/my/${menu.key}`;
          const IconComponent = menu.icon;
          return (
            <li
              key={menu.key}
              className={`flex h-[5.4rem] w-full items-center rounded-[1.4rem] px-[1.5rem] text-[1.6rem] font-medium ${
                isActive ? 'bg-sub text-gray-950' : 'text-gray-600'
              } md:h-[4.8rem] lg:h-[5.4rem]`}
            >
              <div className="flex cursor-pointer gap-[0.8rem]">
                <IconComponent
                  className={`h-[2.4rem] w-[2.4rem] ${
                    isActive ? 'text-main' : 'text-gray-500'
                  }`}
                />
                <Link href={`/my/${menu.key}`}>{menu.label}</Link>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
