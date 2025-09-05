import { TriangleAlert } from 'lucide-react';

interface ErrorMessageProps {
  message?: string;
  className?: string;
}

export const ErrorMessage = ({
  message = '데이터를 불러오는 중 오류가 발생했습니다.',
  className = '',
}: ErrorMessageProps) => {
  return (
    <div className={`flex-center h-[16rem] flex-col gap-[1.6rem] ${className}`}>
      <TriangleAlert strokeWidth={2} className="size-[10rem] text-gray-200" />
      <span className="text-[1.6rem] font-semibold text-gray-700 md:text-[1.8rem]">
        {message}
      </span>
    </div>
  );
};
