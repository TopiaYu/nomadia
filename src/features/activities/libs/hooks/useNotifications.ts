import {
  type QueryFunctionContext,
  useInfiniteQuery,
} from '@tanstack/react-query';
import axios from 'axios';

import { useAuthStore } from '@/features/auth/stores/useAuthStore';
import type { Notification } from '@/features/auth/types/notification';

interface NotificationsResponse {
  cursorId: number;
  notifications: Notification[];
  totalCount: number;
}

export const fetchNotifications = async ({
  pageParam = 1,
}: QueryFunctionContext): Promise<NotificationsResponse> => {
  const page = typeof pageParam === 'number' ? pageParam : 1;
  const token = useAuthStore.getState().accessToken;

  if (!token) {
    throw new Error('액세스 토큰이 존재하지 않습니다.');
  }

  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/my-notifications`,
    {
      params: { page, size: 10 },
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  return res.data;
};

export const useNotifications = () =>
  useInfiniteQuery<NotificationsResponse, Error>({
    queryKey: ['notifications'],
    queryFn: fetchNotifications,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.notifications.length < 10) return undefined;
      return allPages.length + 1;
    },
  });
