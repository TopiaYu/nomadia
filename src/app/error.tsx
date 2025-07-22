'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

/**
 * 렌더링 중 에러 발생 시 자동으로 보여지는 에러 UI(컴포넌트)
 * ---
 *
 * `throw new Error()`가 실행되면 Next.js는 해당 에러를 감지하고,
 * 자동으로 `app/error.tsx` 파일을 렌더링합니다.
 *
 * 이때, 에러에 **상태 코드(status code)** 정보를 함께 넘기면,(throw new Error(String(status));)
 * `app/error.tsx`에서 error.message를 추출해, 에러 코드에 맞는 렌더링을 수행합니다.
 *
 * ---
 *
 * 🖥️ 클라이언트 컴포넌트에서의 에러 처리 예시:
 *
 * ```tsx
 * 'use client';
 *
 * import { isAxiosError } from 'axios';
 * import { useErrorQuery } from '@/features/(test)/useErrorQuery';
 *
 * export default function Page() {
 *   const { data, error, isError } = useErrorQuery(); // → 예: 401 에러
 *
 *   if (isError && error && isAxiosError(error)) {
 *     const status = error.response?.status; // ✅ 상태 코드 추출
 *     throw new Error(String(status)); // ✅ 상태 코드 포함하여 throw
 *   }
 *
 *   return <div>{data?.title}</div>;
 * }
 * ```
 *
 * ---
 *
 * 💿 서버 컴포넌트에서의 에러 처리 예시:
 *
 * ```tsx
 * import { isAxiosError } from 'axios';
 * import { testInstance } from '@/features/(test)/testInstance';
 *
 * async function fetchData() {
 *   try {
 *     const res = await testInstance.post('activities/7/reservations'); // 예: 401
 *     return res.data;
 *   } catch (error) {
 *     if (isAxiosError(error)) {
 *       const status = error.response?.status; // ✅ 상태 코드 추출
 *       throw new Error(String(status)); // ✅ 상태 코드 포함하여 throw
 *     }
 *   }
 * }
 *
 * export default async function Page() {
 *   const data = await fetchData();
 *   return <div>{data.title}</div>;
 * }
 * ```
 *
 * ---
 *
 * 📌 에러 메시지 전달 규칙:
 * - `throw new Error("401")`처럼 상태 코드를 문자열로 던지면,
 *   `app/error.tsx`에서 `error.message`를 통해 추출하여 분기 처리 가능
 *
 * ---
 *
 * 📎 참고:
 * - `app/error.tsx`는 클라이언트/서버 공통 에러 처리 UI입니다.
 * - Next.js는 렌더링 중 에러가 발생하면 그 컴포넌트 트리 전체를 걷어내고, 그 자리에 app/error.tsx를 UI로 렌더링합니다.(페이지 이동x)
 * - fetch()나 axios() 같은 클라이언트/서버 API 호출에서 생긴 에러는 예외(throw) 로 취급되며, try/catch 로 직접 잡지 않으면, 서버 컴포넌트일 경우 → 500 응답 반환함. → 클라이언트에서는 → 그냥 콘솔 에러 or ErrorBoundary 로 넘어가고 끝남
 */

const Error = ({ error }: { error: Error }) => {
  const router = useRouter();
  const code = error.message;
  const messages: Record<string, string> = {
    '401': '로그인이 필요합니다.',
    '403':
      '접근 권한이 없습니다.\n시도한 웹페이지 또는 리소스에 액세스 할 수 없습니다.',
    '500':
      '요청을 처리하는 중 서버에서 오류가 발생했습니다.\n잠시 후 다시 시도해 주세요.\n지속적으로 문제가 발생하면 문의해 주세요.',
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 text-center">
      <h1 className="mt-[8rem] mb-[2.7rem] text-center text-[5rem] leading-none text-gray-950 md:mt-[11rem] md:mb-[4rem] md:text-[5.8rem]">
        {code in messages ? `${code} ERROR` : 'ERROR'}
      </h1>

      <p className="mb-[5.5rem] text-[1.5rem] leading-[2.6rem] whitespace-pre-line text-gray-950 md:text-[2rem] md:leading-[3.4rem]">
        {code in messages ? messages[code] : '알 수 없는 오류입니다.'}
      </p>

      <Image
        src="/images/sad-laptop.svg"
        alt="Sad laptop"
        width={300}
        height={300}
        className="mb-[5.5rem] w-[70%] max-w-sm md:mb-[8.8rem] md:max-w-md"
      />

      <button
        onClick={() => router.back()}
        className="mb-[8rem] border-b border-b-gray-950 pb-0.5 text-[1.6rem] text-gray-950 hover:text-black md:mb-[11rem] md:text-[2rem]"
      >
        이전 페이지로
      </button>
    </div>
  );
};

export default Error;
