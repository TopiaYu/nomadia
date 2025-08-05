import { create } from 'zustand';

interface NotificationState {
  isNotificationOpen: boolean;
  openNotification: () => void;
  closeNotification: () => void;
  toggleNotification: () => void;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  isNotificationOpen: false,
  openNotification: () => set({ isNotificationOpen: true }),
  closeNotification: () => set({ isNotificationOpen: false }),
  toggleNotification: () =>
    set({ isNotificationOpen: !get().isNotificationOpen }),
}));
