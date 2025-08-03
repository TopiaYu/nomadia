'use client';
import { ReactNode, useEffect } from 'react';

import Modal from '@/shared/components/modal/components';
import { cn } from '@/shared/libs/cn';
import useWindowSize from '@/shared/libs/hooks/useWindowSize';
import { useModalStore } from '@/shared/libs/stores/useModalStore';

/**
 * @author 지윤
 *
 * @component responsive AdaptiveModal
 * @prop {string} extraClassName - 모달의 스타일(margin, padding, height 등)을 외부에서 지정할 수 있습니다.
 * @prop {ReactNode} children - 모달 내부에 렌더링될 내용을 전달합니다.
 *
 * @responsive
 * - 데스크탑: 일반 `<div>`처럼 렌더링되어 페이지 내 흐름에 맞춰 위치 지정
 * - 모바일/태블릿: `fixed bottom-0 left-0 w-full` 등 스타일이 자동 적용되어 화면 하단에 붙는 모달로 동작
 *
 * @behavior
 * - `useModalStore`의 `appear`, `appearModal()`, `disappearModal()`을 통해 모달의 등장 애니메이션 제어
 * - `isModalOpen`은 항상 `true`로 고정 (모달 on/off는 appear 상태로 제어)
 * - 화면 사이즈가 변경되어 모바일 → 데스크탑으로 전환 시 모달 자동으로 내려감
 *
 * @example
 * ```tsx
 *   <AdaptiveModal extraClassName="h-[60rem] p-[2.4rem] pb-[1.8rem] md:px-[3rem] lg:p-[3rem]"> {* 모달 스타일 커스텀 *}
 *     children(모달 내용물 - e.g.캘린더 컴포넌트 등..)
 *   </AdaptiveModal>
 * ```
 *
 * @note
 * - ✅  `extraClassName` 프롭을 통해 모달의 스타일을 외부에서 커스터마이징할 수 있습니다.
 * - ❗️반응형 클래스 (`md:`, `lg:` 등)를 프롭으로 직접 전달할 경우 Tailwind 클래스 병합 순서 문제로 스타일이 적용되지 않을 수 있습니다.
 *   이런 경우 임시 `<div>`에 스타일을 시뮬레이션 적용한 후, 결과를 복붙하는 방법을 추천합니다.
 * - reservation-modal.tsx에서 사용중입니다. 사용 예시로 참고하세요
 */
const AdaptiveModal = ({
  extraClassName,
  translateY = 'translate-y-full',
  children,
}: {
  extraClassName?: string;
  translateY?: string;
  children: ReactNode;
}) => {
  const { width } = useWindowSize();

  const {
    openModal,
    appear,
    disappearModal,
    closeModal,
    isDesktop,
    setIsDesktop,
  } = useModalStore();
  const isDefaultStyle = translateY === 'translate-y-full';

  // 모달 항시 렌더링 & 언마운트 시 다시 close로 리셋
  useEffect(() => {
    openModal();
    return () => {
      closeModal();
    };
  }, [openModal, closeModal]);

  // 윈도우 사이즈 감지 및 설정 & 데스크탑으로 넘어가면 모달 자동으로 사라짐
  useEffect(() => {
    if (width && width >= 1024) {
      setIsDesktop(true);
      disappearModal();
    } else {
      setIsDesktop(false);
    }
  }, [width, disappearModal, setIsDesktop]);

  return (
    <>
      <Modal
        type="custom"
        hasOverlay={isDesktop ? false : appear ? true : false}
        isCenter={false}
        extraClassName={cn(
          !isDesktop &&
            'fixed bottom-0 left-0 w-full rounded-b-none transition-transform duration-300 ease-out',
          !isDesktop && (appear ? 'translate-y-0' : translateY),
          !isDefaultStyle && !isDesktop && (!appear ? 'rounded-none' : ''),
          extraClassName,
        )}
        onClickOverlay={() => disappearModal()}
      >
        {children}
      </Modal>
    </>
  );
};
export default AdaptiveModal;
