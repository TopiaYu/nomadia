import { create } from 'zustand';

interface ScheduleIdState {
  scheduleId: number | null;
  setScheduleId: (id: number | null) => void;
}

// booking-card-container의 handleCancelClick()에서 사용 중
export const useScheduleIdStore = create<ScheduleIdState>((set) => ({
  scheduleId: null,
  setScheduleId: (id) => set({ scheduleId: id }),
}));
