import type { StepCardProps } from '../libs/types/types';

/**
 * 랜딩 페이지 3단계 안내 등에서 사용하는 StepCard UI 컴포넌트
 * @author 김영현
 * @param icon 카드 상단에 표시할 아이콘(ReactNode)
 * @param step 단계명(예: STEP 1)
 * @param title 카드 제목(예: 관심 체험 찾기)
 * @param description 카드 설명(JSX 가능)
 */
export const StepCard = ({ icon, step, title, description }: StepCardProps) => (
  <div className="flex min-w-0 flex-1 basis-0 flex-col items-center pb-[3rem] md:pb-0">
    <div className="bg-sub mb-4 flex h-16 w-16 items-center justify-center rounded-2xl md:h-20 md:w-20">
      {icon}
    </div>
    <div className="text-main mb-2 text-[1.6rem] font-bold md:text-[2rem]">
      {step}
    </div>
    <h3 className="mb-3 text-[2rem] font-bold md:text-[2.4rem]">{title}</h3>
    <p className="text-[1.6rem] leading-[1.6] text-gray-700 md:text-[1.8rem]">
      {description}
    </p>
  </div>
);
