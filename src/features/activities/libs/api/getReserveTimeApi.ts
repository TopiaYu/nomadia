import { useAuthStore } from '@/features/auth/stores/useAuthStore';

export type ReservationFromApi = {
  id: number;
  nickname: string;
  userId: number;
  teamId: string;
  activityId: number;
  scheduleId: number;
  status: string;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
};

export type ApiResponse = {
  cursorId: number;
  totalCount: number;
  reservations: ReservationFromApi[];
};

export async function getReserveTimeApi(
  activityId: number,
  scheduleId: number,
  status?: string,
  size: number = 10,
  cursorId?: number,
): Promise<ApiResponse> {
  const token = useAuthStore.getState().accessToken;

  if (!token) {
    throw new Error('인증 토큰이 없습니다.');
  }

  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/my-activities/${activityId}/reservations`,
  );
  url.searchParams.append('size', String(size));
  url.searchParams.append('scheduleId', String(scheduleId));
  if (status) {
    url.searchParams.append('status', status);
  }
  if (cursorId !== undefined) {
    url.searchParams.append('cursorId', String(cursorId));
  }

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('예약 데이터 조회 실패');
  }

  const data = await res.json();
  console.log('API 응답 데이터 전체:', data);
  return data;
}
