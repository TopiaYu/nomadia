import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteActivities } from '@/features/my/my-activities/lib/api/myActivities.api';

export const useDeleteActivityMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (activityId: number) => deleteActivities(activityId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      queryClient.invalidateQueries({ queryKey: ['myActivities'] });
      toast.success('체험 삭제가 완료되었습니다.');
    },
    onError: () => {
      alert('체험 삭제를 실패했습니다.');
    },
  });
};
