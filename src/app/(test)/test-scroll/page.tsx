//테스트 파일입니다. test-scroll
'use client';

import { useRef } from 'react';

import { getTestApi } from '@/features/(test)/getTestApi';
import { useItemInfiniteQuery } from '@/shared/libs/hooks/infiniteScroll/useInfiniteQuery';
import { useInfiniteScroll } from '@/shared/libs/hooks/infiniteScroll/useInfiniteScroll';

export default function Page() {
  // ✅ 무한 데이터 호출 함수 사용법(useInfiniteQuery 호출)
  // useItemInfiniteQuery로부터 { data, fetchNextPage, hasNextPage, isLoading, isError } 데이터를 받아와서 활용함.
  // useItemInfiniteQuery 호출 시, 매개변수로 keyName,getFn,params를 갖는 객체를 제출함
  // keyName = queryKey에 들어감
  // getFn = queryFn에 들어감(데이터를 불러올 get함수 작성)
  // params = get요청 시 뒤에 붙을 파라미터 항목
  //   * 주의! 정해진 문자열 타입의 경우, 단순 문자열로 작성 시 string타입으로 분류되어 에러 발생 가능 -> as const작성하여 리터럴 타입 유지하기
  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useItemInfiniteQuery({
      keyName: 'activities',
      getFn: getTestApi,
      params: {
        sort: 'most_reviewed' as const,
        size: 5,
      },
    });

  // ✅ 무한 스크롤 함수 사용법
  // 1. 무한 스크롤 트리거 등록: 아래의 ref가 붙은 트리거가 뷰포인트에 노출되면 다음 데이터를 불러오게 된다.
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // ✅
  // 2. useInfiniteScroll 호출하여 무한스크롤 로직 적용
  //    매개변수로  loadMoreRef, isLoading, hasNextPage, fetchNextPage, 50을 제출함
  // loadMoreRef = 트리거 요소
  // isLoading = 아직 앞 요청을 진행중인지(로딩중인지)
  // hasNextPage = 더 이상 불러올 데이터가 없는지
  // fetchNextPage = 다음 데이터를 불러오는 함수(useItemInfiniteQuery로부터 받음)
  // 50 = 트리거 요소의 위치를 기준으로, 몇px 먼저 노출되었을때 fetchNextPage를 호출할지.. 아래 예시는 50px로 적용되는 것임
  useInfiniteScroll(
    loadMoreRef,
    isLoading,
    hasNextPage,
    fetchNextPage,
    50, // 사전 로딩 거리(px)
  );

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러 발생!</div>;

  // 🐰 참고사항
  // 쿼리키는 queryKey: [keyName, params] 이렇게 설정되어서, 'keyName'캐시 내부의 'params' 캐시키를 갖는 page들이 들어있음.
  // 페이지 단위로 캐싱 되어있기 떄문에, flatMap: 여러 페이지(pages) 각각에 들어있는 activities 배열을 하나의 단일 배열로 이어붙이는(평탄화하는) 작업 필요함
  const test = data?.pages.flatMap((page) => page.activities);

  return (
    <>
      <div className="flex h-[50rem] w-2xl flex-col gap-2 overflow-scroll">
        {test?.map((t) => (
          <div key={t.id} className="rounded-2xl bg-amber-200 p-10">
            <div className="txt-16-medium">{t.title}</div>
            <div className="txt-16-medium">{t.price}</div>
          </div>
        ))}

        {/* 스크롤 트리거 요소 등록: 이 요소가 뷰포트에 노출되면 fetchNextPage가 호출됩니다 */}
        <div ref={loadMoreRef}></div>
      </div>
    </>
  );
}
