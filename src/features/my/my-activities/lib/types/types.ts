import { Activity } from '@/shared/types/activity';

// my-activity에 대한 리스폰 타입
export interface MyActivitiesResponse {
  cursorId: number | null;
  totalCount: number;
  activities: Activity[];
}

// activity를 받는 props에 대한 타입
export interface MyActivitiesCardProps {
  activity: Activity;
}
