export interface MonthReservations {
  date: string;
  reservations: {
    completed: number;
    confirmed: number;
    pending: number;
  };
}
