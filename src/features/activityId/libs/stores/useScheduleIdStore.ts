import { create } from 'zustand';

interface ScheduleIdState {
  scheduleId: number | null; //로컬스토리지에서 스케줄 remove시 사용
  setScheduleId: (id: number | null) => void;
}

// for: 로컬스토리지(내가 예약한 체험에 대한 scheduleId 저장)
// at: useCancelMutation, booking-card-container의 handleCancelClick()에서 사용
export const useScheduleIdStore = create<ScheduleIdState>((set) => ({
  scheduleId: null,
  setScheduleId: (id) => set({ scheduleId: id }),
}));
