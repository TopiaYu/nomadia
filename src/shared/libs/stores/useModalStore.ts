import { create } from 'zustand';

interface ModalState {
  isModalOpen: boolean;
  modalType: 'confirm' | 'warning' | 'custom';
  openModal: () => void;
  closeModal: () => void;
  setModalType: (type: 'confirm' | 'warning' | 'custom') => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isModalOpen: false,
  modalType: 'confirm',
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
  setModalType: (type: 'confirm' | 'warning' | 'custom') =>
    set({ modalType: type }),
}));
