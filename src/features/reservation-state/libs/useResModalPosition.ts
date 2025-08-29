import { useEffect, useState } from 'react';

import { useCalendarStore } from '@/shared/components/calendar/libs/stores/useCalendarStore';
import useWindowSize from '@/shared/libs/hooks/useWindowSize';

export const useResModalPosition = (
  calendarRef: React.RefObject<HTMLDivElement | null>,
): React.CSSProperties | undefined => {
  const { date } = useCalendarStore();
  const { isDesktop, isMobile, isTablet } = useWindowSize();
  const [position, setPosition] = useState<React.CSSProperties>({
    display: 'none',
  });

  useEffect(() => {
    if (isMobile || isTablet) {
      setPosition({ display: 'block' });
      return;
    }

    const calendarEl = calendarRef.current;
    if (!calendarEl) return;
    const calendarRect = calendarEl.getBoundingClientRect();

    if (date !== null) {
      const cell = calendarEl.querySelector(`[data-date='${date}']`);
      if (!cell) return;
      const cellRect = cell.getBoundingClientRect();

      setPosition({
        left: calcLeft(cellRect, calendarRect) + 'px',
        top: calcTop(cellRect, calendarRect) + 'px',
        position: 'absolute',
      });
    } else {
      setPosition({ display: 'none' });
    }
  }, [date, isDesktop, calendarRef, isMobile, isTablet]);
  return position;
};

const MODAL_WIDTH = 333;
const MODAL_HEIGHT = 444;

const calcLeft = (cellRect: DOMRect, calendarRect: DOMRect | undefined) => {
  if (!calendarRect) return 0;
  const left = cellRect.left - calendarRect.left;
  const hasEnoughSpaceRight = window.innerWidth - cellRect.right >= MODAL_WIDTH;
  if (hasEnoughSpaceRight) {
    return left + cellRect.width;
  } else {
    return left - MODAL_WIDTH;
  }
};
const calcTop = (cellRect: DOMRect, calendarRect: DOMRect | undefined) => {
  if (!calendarRect) return 0;
  const top = cellRect.top - calendarRect.top;
  const cellTop = cellRect.top + window.scrollY;
  const hasEnoughSpaceBottom =
    document.body.clientHeight - cellTop >= MODAL_HEIGHT;
  if (hasEnoughSpaceBottom) {
    return top;
  } else {
    return top - MODAL_HEIGHT + cellRect.height;
  }
};
