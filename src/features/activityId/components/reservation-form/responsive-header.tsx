import { ArrowLeft, X } from 'lucide-react';

import { useModalStore } from '@/shared/components/modal/libs/stores/useModalStore';
import useWindowSize from '@/shared/libs/hooks/useWindowSize';
import { formatPrice } from '@/shared/libs/utils/formatPrice';

interface ResponsiveHeaderProps {
  nextStep: boolean;
  setNextStep: React.Dispatch<React.SetStateAction<boolean>>;
  price: number | undefined;
}

const ResponsiveHeader = ({
  nextStep,
  setNextStep,
  price,
}: ResponsiveHeaderProps) => {
  const { isDesktop, isMobile } = useWindowSize();
  const { appear, disappearModal } = useModalStore();

  return (
    <>
      {!isDesktop && appear && (
        <button onClick={disappearModal}>
          <X className="absolute top-[2.4rem] right-[2.4rem] md:right-[3rem]" />
        </button>
      )}
      {/* 모바일 - 2단계 헤더 (인원 체크) */}
      {isMobile && appear && nextStep && (
        <>
          {/* back button */}
          <button
            className="flex items-center gap-[0.6rem]"
            onClick={() => setNextStep(false)}
          >
            <ArrowLeft />
            <h2 className="text-[1.8rem] font-bold text-gray-950">인원</h2>
          </button>
          <p className="mt-[0.8rem] mb-[2rem] text-[1.6rem] text-gray-900">
            예약할 인원을 선택해주세요
          </p>
        </>
      )}
      {/* 데스크탑 - 캘린더 헤더 - '0000/인' */}
      {isDesktop && price && (
        <p className="mb-[2.4rem] flex items-center gap-[0.6rem]">
          <span className="inline-block text-[1.8rem] leading-none font-bold text-gray-950 lg:text-[2.4rem]">
            ₩{formatPrice(price)}
          </span>
          <span className="inline-block text-[1.6rem] leading-none text-gray-600 lg:text-[2rem]">
            / 인
          </span>
        </p>
      )}
    </>
  );
};
export default ResponsiveHeader;
