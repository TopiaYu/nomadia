import { formatDateToShortSlash } from '@/features/activityId/libs/utils/formatDateToShortSlash';
import { useModalStore } from '@/shared/components/modal/libs/stores/useModalStore';
import { cn } from '@/shared/libs/cn';
import useWindowSize from '@/shared/libs/hooks/useWindowSize';
import { formatPrice } from '@/shared/libs/utils/formatPrice';

interface SubmitButtonMobileProps {
  headCount: number;
  price: number | undefined;
  countUpdateForRender: number;
  selectedDate: string | null;
  selectedTime: string;
}

const SubmitInfoMobile = ({
  headCount,
  price,
  countUpdateForRender,
  selectedDate,
  selectedTime,
}: SubmitButtonMobileProps) => {
  const { isDesktop } = useWindowSize();
  const { appear, appearModal } = useModalStore();

  return (
    <>
      {/* Group - 0000원/n명 + 00/00/00 00:00~00:00 */}
      <div
        className={cn(
          'flex h-[2.4rem] w-full flex-wrap items-center justify-between',
          'lg:h-[5rem] lg:w-fit',
          appear ? 'hidden' : '',
        )}
      >
        {/* 가격/n명 */}
        <p className="flex-center gap-[0.6rem]">
          {isDesktop && (
            <span className="text-[2rem] text-gray-700">총 합계</span>
          )}
          {price && (
            <span className="inline-block text-[1.8rem] leading-none font-bold text-gray-950">
              ₩{formatPrice(price * countUpdateForRender)}
            </span>
          )}
          {!isDesktop && (
            <span className="inline-block text-[1.6rem] leading-none text-gray-800">
              / {headCount}명
            </span>
          )}
        </p>
        {/* 00/00/00 00:00~00:00 */}
        <button
          className="text-main cursor-pointer text-[1.6rem] font-bold underline underline-offset-4 lg:hidden"
          onClick={() => !appear && appearModal()}
          type="button"
        >
          {selectedDate &&
            `${formatDateToShortSlash(selectedDate)}  ${selectedTime}`}
          {selectedDate && !selectedTime && ', 시간을 선택해주세요'}
        </button>
      </div>
    </>
  );
};
export default SubmitInfoMobile;
