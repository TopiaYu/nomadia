'use client';
import { useState } from 'react';

import { useReviewsQuery } from '@/features/activityId/libs/hooks/useReviewsQuery';
import { ErrorMessage } from '@/shared/components';
import Pagination from '@/shared/components/pagination/pagination';
import { DetailReviewsSkeleton } from '@/shared/components/skeleton/skeleton';
import StarImage from '@/shared/components/star/star';
import { cn } from '@/shared/libs/cn';

import { formatDateWithDots } from '../libs/utils/formatDateWithDots';

const Reviews = ({ activityId }: { activityId: number }) => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useReviewsQuery(activityId, {
    page: page,
    size: 3,
  });
  const isPageNecessary = data && data.totalCount > 0;

  if (isLoading) return <DetailReviewsSkeleton />;
  if (isError) return <ErrorMessage />;
  return (
    <>
      {/* 후기 리스트 - 따로 api 호출 필요 */}
      <ul>
        {data?.reviews.map((review, idx) => {
          return (
            <li key={idx}>
              <article
                className={cn(
                  'shadow-experience-card mb-[4rem] rounded-[2.4rem] bg-white p-[2rem]',
                  idx === 2 && 'mb-[3rem]',
                )}
              >
                <header className="flex items-center gap-[0.8rem]">
                  <h3 className="text-[1.4rem] font-semibold text-gray-950">
                    {review.user.nickname}
                  </h3>
                  <time
                    dateTime={review.createdAt}
                    className="text-[1.2rem] font-semibold text-gray-400"
                  >
                    {formatDateWithDots(review.createdAt)}
                  </time>
                </header>
                <section className="mt-[0.4rem] mb-[0.8rem] flex items-center">
                  {Array.from({ length: review.rating }, (_, idx) => (
                    <StarImage key={idx} />
                  ))}
                </section>
                <p className="text-[1.4rem] text-gray-950 md:text-[1.6rem]">
                  {review.content}
                </p>
              </article>
            </li>
          );
        })}
      </ul>
      {isPageNecessary && (
        <Pagination
          totalPages={data?.totalCount}
          currentPage={page}
          setPage={setPage}
          className="mb-[7.5rem] justify-center lg:mb-[17rem]"
          isTotalCount={true}
        />
      )}
    </>
  );
};

export default Reviews;
