import { useModalStore } from '@/shared/components/modal/libs/stores/useModalStore';
import { cn } from '@/shared/libs/cn';
import useWindowSize from '@/shared/libs/hooks/useWindowSize';

interface SubmitButtonProps {
  isValid: boolean;
  nextStep: boolean;
  setNextStep: (bool: boolean) => void;
}

const SubmitButton = ({
  isValid,
  nextStep,
  setNextStep,
}: SubmitButtonProps) => {
  const { isDesktop, isTablet, isMobile } = useWindowSize();
  const { appear, appearModal, disappearModal } = useModalStore();

  const handleAppear = () => {
    if (!isDesktop && !appear && !isValid) {
      appearModal();
    } else if ((isTablet && appear) || (isMobile && appear && nextStep))
      disappearModal();
  };

  const handleNextStep = () => {
    if (isMobile && appear) {
      if (nextStep) {
        setNextStep(false);
        disappearModal();
      } else {
        setNextStep(true);
      }
    }
  };
  return (
    <button
      type="submit"
      className={cn(
        'z-100 mt-[1.2rem] h-[5rem] w-full cursor-pointer rounded-[1.4rem] py-[1.4rem] text-[1.6rem] font-bold lg:mt-0 lg:w-[13.5rem]',
        isValid
          ? 'btn-action-blue bg-main text-white'
          : isDesktop
            ? 'btn-action-gray bg-gray-200 text-white'
            : appear
              ? 'btn-action-gray bg-gray-200 text-white'
              : 'btn-action-white border-main text-main border bg-white',
      )}
      onClick={(e) => {
        // 예외 처리
        if (!isValid || appear) {
          e.preventDefault();
        }
        handleAppear(); // handle appear in !isDesktop
        handleNextStep(); // handle nextStep in Mobile
      }}
    >
      {isDesktop ? '예약하기' : appear ? '확인' : '예약하기'}
    </button>
  );
};
export default SubmitButton;
