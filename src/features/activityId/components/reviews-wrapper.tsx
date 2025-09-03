import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import Reviews from '@/features/activityId/components/reviews';
import { getReviewsInServer } from '@/features/activityId/libs/api/getReviews';
import { textStyle } from '@/features/activityId/libs/constants/variants';
import { ReviewResponse } from '@/features/activityId/libs/types/reviewResponse';
import { formatRating } from '@/features/activityId/libs/utils/formatRating';
import { ErrorMessage, StarImage } from '@/shared/components';
import { formatPrice } from '@/shared/libs/utils/formatPrice';

const ReviewsWrapper = async ({ activityId }: { activityId: number }) => {
  // getReviewsInServer
  const queryClient = new QueryClient();
  let data: ReviewResponse | undefined;
  try {
    data = await queryClient.fetchQuery({
      queryKey: ['reviews', activityId, 1, true],
      queryFn: () => getReviewsInServer(activityId, { page: 1, size: 3 }),
    });
  } catch (error) {
    console.log(error);
    if (error) return <ErrorMessage />;
  }

  return (
    <>
      <section
        aria-labelledby="review-heading"
        className="flex flex-col gap-[0.8rem]"
      >
        <header className="flex items-center gap-[0.8rem]">
          <h2 className={textStyle.h2}>체험 후기</h2>
          {data && (
            <p className={'text-[1.4rem] font-semibold text-gray-600'}>
              {formatPrice(data?.totalCount)}개
            </p>
          )}
        </header>
        <h3 className="flex-center mb-[3rem] flex-col gap-[0.6rem]">
          <span className="block text-[2.4rem] font-semibold text-gray-950">
            {data?.averageRating.toFixed(1)}
          </span>
          <span className="block text-[1.4rem] font-bold text-gray-950">
            {formatRating(data?.averageRating, data?.totalCount)}
          </span>
          <div className="flex-center">
            <StarImage />
            {data && (
              <span className="ml-0.5 text-[1.4rem] font-medium text-gray-600">
                {formatPrice(data?.totalCount)}개 후기
              </span>
            )}
          </div>
        </h3>
      </section>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Reviews activityId={activityId} />
      </HydrationBoundary>
    </>
  );
};
export default ReviewsWrapper;
