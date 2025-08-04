'use client';

import Image from 'next/image';
import { useRef } from 'react';

import { useNotifications } from '@/features/activities/libs/hooks/useNotifications';
// import NotificationModal from '@/shared/components/modal/components/notification-modal';
// import { useModalStore } from '@/shared/libs/stores/useModalStore';

const NotificationButton = () => {
  const ref = useRef<HTMLDivElement>(null);

  // const { isNotificationOpen, openNotification, closeNotification } =
  //   useModalStore();

  const { data } = useNotifications();
  const hasNotifications =
    data?.pages?.some((page) => page.notifications.length > 0) ?? false;

  // useEffect(() => {
  //   const handler = (e: MouseEvent) => {
  //     if (ref.current && !ref.current.contains(e.target as Node)) {
  //       closeNotification();
  //     }
  //   };
  //   document.addEventListener('mousedown', handler);
  //   return () => document.removeEventListener('mousedown', handler);
  // }, [closeNotification]);

  return (
    <div className="relative" ref={ref}>
      <button
        // onClick={() =>
        //   isNotificationOpen ? closeNotification() : openNotification()
        // }
        className="cursor-pointer rounded p-2"
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
      {/* {isNotificationOpen && <NotificationModal />} */}
    </div>
  );
};

export default NotificationButton;

//주석처리 필요(?)
