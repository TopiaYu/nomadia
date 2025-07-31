export interface TimeSlot {
  id: number;
  startTime: string;
  endTime: string;
}

export interface AvailableSchedule {
  date: string;
  times: TimeSlot[];
}

export type AvailableScheduleList = AvailableSchedule[];
