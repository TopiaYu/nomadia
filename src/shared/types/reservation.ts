export type Reservation = {
  id: string;
  nickname: string;
  peopleCount: number;
  userId: number;
  teamId: string;
  activityId: number;
  scheduleId: number;
  status: 'waiting' | 'approved' | 'declined';
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
};

export type MonthReservations = {
  date: string;
  reservations: Reservation[];
};
