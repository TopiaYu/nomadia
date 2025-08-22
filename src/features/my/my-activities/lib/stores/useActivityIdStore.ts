import { create } from 'zustand';
interface ActivityIdState {
  activityId: number;
  setActivityId: (activityId: number) => void;
}

// for: delete confirm modal
export const useActivityIdStore = create<ActivityIdState>((set) => ({
  activityId: 0,
  setActivityId: (activityId) => set({ activityId }),
}));
