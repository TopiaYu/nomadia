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
    <div className="mx-auto w-full px-4 text-center">
      <div className="relative mb-16">
        <h2 className="mb-4 text-[2.8rem] leading-tight font-black md:text-[4rem]">
          <span className="bg-gradient-to-r from-[oklch(0.682_0.153_248.5)] to-[oklch(0.72_0.14_235)] bg-clip-text text-transparent">
            어떻게
          </span>
          <span className="text-gray-900"> 시작하나요?</span>
        </h2>
        <div className="inline-block">
          <p className="rounded-2xl bg-[oklch(0.957_0.022_243.9)] px-6 py-3 text-[1.6rem] font-semibold text-[oklch(0.682_0.153_248.5)] shadow-md md:text-[2rem]">
            간단한 3단계로 새로운 경험을 시작하세요
          </p>
        </div>
      </div>
      {/* Steps */}
      <div className="mb-16 flex w-full flex-col gap-4 sm:flex-row sm:flex-nowrap sm:gap-4">
        {steps.map((step) => (
          <StepCard key={step.step} {...step} />
        ))}
      </div>
      {/* CTA Button */}
      <button
        className="bg-main w-[24rem] cursor-pointer rounded-full px-12 py-4 text-[1.8rem] font-semibold text-white transition-colors hover:opacity-90 md:w-[34rem] lg:w-[40rem]"
        onClick={() => router.push('/activities')}
      >
        시작하기
      </button>
    </div>
  </div>
);

export default Cta;
