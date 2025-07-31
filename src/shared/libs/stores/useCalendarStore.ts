import { create } from 'zustand';

import { formatDateToYMD } from '@/shared/components/calendar/libs/utils/formatDateToYMD';

interface CalendarState {
  selectedDate: string | null;
  year: number;
  month: number;
  date: number | null;
  setSelectedDate: (y: number, m: number, d: number) => void;
  resetSelectedDate: () => void;
  setYear: (y: number) => void;
  setMonth: (m: number) => void;
  setDate: (d: number) => void;
}

const today = new Date();

export const useCalendarStore = create<CalendarState>((set, get) => ({
  selectedDate: null, //기본 null로 두고, 캘린더에 따라서 기본 설정을 해두던지 알아서 해야할듯.
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
}));
