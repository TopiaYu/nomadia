import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { postReview } from '../api/bookingApi';
import { GetBookingResponse } from '../types/booking';

interface PostReviewParams {
  reservationId: number;
  rating: number;
  content: string;
}

/**
 * 리뷰 작성 mutation 훅
 */
export const usePostReviewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: PostReviewParams) => postReview(params),
    onSuccess: (data, variables) => {
      // 리뷰 작성 성공 시 해당 예약의 reviewSubmitted 상태를 즉시 업데이트
      queryClient.setQueryData(
        ['booking'],
        (oldData: GetBookingResponse | undefined) => {
          if (!oldData?.reservations) return oldData;

          return {
            ...oldData,
            reservations: oldData.reservations.map((reservation) =>
              reservation.id === variables.reservationId
                ? { ...reservation, reviewSubmitted: true }
                : reservation,
            ),
          };
        },
      );

      // 추가로 전체 booking 쿼리도 무효화하여 서버와 동기화
      queryClient.invalidateQueries({ queryKey: ['booking'] });
      queryClient.invalidateQueries({ queryKey: ['reviews', data.activityId] });
      toast.success('리뷰가 성공적으로 작성되었습니다.');
    },
    onError: (error) => {
      console.error('리뷰 작성 실패:', error);
      toast.error('리뷰 작성에 실패했습니다. 다시 시도해주세요.');
    },
  });
};
