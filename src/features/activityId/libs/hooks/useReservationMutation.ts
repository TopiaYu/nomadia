import { useMutation } from '@tanstack/react-query';

import { postReservationForm } from '@/features/activityId/libs/api/postReservationForm';
import { ReservationRequestBody } from '@/features/activityId/libs/types/reservationType';

export const useReservationMutation = (activityId: number) => {
  return useMutation({
    mutationFn: (body: ReservationRequestBody) =>
      postReservationForm(activityId, body),
  });
};
