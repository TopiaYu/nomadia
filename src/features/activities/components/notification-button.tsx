'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import NotificationModal from '@/shared/components/modal/components/notification-modal';

const NotificationButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // 바깥 클릭 시 닫기
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="rounded p-2"
      >
        <Image
          src="/images/icons/alarm.svg"
          alt="알람"
          width={24}
          height={24}
        />
      </button>
      {isOpen && <NotificationModal />}
    </div>
  );
};

export default NotificationButton;
