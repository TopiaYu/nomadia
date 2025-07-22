import { UseInfiniteQueryResult } from '@tanstack/react-query';
import { RefObject, useEffect, useRef } from 'react';

/**
 * @author 지윤
 * @description IntersectionObserver를 활용한 무한 스크롤 훅.
 * - 역할: 스크롤 -> 다음 데이터 자동 호출 함
 * - 작동: 특정 요소(loadMoreRef)가 뷰포트에 노출되면 fetchNextPage를 호출한다.
 * 
 * @template R 무한 스크롤로 가져올 데이터의 타입
 *
 * @param {RefObject<HTMLDivElement | null>} loadMoreRef - 스크롤 트리거가 될 DOM 요소의 ref
 * @param {boolean} isLoading - 현재 데이터 로딩 여부
 * @param {boolean} hasNextPage - 다음 페이지 존재 여부
 * @param {Function} fetchNextPage - 다음 페이지를 가져오는 함수 (useInfiniteQuery에서 제공)
 * @param {number} triggerMargin - 트리거가 뷰포트에 얼마나 가까워졌을 때 호출할지(px)
 * 
 * 🐰 { isLoading, hasNextPage, fetchNextPage }은 @function useItemInfiniteQuery 로부터 받을 수 있음
 * 
/**
 * @example page.tsx에서의 사용법
 *
 * ```tsx
 * // 1. 트리거 요소 등록
 * const loadMoreRef = useRef<HTMLDivElement | null>(null);
 *
 * // 2. useInfiniteScroll 훅 호출
 * useInfiniteScroll(loadMoreRef, isLoading, hasNextPage, fetchNextPage, 50);
 *
 * return (
 *   <>
 *     ... 데이터 목록 ...
 *     <div ref={loadMoreRef}></div>
 *   </>
 * );
 * ```
 * 
 */

export const useInfiniteScroll = <R>(
  loadMoreRef: RefObject<HTMLDivElement | null>,
  isLoading: boolean,
  hasNextPage: boolean,
  fetchNextPage: UseInfiniteQueryResult<R, Error>['fetchNextPage'], //useInfiniteQuery훅이 반환하는 객체 내부의 fetchNextPage프로퍼티의 타입
  triggerMargin: number,
) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (isLoading || !hasNextPage || !loadMoreRef?.current) return;
    if (observerRef.current) observerRef.current.disconnect(); // 기존 옵저버 해제
    observerRef.current = new IntersectionObserver( // 새 옵저버 생성
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      {
        rootMargin: `${triggerMargin}px`,
      },
    );

    observerRef.current.observe(loadMoreRef.current);

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [isLoading, hasNextPage, loadMoreRef, triggerMargin, fetchNextPage]);
};
