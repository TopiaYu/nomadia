/**
 * @description 액티비티 상세 페이지로 이동하는 함수
 * @author 김영현
 * @param activityId - 액티비티 ID
 * @param router - Next.js 라우터
 */
export const navigateToActivity = (
  activityId: number,
  router: ReturnType<typeof import('next/navigation').useRouter>,
) => {
  router.push(`/activities/${activityId}`);
};
