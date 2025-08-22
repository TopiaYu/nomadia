'use client';
import { useRouter } from 'next/navigation';

/**
 * @author 지윤
 * @note
 * *로그인/로그아웃 성공 이후 리다이렉트 처리를 위한 커스텀 훅*
 * - 세션스토리지(`sessionStorage`)에 `redirectAfterSuccess` 키로 경로가 저장되어 있다면
 *   해당 경로로 이동한 뒤, 저장된 값을 제거함.
 * - 저장된 경로가 없다면 매개변수로 전달된 `path` 경로로 이동함.
 */
export const useRedirectAfterSuccess = () => {
  const router = useRouter();

  const redirect = (path: string) => {
    const redirectTo = sessionStorage.getItem('redirectAfterSuccess');
    const isValidPath =
      redirectTo?.startsWith('/') && !redirectTo.startsWith('//'); // 오픈 리다이렉트 취약점 방지
    if (redirectTo && isValidPath) {
      sessionStorage.removeItem('redirectAfterSuccess');
      router.push(redirectTo);
    } else {
      router.push(path);
    }
  };
  return redirect;
};
