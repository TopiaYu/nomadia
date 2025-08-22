'use client';

import { Button } from '@/shared/libs/shadcn/components/ui/button';

import { BOOKING_STATUS } from '../libs/constants/bookingStatus';

interface FilterButtonProps {
  active: string;
  onChange: (status: string) => void;
}

/**
 * 예약 상태 필터 버튼 컴포넌트
 * @description 예약 상태 필터 버튼 컴포넌트
 * @author 김영현
 * @param active 현재 선택된 상태
 * @param onChange 상태 변경 핸들러
 */
const FilterButtons = ({ active, onChange }: FilterButtonProps) => {
  return (
    <div className="category-scroll mt-[1.4rem] mb-[2.4rem] flex flex-nowrap gap-[1rem] overflow-x-auto px-[1rem] py-[0.5rem] whitespace-nowrap">
      {BOOKING_STATUS.map(({ label, value }) => (
        <Button
          key={label}
          variant={active === value ? 'selected' : 'default'}
          size="sm"
          className="group cursor-pointer px-[1.1rem] py-[1.6rem]"
          onClick={() => onChange(active === value ? '' : value)}
        >
          {label}
        </Button>
      ))}
    </div>
  );
};

export default FilterButtons;
