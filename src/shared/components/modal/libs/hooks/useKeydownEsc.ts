'use client';
import { useEffect } from 'react';

export const useKeydownEsc = (
  closeModal: () => void,
  active: boolean,
  isIconLoaded: boolean,
) => {
  useEffect(() => {
    if (!active) return;

    const handleKeydown = (e: KeyboardEvent) => {
      if (isIconLoaded === false) return;
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [closeModal, active, isIconLoaded]);
};
