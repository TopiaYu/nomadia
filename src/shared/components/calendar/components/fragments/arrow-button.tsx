'use client';
import Image from 'next/image';

import { useCalendarStore } from '@/shared/components/calendar/libs/stores/useCalendarStore';
import { cn } from '@/shared/libs/cn';

interface ArrowButtonProps {
  type: 'left' | 'right';
  extraClassName?: string;
}

const ArrowButton = ({ type, extraClassName }: ArrowButtonProps) => {
  const { month, year, setMonth, setYear } = useCalendarStore();
  const isRight = type === 'right';

  const handleClick = () => {
    const isFirstMonth = month === 0;
    const isLastMonth = month === 11;

    if (isRight) {
      if (isLastMonth) {
        setYear(year + 1);
        setMonth(0);
      } else {
        setMonth(month + 1);
      }
    } else {
      if (isFirstMonth) {
        setYear(year - 1);
        setMonth(11);
      } else {
        setMonth(month - 1);
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      className={cn('cursor-pointer focus:outline-none', extraClassName)}
      aria-label={`${type === 'left' ? '이전' : '다음'} 달로 이동`}
    >
      <Image
        src="/images/icons/arrow.svg"
        alt="arrow button"
        width={24}
        height={24}
        className={cn(type === 'right' && 'scale-x-[-1] transform')}
      />
    </button>
  );
};
export default ArrowButton;
