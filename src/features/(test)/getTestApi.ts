// 테스트 파일입니다. test-scroll
import { testInstance } from '@/features/(test)/testInstance';
import {
  GetActListApiParams,
  GetActListApiResponse,
} from '@/shared/types/activity';

interface GetListWithCursorID extends GetActListApiParams {
  cursorId?: number; // 요청 파라미터에 - 커서 항목 필수
}

export const getTestApi = async (
  params?: GetListWithCursorID,
): Promise<GetActListApiResponse> => {
  const { data } = await testInstance.get('activities?method=cursor', {
    params,
  });
  return data;
};
