export interface MonthReservations {
  id: string;
  nickname: string;
  headCount: number;
  status: 'pending' | 'confirmed' | 'declined';
  startTime: string;
  endTime: string;
  date: string;
  scheduleId: number;
  reservations: {
    completed: number;
    confirmed: number;
    pending: number;
  };
}
