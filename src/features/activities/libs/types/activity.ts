/**
 * 체험 리스트 조회 GET 요청 응답 타입
 */
export interface Activity {
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
  createdAt: Date;
  updatedAt: Date;
}

export interface GetActListApiResponse {
  cursorId?: number;
  totalCount: number;
  activities: Activity[];
}

export interface GetActListApiParams {
  category?: string;
  keyword?: string;
  sort?: 'most_reviewed' | 'price_asc' | 'price_desc' | 'latest';
  page?: number;
  size?: number;
}
