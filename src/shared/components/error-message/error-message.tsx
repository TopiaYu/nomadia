interface ErrorMessageProps {
  message?: string;
  className?: string;
}

export const ErrorMessage = ({
  message = '데이터를 불러오는 중 오류가 발생했습니다.',
  className = '',
}: ErrorMessageProps) => {
  return (
    <div className={`flex-center h-[16rem] text-red-500 ${className}`}>
      <span className="text-[1.6rem] font-semibold md:text-[1.8rem] lg:text-[2rem]">
        {message}
      </span>
    </div>
  );
};
