import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { registrationApi } from '@/features/activity-registration/libs/api/registrationApi';
import { ActivityRegistrationParams } from '@/shared/types/activity';

export const useRegistrationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: ActivityRegistrationParams) => registrationApi(params),
    onSuccess: () => {
      // 성공 시 관련 쿼리들을 무효화하여 새로고침
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      queryClient.invalidateQueries({ queryKey: ['my-activities'] });
      // toast 메시지 제거 - 모달로 대체
    },
    onError: (error) => {
      console.error('체험 등록 실패:', error);
      toast.error('체험 등록에 실패했습니다. 다시 시도해주세요.');
    },
  });
};
