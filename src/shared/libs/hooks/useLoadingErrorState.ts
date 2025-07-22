/**
 * 로딩, 에러 상태 처리 훅 추후 아래와 같이 리팩토링 필요. (LoadingSpinner, ErrorMessage 컴포넌트 추가 필요)
export const useLoadingErrorState = (isLoading: boolean, isError: boolean) => {
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (isError) {
    return <ErrorMessage message="데이터를 불러오는 중 오류가 발생했습니다." />;
  }
  return null;
};
   */
