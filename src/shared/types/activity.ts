/**
 * 체험 등록 시 사용되는 스케줄 타입
 */
export interface Schedule {
  date: string;
  startTime: string;
  endTime: string;
}

/**
 * 체험의 기본 속성들 (공통으로 사용되는 필드들)
 */
export interface ActivityBase {
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
}

/**
 * 체험 등록 폼 데이터 타입 (이미지 URL 저장용)
 * ActivityBase를 확장하여 폼에서 사용하는 이미지 URL 타입을 포함
 */
export interface ActivityRegistrationFormData
  extends Omit<ActivityBase, 'bannerImageUrl'> {
  schedules: Schedule[];
  bannerImages: string; // 배너 이미지 URL (단일 이미지)
  subImages: string[];
}

/**
 * 체험 등록 API 요청 파라미터 타입
 * ActivityBase를 확장하여 등록 시 필요한 추가 필드들을 포함
 */
export interface ActivityRegistrationParams extends ActivityBase {
  schedules: Schedule[];
  subImageUrls: string[];
}

/**
 * 체험 리스트 조회 GET 요청 응답 타입
 * ActivityBase를 확장하여 서버에서 생성되는 필드들을 포함
 */
export interface Activity extends ActivityBase {
  id: number;
  teamId: string;
  userId: number;
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
