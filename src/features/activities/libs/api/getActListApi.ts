import axios from 'axios';

import {
  GetActListApiParams,
  GetActListApiResponse,
} from '@/features/activities/libs/types/activity';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!BASE_URL) {
  throw new Error('NEXT_PUBLIC_API_BASE_URL 환경 변수가 설정되지 않았습니다.');
}

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * 체험 리스트 조회 GET 요청
 * @author 김영현
 * @since 2025-07-16
 * @param params 체험 리스트 조회 요청 파라미터 (옵션)
 * @returns 체험 리스트 조회 응답 데이터
 */
export const getActListApi = async (
  params?: GetActListApiParams,
): Promise<GetActListApiResponse> => {
  const { data } = await instance.get('activities?method=offset', { params });
  return data;
};
