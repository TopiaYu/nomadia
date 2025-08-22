import { create } from 'zustand';

interface ModalState {
  // basic modal
  isModalOpen: boolean;
  modalType: 'confirm' | 'warning' | 'custom';
  modalName: string | undefined;
  openModal: (name?: string) => void;
  closeModal: () => void;
  setModalType: (type: 'confirm' | 'warning' | 'custom') => void;
  // adaptive modal
  appear: boolean;
  appearModal: () => void;
  disappearModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  // basic modal
  isModalOpen: false,
  modalType: 'confirm',
  modalName: undefined,
  openModal: (name) =>
    set({
      modalName: name,
      isModalOpen: true,
    }),
  closeModal: () =>
    set({
      modalName: undefined,
      isModalOpen: false,
    }),
  setModalType: (type: 'confirm' | 'warning' | 'custom') =>
    set({ modalType: type }),
  // adaptiveModal
  appear: false,
  appearModal: () => set({ appear: true }),
  disappearModal: () => set({ appear: false }),
}));
