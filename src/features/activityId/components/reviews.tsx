//컴포넌트랑, 응답 타입명이랑 겹칠때가 있는데, 보통 컴포넌트 뒤에 리뷰컴포넌트 이렇게 붙여서 작성하기도 하는지?
//리뷰리스폰스 이렇게 하긴 했는데, 또 내부적으로 리뷰랑 리뷰 컴포넌트랑 겹침.
// 걍 리뷰 타입으로 비꿔야겟다. 그게 일반적일듯..

import { useState } from 'react';

import { activityIdStyle } from '@/features/activityId/libs/constants/variants';
import { useReviewsQuery } from '@/features/activityId/libs/hooks/useReviewsQuery';
import { formatRating } from '@/features/activityId/libs/utils/formatRating';
import Pagination from '@/shared/components/pagination/pagination';
import StarImage from '@/shared/components/star/star';
import { cn } from '@/shared/libs/cn';
import { formatPrice } from '@/shared/libs/utils/formatPrice';

import { formatDateWithDots } from '../libs/utils/formatDateWithDots';

const Reviews = ({ activityId }: { activityId: number }) => {
  const [page, setPage] = useState(1);
  const { data } = useReviewsQuery(activityId, { page: page, size: 3 });
  const isPageNecessary = data && data.totalCount > 0;
  return (
    <>
      <section
        aria-labelledby="review-heading"
        className="flex flex-col gap-[0.8rem]"
      >
        <header className="flex items-center gap-[0.8rem]">
          <h2 className={activityIdStyle.h2}>체험 후기</h2>
          {data && (
            <p className="text-[1.4rem] font-semibold text-gray-600">
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
        />
      )}
    </>
  );
};

export default Reviews;
