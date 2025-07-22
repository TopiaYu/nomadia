// // 🖥️ 클라이언트 컴포넌트에서의 에러 처리
// 'use client';

// import { isAxiosError } from 'axios';

// import { useErrorQuery } from '@/features/(test)/useErrorQuery';

// export default function Page() {
//   const { data, error, isError } = useErrorQuery(); //-> 401 에러

//   if (isError && error && isAxiosError(error)) {
//     const status = error?.response?.status;
//     throw new Error(String(status));
//   }
//   return <></>;
// }

// 💿 서버 컴포넌트에서의 에러 처리
import { isAxiosError } from 'axios';

import { testInstance } from '@/features/(test)/testInstance';

const fetchData = async () => {
  try {
    const res = await testInstance.post('activities/7/reservations'); //401 에러
    // const res = await testInstance.get('https://api.example.com/data'); // 500 & undefined 에러
    return res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const status = error.response?.status;
      throw new Error(String(status));
    }
    // 비-Axios 에러의 경우 일반적인 에러로 재발생
    throw new Error('500');
  }
};

export default async function Page() {
  const data = await fetchData();

  return <div>{data.title}</div>;
}
