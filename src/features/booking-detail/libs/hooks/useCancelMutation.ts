import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useScheduleIdStore } from '@/features/activityId/libs/stores/useScheduleIdStore';
import { removeReservation } from '@/features/activityId/libs/utils/addReservation';

import { cancelBooking } from '../api/bookingApi';

export const useCancelMutation = () => {
  const queryClient = useQueryClient();
  const { scheduleId } = useScheduleIdStore();

  return useMutation({
    mutationFn: cancelBooking,
    onSuccess: () => {
      // 예약 취소 성공 시 booking 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['booking'] });
      toast.success('예약이 성공적으로 취소되었습니다.');
      removeReservation(scheduleId);
    },
    onError: (error) => {
      console.error('예약 취소 실패:', error);
      toast.error('예약 취소에 실패했습니다. 다시 시도해주세요.');
    },
  });
};
