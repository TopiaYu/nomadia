'use client';
import { ReactNode, useEffect } from 'react';

import ModalContent from '@/shared/components/modal/components/modal-content';
import { useKeydownEsc } from '@/shared/components/modal/libs/hooks/useKeydownEsc';
import { useLockBodyScroll } from '@/shared/components/modal/libs/hooks/useLockBodyScroll';
import { useModalStore } from '@/shared/components/modal/libs/stores/useModalStore';
import { cn } from '@/shared/libs/cn';
import useWindowSize from '@/shared/libs/hooks/useWindowSize';

/**
 * @author 지윤
 * @prop {string} extraClassName - 모달의 스타일을 외부에서 커스터마이징할 수 있습니다.
 * @prop {ReactNode} children - 모달 내부에 렌더링될 내용을 전달합니다.
 * @prop {string} translateY - 모달이 disappear일때, 하단에 y축 방향으로 몇 px 내려갈지 커스터마이징할 수 있습니다.
 * @responsive
 * - 데스크탑: 일반 `<div>`처럼 페이지 내 흐름에 맞춰 존재함
 * - 모바일/태블릿: 화면 하단에 붙는 모달로 동작,
 * @note
 * - (모바일/태블릿 화면일때)
 *   - `const { appear, disappearModal } = useModalStore();`을 활용하여, 모달의 열고 닫음 제어
 * @example
 * ```jsx
 * <AdaptiveModal translateY={'translate-y-[calc(100%-132px)]'}>
        <div className="size-72 bg-amber-300 text-5xl">반응형 모달 내용물</div>
   </AdaptiveModal>
 * ```
 */
const AdaptiveModal = ({
  translateY = 'translate-y-full',
  extraClassName,
  children,
}: {
  translateY?: string;
  extraClassName?: string;
  children: ReactNode;
}) => {
  const { isDesktop } = useWindowSize();
  const { appear, disappearModal } = useModalStore();
  const isDefaultStyle = translateY === 'translate-y-full';

  useLockBodyScroll(appear && !isDesktop);
  useKeydownEsc(disappearModal, appear, true);

  useEffect(() => {
    if (isDesktop) {
      disappearModal();
    }
  }, [isDesktop, disappearModal]);

  return (
    <>
      {/* overlay */}
      {appear && (
        <div
          className="fixed inset-0 z-80 bg-black/50"
          onClick={disappearModal}
          role="presentation"
        ></div>
      )}

      {/* modal*/}
      <div
        className={cn(
          !isDesktop &&
            'fixed bottom-0 left-0 z-90 max-h-[90vh] w-full rounded-t-[3rem] transition-transform duration-300 ease-out',
          !isDesktop &&
            (appear
              ? 'category-scroll translate-y-0 overflow-scroll'
              : translateY),
        )}
      >
        <ModalContent
          type="custom"
          extraClassName={cn(
            !isDesktop && 'rounded-b-none overflow-scroll',
            !isDefaultStyle && !isDesktop && !appear && 'rounded-none',
            extraClassName,
          )}
        >
          {children}
        </ModalContent>
      </div>
    </>
  );
};
export default AdaptiveModal;
