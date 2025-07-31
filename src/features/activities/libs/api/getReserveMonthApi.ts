import axios from 'axios';

import { useAuthStore } from '@/features/auth/stores/useAuthStore';
import { MonthReservations } from '@/shared/components/calendar/libs/types/data';

interface FindReservationsByMonthParams {
  activityId: string;
  year: number;
  month: number;
}

/**
 * 내 체험 월별 예약 현황 조회 API 호출 함수
 * @param params - activityId, year, month
 * @returns 월별 예약 현황 배열
 */
export const getReservationsByMonthApi = async ({
  activityId,
  year,
  month,
}: FindReservationsByMonthParams): Promise<MonthReservations[]> => {
  try {
    const token = useAuthStore.getState().accessToken;

    if (!token) {
      throw new Error('accessToken이 없습니다. 로그인 후 다시 시도해주세요.');
    }

    const formattedMonth = month.toString().padStart(2, '0');

    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/my-activities/${activityId}/reservation-dashboard`;

    const response = await axios.get<MonthReservations[]>(url, {
      params: { year, month: formattedMonth },
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('내 체험 월별 예약 현황 조회 실패', error);
    throw error;
  }
};
