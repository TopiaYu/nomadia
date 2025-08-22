import { useAuthStore } from '@/features/auth/stores/useAuthStore';

export async function updateReservationStatus(
  teamId: string,
  activityId: number,

  reservationId: number,
  status: 'confirmed' | 'declined',
): Promise<void> {
  const token = useAuthStore.getState().accessToken;

  if (!token) {
    throw new Error('인증 토큰이 없습니다.');
  }

  const url = new URL(
    `https://sp-globalnomad-api.vercel.app/${teamId}/my-activities/${activityId}/reservations/${reservationId}`,
  );

  const res = await fetch(url, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) {
    throw new Error('예약 상태 업데이트 실패');
  }
}
