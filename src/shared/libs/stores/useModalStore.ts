import { create } from 'zustand';

interface ModalState {
  isModalOpen: boolean;
  modalType: 'confirm' | 'warning' | 'custom';
  activeReservationId?: number | null;
  openModal: (reservationId?: number) => void;
  closeModal: () => void;
  setModalType: (type: 'confirm' | 'warning' | 'custom') => void;
  appear: boolean;
  appearModal: () => void;
  disappearModal: () => void;
  isDesktop: boolean | undefined;
  setIsDesktop: (state: boolean) => void;
}

export const useModalStore = create<ModalState>((set) => ({
  // Modal
  isModalOpen: false,
  modalType: 'confirm',
  activeReservationId: null, // 기본값
  openModal: (reservationId?: number) =>
    set({
      isModalOpen: true,
      // reservationId가 전달되면 설정하고, 없으면 기존처럼 동작
      ...(reservationId !== undefined && {
        activeReservationId: reservationId,
      }),
    }),
  closeModal: () =>
    set({
      isModalOpen: false,
      activeReservationId: null,
    }),
  setModalType: (type: 'confirm' | 'warning' | 'custom') =>
    set({ modalType: type }),
  // AdaptiveModal
  appear: false,
  appearModal: () => set({ appear: true }),
  disappearModal: () => set({ appear: false }),
  isDesktop: undefined,
  setIsDesktop: (state) => set({ isDesktop: state }),
}));
