'use client';

import { useRef } from 'react';

import { useNotifications } from '@/features/activities/libs/hooks/useNotifications';
import { useInfiniteScroll } from '@/shared/libs/hooks/infiniteScroll/useInfiniteScroll';

const NotificationModal = () => {
  const { data, isLoading, hasNextPage, fetchNextPage } = useNotifications();

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useInfiniteScroll(loadMoreRef, isLoading, !!hasNextPage, fetchNextPage, 100);

  const notifications = data?.pages.flatMap((page) => page.notifications) ?? [];

  return (
    <div className="absolute right-0 z-10 mt-2 max-h-96 w-80 overflow-y-auto rounded-lg border bg-white shadow-md">
      <div className="border-b p-4 text-lg font-semibold">알림</div>
      {notifications.length === 0 && (
        <div className="p-4 text-center text-sm text-gray-400">
          아직 알림이 없습니다.
        </div>
      )}
      <ul className="divide-y">
        {notifications.map((notification) => (
          <li key={notification.id} className="px-4 py-3 text-sm text-gray-800">
            <div>{notification.content}</div>
            <div className="text-xs text-gray-400">
              {new Date(notification.createdAt).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>

      <div ref={loadMoreRef} className="h-1" />
    </div>
  );
};

export default NotificationModal;
