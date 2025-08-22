import { create } from 'zustand';

import { formatDateToYMD } from '@/shared/components/calendar/libs/utils/formatDateToYMD';

interface CalendarState {
  selectedDate: string | null; // 전달값 yyyy-mm-dd
  year: number;
  month: number;
  date: number | null; // '일' 값(달력의 '일'숫자와 일치 여부 검증하여 스타일링에 활용함)
  setSelectedDate: (y: number, m: number, d: number) => void;
  resetSelectedDate: () => void;
  setYear: (y: number) => void;
  setMonth: (m: number) => void;
  setDate: (d: number) => void;
  resetDate: () => void;
}

const today = new Date();

export const useCalendarStore = create<CalendarState>((set, get) => ({
  selectedDate: null,
  year: today.getFullYear(),
  month: today.getMonth(),
  date: null,
  setSelectedDate: (y, m, d) => {
    const newDate = formatDateToYMD(new Date(y, m, d));
    const current = get().selectedDate;
    set({ selectedDate: newDate === current ? null : newDate });
  },
  resetSelectedDate: () => {
    set({ selectedDate: null });
  },
  setYear: (year) => set({ year }),
  setMonth: (month) => set({ month }),
  setDate: (date) => set({ date: get().date === date ? null : date }),
  resetDate: () => set({ date: null }),
}));
