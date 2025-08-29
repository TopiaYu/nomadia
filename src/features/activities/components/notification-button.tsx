'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

import { useNotifications } from '@/features/activities/libs/hooks/useNotifications';
import NotificationModal from '@/shared/components/modal/components/notification-modal';
import { useNotificationStore } from '@/shared/libs/stores/useNotificationStore';

const NotificationButton = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { isNotificationOpen, toggleNotification, closeNotification } =
    useNotificationStore();

  const { data } = useNotifications();
  const hasNotifications =
    data?.pages?.some((page) => page.notifications.length > 0) ?? false;

  // 바깥 클릭 시 모달 닫기
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        closeNotification();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [closeNotification]);

  return (
    <div className="relative" ref={ref}>
      <button
        className="cursor-pointer rounded p-2"
        onClick={toggleNotification}
      >
        <Image
          src={
            hasNotifications
              ? '/images/icons/alarm.svg'
              : '/images/icons/no-alarm.svg'
          }
          alt="알람"
          width={24}
          height={24}
        />
      </button>
      {isNotificationOpen && <NotificationModal />}
    </div>
  );
};

export default NotificationButton;
