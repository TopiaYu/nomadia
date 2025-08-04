export interface CreateSheduleBody {
  date: string;
  startTime: string;
  endTime: string;
}

export interface SubImage {
  id: number;
  url: string;
}

export interface schedules extends CreateSheduleBody {
  id: number;
}

export interface EditActivityRequest {
  title: string;
  category: string;
  description: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  subImageIdsToRemove: number[];
  subImageUrlsToAdd: string[];
  scheduleIdsToRemove: number[];
  schedulesToAdd: CreateSheduleBody[];
}

export interface EditActivityResponse {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  createdAt: string;
  updatedAt: string;
  subImages: SubImage[];
  schedules: schedules[];
}
