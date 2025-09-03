'use client';

import { useEffect } from 'react';

import { useCalendarStore } from '@/shared/components/calendar/libs/stores/useCalendarStore';
import { useModalStore } from '@/shared/components/modal/libs/stores/useModalStore';

const CleanUp = () => {
  const { closeModal } = useModalStore();
  const { setYear, setMonth, resetSelectedDate, resetDate } =
    useCalendarStore();

  useEffect(() => {
    return () => {
      closeModal();
      const today = new Date();
      setYear(today.getFullYear());
      setMonth(today.getMonth());
      resetSelectedDate();
      resetDate();
    };
  }, [closeModal, setMonth, setYear, resetDate, resetSelectedDate]);

  return null;
};

export default CleanUp;
