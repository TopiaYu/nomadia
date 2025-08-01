export interface TimeSlot {
  endTime: string;
  startTime: string;
  id: number;
}

export interface AvailableSchedule {
  date: string;
  times: TimeSlot[];
}

export type AvailableScheduleList = AvailableSchedule[];
