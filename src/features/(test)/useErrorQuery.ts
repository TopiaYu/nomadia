// 테스트 파일입니다. test-error
import { useQuery } from '@tanstack/react-query';

import { testInstance } from '@/features/(test)/testInstance';

// 로그인 안 한 상태로 post 요청 보내봄 -> 401에러
const postError = async () => {
  const { data } = await testInstance.post('activities/7/reservations');
  return data;
};

export const useErrorQuery = () => {
  return useQuery({
    queryKey: ['reserveActivity', 7],
    queryFn: postError,
    retry: false, // 실패 시 자동 재시도 막음
  });
};
