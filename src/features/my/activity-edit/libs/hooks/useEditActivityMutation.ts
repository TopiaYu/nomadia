import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { editActivity } from '@/features/my/activity-edit/libs/api/activity-edit.api';
import { EditActivityRequest } from '@/features/my/activity-edit/libs/types/types';

interface EditActivityParams {
  id: number;
  payload: EditActivityRequest;
}

export const useEditActivityMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: EditActivityParams) =>
      editActivity(id, payload),
    onSuccess: (data, variables) => {
      const activityId = variables.id;
      toast.success('체험 수정이 완료되었습니다.');
      queryClient.invalidateQueries({
        queryKey: ['activityId', String(activityId)], //타입변환
      });
      queryClient.invalidateQueries({
        queryKey: ['schedule', activityId],
      });
      router.push('/my/my-activities');
    },
    onError: (error) => {
      console.error('체험 수정 실패:', error);
      toast.error('체험 수정에 실패했습니다. 다시 시도해주세요.');
    },
  });
};
