'use client';

import { useEffect, useState } from 'react';

import useWindowSize from '@/shared/libs/hooks/useWindowSize';

const TABLET_MIN = 768;
const TABLET_MAX = 1023;

export const useIsTablet = () => {
  const { width } = useWindowSize();
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    if (!width) return;
    setIsTablet(width >= TABLET_MIN && width <= TABLET_MAX);
  }, [width]);

  return isTablet;
};
