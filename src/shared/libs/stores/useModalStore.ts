import { create } from 'zustand';

interface ModalState {
  isModalOpen: boolean;
  modalType: 'confirm' | 'warning' | 'custom';

  openModal: (reservationId?: number) => void;
  closeModal: () => void;
  setModalType: (type: 'confirm' | 'warning' | 'custom') => void;
  //adaptive modal
  appear: boolean;
  appearModal: () => void;
  disappearModal: () => void;
  isDesktop: boolean | undefined;
  setIsDesktop: (state: boolean) => void;
  //second modal (using two modals at once)
  isSecondModalOpen: boolean;
  secondModalType: 'confirm' | 'warning' | 'custom';
  openSecondModal: (reservationId?: number, name?: string) => void;
  closeSecondModal: () => void;
  setSecondModalType: (type: 'confirm' | 'warning' | 'custom') => void;
  //using multiple second modal //second modal에서 사용 중. openSecondModal 시 바로 name 받아서 설정함
  secondModalName: string | undefined;
  //로직 관련 상태값
  activeReservationId?: number | null;
  activityId_secondModal?: number | null; //activity[Id]페이지-second modal에서 사용
  scheduleId: number | null; //로컬스토리지에서 스케줄 remove시 사용
  setScheduleId: (id: number | null) => void;
}

export const useModalStore = create<ModalState>((set) => ({
  // Modal
  isModalOpen: false,
  modalType: 'confirm',
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
  //second modal
  isSecondModalOpen: false,
  secondModalType: 'confirm',
  openSecondModal: (activityId, name) =>
    set({
      secondModalName: name,
      isSecondModalOpen: true,
      // reservationId가 전달되면 설정하고, 없으면 기존처럼 동작
      ...(activityId !== undefined && {
        activityId_secondModal: activityId,
      }),
    }),
  closeSecondModal: () =>
    set({
      secondModalName: undefined,
      isSecondModalOpen: false,
      activityId_secondModal: null,
    }),
  setSecondModalType: (type: 'confirm' | 'warning' | 'custom') =>
    set({ secondModalType: type }),
  // using multiple second modal
  secondModalName: undefined,
  // <로직 관련> ----------------------------------------------------
  activeReservationId: null,
  activityId_secondModal: null,
  // 로컬스토리지에 전달하기 위한 스케줄 아이디 저장(예약취소 시)
  scheduleId: null,
  setScheduleId: (id) => set({ scheduleId: id }),
}));
