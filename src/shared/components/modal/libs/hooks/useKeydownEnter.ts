import { useEffect } from 'react';

export const useKeydownEnter = (
  onClick: (() => void) | undefined,
  color: string,
) => {
  useEffect(() => {
    if (!onClick || color !== 'blue') return;
    let executed = false; // 모달 오픈 후 onClick 중복 실행 방지용 플래그
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !executed) {
        executed = true;
        onClick();
      }
    };
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [color, onClick]);
};
