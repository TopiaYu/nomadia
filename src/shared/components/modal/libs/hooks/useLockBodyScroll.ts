import { useEffect } from 'react';

export const useLockBodyScroll = (active: boolean) => {
  useEffect(() => {
    const body = window.document.body;
    const scroll = window.scrollY;
    if (active) {
      body.classList.add('overflow-hidden');
    }
    return () => {
      body.classList.remove('overflow-hidden');
      window.scrollTo(0, scroll);
    };
  }, [active]);
};
