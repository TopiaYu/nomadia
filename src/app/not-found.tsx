'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

/**
 * 404 Not Found 페이지 컴포넌트
 *
 * 이 컴포넌트는 존재하지 않는 URL에 접근하거나,
 * 서버 컴포넌트 또는 API 처리 중 `notFound()` 함수가 호출된 경우 "자동으로" 렌더링됩니다.
 *
 * ---
 *
 * 📌 수동 사용법:
 * - `notFound()` 함수 호출
 *
 * ---
 *
 * ✅ 사용 예:
 * - 사용자가 잘못된 경로로 접근했을 때
 * - `fetch()` 결과가 없거나, 조건에 따라 페이지를 렌더링하지 않고 404로 보내고 싶을 때
 *
 * ---
 *
 * 🔍 참고:
 * - `notFound()` 함수는 `next/navigation` 모듈에서 import하여 사용할 수 있습니다.
 */
const NotFound = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center px-4 text-center">
      <h1
        className="mt-[8rem] mb-[2.7rem] text-center text-[5rem] leading-none text-gray-950 md:mt-[11rem] md:mb-[4rem] md:text-[5.8rem]"
        style={{ fontFamily: "'Pretendard Variable', sans-serif" }}
      >
        404 ERROR
      </h1>

      <div className="mb-[5.5rem] text-[1.5rem] leading-[2.6rem] text-gray-950 md:text-[2rem] md:leading-[3.4rem]">
        <p>죄송합니다. 요청하신 페이지를 찾을 수 없습니다.</p>
        <p>
          존재하지 않는 주소를 입력하셨거나,
          <br />
          요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.
        </p>
      </div>

      <Image
        src="images/sad-laptop.svg"
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

export default NotFound;
