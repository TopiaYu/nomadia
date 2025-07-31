'use client';

import { Button } from '@/shared/libs/shadcn/components/ui/button';

import { BOOKING_STATUS } from '../libs/constants/bookingStatus';

interface FilterButtonProps {
  active: string;
  onChange: (status: string) => void;
}

const FilterButtons = ({ active, onChange }: FilterButtonProps) => {
  return (
    <div className="category-scroll mt-[1.4rem] mb-[2.4rem] flex flex-nowrap gap-[0.5rem] overflow-x-auto whitespace-nowrap">
      {BOOKING_STATUS.map(({ label, value }) => (
        <Button
          key={label}
          variant={active === value ? 'selected' : 'default'}
          size="sm"
          className="group px-[1.1rem] py-[1.6rem]"
          onClick={() => onChange(active === value ? '' : value)}
        >
          {label}
        </Button>
      ))}
    </div>
  );
};

export default FilterButtons;
