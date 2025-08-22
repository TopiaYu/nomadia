import { create } from 'zustand';
interface ReservationIdState {
  reservationId: number;
  setReservationId: (reservationId: number) => void;
}

// for: 예약 취소, 후기 작성 모달
export const useReservationIdStore = create<ReservationIdState>((set) => ({
  reservationId: 0,
  setReservationId: (reservationId) => set({ reservationId }),
}));
