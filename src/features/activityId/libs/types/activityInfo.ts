export interface Schedules {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
}
export interface SubImages {
  id: number;
  imageUrl: string;
}
export interface ActivityInfo {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
  subImages: SubImages[];
  schedules: Schedules[];
}
