import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postReservationForm } from '@/features/activityId/libs/api/postReservationForm';
import { ReservationRequestBody } from '@/features/activityId/libs/types/reservationType';

interface ReservationVariables {
  activityId: number;
  body: ReservationRequestBody;
}

export const useReservationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ activityId, body }: ReservationVariables) =>
      postReservationForm(activityId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['booking'],
      });
    },
  });
};
