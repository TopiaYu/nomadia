import type { StepCardProps } from '../libs/types/types';

interface CtaProps {
  steps: StepCardProps[];
  router: ReturnType<typeof import('next/navigation').useRouter>;
}

import { StepCard } from './step-card';

/**
 * 랜딩페이지 하단의 cta 영역 컴포넌트
 * @description 랜딩페이지 하단의 cta 영역 컴포넌트
 * @author 김영현
 */
const Cta = ({ steps, router }: CtaProps) => (
  <div className="bg-white py-20">
    <div className="mx-auto w-full max-w-[120rem] px-4 text-center">
      <div className="relative mb-[5rem] md:mb-[11rem]">
        <h2 className="mb-[1rem] text-[2.8rem] leading-snug font-bold md:mb-[1.4rem] md:text-[4rem] md:tracking-[0.1rem] lg:mb-[1.6rem] lg:text-[4.6rem]">
          <span className="bg-gradient-to-r from-[oklch(0.682_0.153_248.5)] to-[oklch(0.72_0.14_235)] bg-clip-text font-extrabold text-transparent">
            어떻게
          </span>
          <span className="text-gray-900"> 시작하나요?</span>
        </h2>
        <div className="inline-block">
          <p className="shadow-sub-300/80 rounded-[2.6rem] bg-[oklch(0.957_0.022_243.9)] px-7 py-3 text-[1.6rem] font-semibold text-[oklch(0.682_0.153_248.5)] shadow-md md:px-10 md:py-5 md:text-[2.2rem]">
            간단한 3단계로, 새로운 경험을 시작하세요
          </p>
        </div>
      </div>
      {/* Steps */}
      <div className="mb-[3rem] flex w-full flex-col gap-4 sm:flex-row sm:flex-nowrap md:mb-[10rem]">
        {steps.map((step) => (
          <StepCard key={step.step} {...step} />
        ))}
      </div>
      {/* CTA Button */}
      <button
        className="bg-main btn-action-landing-blue mb-[11rem] w-[24rem] flex-1 cursor-pointer rounded-full py-7 text-[1.8rem] font-semibold text-white transition-colors md:text-[2.4rem]"
        onClick={() => router.push('/activities')}
      >
        체험 구경하기 👀
      </button>
    </div>
  </div>
);

export default Cta;
