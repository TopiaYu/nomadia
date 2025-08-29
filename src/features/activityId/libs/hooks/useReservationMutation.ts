import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { postReservationForm } from '@/features/activityId/libs/api/postReservationForm';
import { ReservationRequestBody } from '@/features/activityId/libs/types/reservationType';
import { useCalendarStore } from '@/shared/components/calendar/libs/stores/useCalendarStore';
import { useModalStore } from '@/shared/components/modal/libs/stores/useModalStore';

interface ReservationVariables {
  activityId: number;
  body: ReservationRequestBody;
}

export const useReservationMutation = () => {
  const queryClient = useQueryClient();
  const { openModal } = useModalStore();
  const { resetSelectedDate, resetDate } = useCalendarStore();

  return useMutation({
    mutationFn: ({ activityId, body }: ReservationVariables) =>
      postReservationForm(activityId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['booking'],
      });
      openModal('success');
      resetSelectedDate();
      resetDate();
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        const errorMessage =
          err.response?.data.message ?? '일시적인 오류가 발생했습니다.';
        alert(`${errorMessage}`);
      }
    },
  });
};
