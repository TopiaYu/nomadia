import { useInfiniteQuery } from '@tanstack/react-query';

type WithCursorId = { cursorId?: number }; // 응답에 반드시 포함될 값

/**
 * @author 지윤
 * @description 커서 기반 무한스크롤을 위한 React Query 훅.
 * - 역할: 데이터 호출
 * - 작동: 내부적으로 useInfiniteQuery 사용하며, 응답 객체를 반환함
 * - 초기 pageParam: undefined → 첫 페이지
 * - 이후 pageParam: 마지막 응답에서 반환된 cursorId
 *
 * @template P 요청 파라미터 타입
 * @template R 응답 데이터 타입 (cursorId 포함 필요)
 *
 * @param {Object} params
 * @param {string} params.keyName - React Query의 쿼리 키
 * @param {(params: P & { cursorId?: number }) => Promise<R>} params.getFn - 데이터를 가져오는 비동기 함수: 직접 작성해야 함 -> getApi.ts 참고
 * @param {P} params.params - 요청에 전달할 파라미터 객체
 *
 * @returns useInfiniteQuery에서 반환하는 결과 객체
 * @example page.tsx에서의 사용법
 *
 * ```tsx
 * const { data, fetchNextPage, hasNextPage, isLoading, isError } =
 *   useItemInfiniteQuery({
 *     keyName: 'activities',        // queryKey에 들어감
 *     getFn: getApi,                // queryFn에 들어감: 실제 API 호출 함수
 *     params: {
 *       sort: 'most_reviewed' as const,  // string 리터럴 타입 유지 필수 (타입 오류 방지)
 *       size: 6,                          // 불러오는 아이템 개수
 *     },
 *   });
 *
 * // 🐰 주의: sort처럼 params 객체 내에 리터럴 문자열이 있는 경우 `as const`를 붙이지 않으면 string으로 추론되어 타입 에러가 발생할 수 있습니다.
 * // 🐰 실제 무한스크롤 로직까지 적용하려면 useInfiniteScroll 함수도 함께 사용하셔야 합니다.
 * ```
 */
export function useItemInfiniteQuery<P extends object, R extends WithCursorId>({
  keyName,
  getFn,
  params,
}: {
  keyName: string;
  getFn: (params: P & { cursorId?: number }) => Promise<R>;
  params: P;
}) {
  return useInfiniteQuery<R, Error>({
    queryKey: [keyName, params],
    queryFn: ({ pageParam }) =>
      getFn({ ...params, cursorId: pageParam as number | undefined }), //pageParam은 useInfiniteQuery 내부에서 자동으로 넘겨주는 값이며,이를 cursorId로 전달하여 다음 페이지 데이터를 요청함
    getNextPageParam: (lastPage) => lastPage.cursorId ?? undefined, //다음 페이지 호출을 위한 cursorID 값 확보(pageParam값 설정)
    initialPageParam: undefined,
  });
}
