import { ChevronLeft, ChevronRight } from 'lucide-react';

import { cn } from '@/shared/libs/cn';
/**
 * @property totalPages 전체 페이지 수 (예: API 응답으로부터 추출)
 * @property currentPage 현재 페이지 번호 (page)
 * @property setPage 페이지 상태를 변경하는 함수 (setPage)
 */
type PaginationProps = {
  totalPages: number;
  currentPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  className?: string;
};

/**
 * 페이지네이션 컴포넌트입니다.
 * 페이지 버튼 클릭 시 `setPage`를 호출해 상위 컴포넌트의 `page` 상태를 업데이트합니다.
 *
 * 좌측 화살표:
 *   - 이전 페이지 그룹으로 이동합니다.
 *   - `currentPage`를 페이지 그룹의 마지막 요소로 업데이트합니다.
 *   - 현재 페이지가 페이지 그룹 크기보다 작으면 비활성화됩니다.
 *
 * 우측 화살표:
 *   - 다음 페이지 그룹으로 이동합니다.
 *   - `currentPage`를 페이지 그룹의 첫 번째 요소로 업데이트합니다.
 *   - 페이지 그룹의 마지막 요소가 `totalPages`와 같거나 크면 비활성화됩니다.
 *
 * ### 사용 예시 코드
 * ```tsx
 * 'use client';
 * import { useState, useEffect } from 'react';
 * import Pagination from '@/shared/components/pagination/pagination';
 *
 * export default function Page() {
 *   const [page, setPage] = useState(1);
 *
 *   useEffect(() => {
 *     fetchData({ page }); // 페이지 변경 시 API 호출
 *   }, [page]);
 *
 *   return <Pagination totalPages={33} currentPage={page} setPage={setPage} />;
 * }
 * ```
 */

const Pagination = ({
  totalPages,
  currentPage,
  setPage,
  className = '',
}: PaginationProps) => {
  if (totalPages <= 0) return null;

  const PAGE_GROUP_SIZE = 5;
  const pageGroupNum = Math.ceil(currentPage / PAGE_GROUP_SIZE);
  const startPage = pageGroupNum * PAGE_GROUP_SIZE - PAGE_GROUP_SIZE + 1; //-4
  const endPage = Math.min(totalPages, startPage + PAGE_GROUP_SIZE - 1); //+4

  const pageRange = [];
  for (let i = startPage; i <= endPage; i++) {
    pageRange.push(i);
  }

  const leftDisable = currentPage <= PAGE_GROUP_SIZE;
  const rightDisable = pageGroupNum * PAGE_GROUP_SIZE >= totalPages;
  const showButton = totalPages <= PAGE_GROUP_SIZE;

  return (
    <div className={cn('flex', className)}>
      {!showButton && (
        <button
          onClick={() => {
            setPage((pageGroupNum - 1) * PAGE_GROUP_SIZE);
          }}
          disabled={leftDisable}
          aria-label="이전 페이지 그룹으로"
          className="flex-center size-[4rem]"
        >
          <ChevronLeft
            size={17}
            strokeWidth={3}
            color={leftDisable ? '#B3B4BC' : '#1F1F22'}
          />
        </button>
      )}

      {pageRange.map((page) => (
        <button
          key={page}
          onClick={() => setPage(page)}
          aria-label={`${page}페이지 ${page === currentPage ? '(현재 페이지)' : ''}`}
          aria-current={page === currentPage ? 'page' : undefined}
          className={cn(
            'size-[4rem] text-[1.4rem] font-medium text-gray-300',
            page === currentPage &&
              'border-b-main border-b-2 font-bold text-gray-950',
          )}
        >
          {page}
        </button>
      ))}
      {!showButton && (
        <button
          onClick={() => {
            setPage(pageGroupNum * PAGE_GROUP_SIZE + 1);
          }}
          disabled={rightDisable}
          aria-label="다음 페이지 그룹으로"
          className="flex-center size-[4rem]"
        >
          <ChevronRight
            size={17}
            strokeWidth={3}
            color={rightDisable ? '#B3B4BC' : '#1F1F22'}
          />
        </button>
      )}
    </div>
  );
};

export default Pagination;
