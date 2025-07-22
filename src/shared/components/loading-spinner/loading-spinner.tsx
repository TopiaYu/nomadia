import { LoaderCircle } from 'lucide-react';

/**
 * @author 김영현
 * @returns 로딩 스피너 컴포넌트
 * @description 로딩 상태를 표시하는 컴포넌트입니다. (반응형 고려 완료)
 */
const LoadingSpinner = () => {
  return (
    <div className="flex-center h-full w-full">
      <LoaderCircle className="text-main size-[3rem] animate-spin md:size-[4rem] lg:size-[6rem]" />
    </div>
  );
};

export default LoadingSpinner;
