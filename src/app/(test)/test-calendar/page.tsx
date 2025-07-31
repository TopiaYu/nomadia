'use client';

import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-15 p-[10rem]">
      {/* 💥Route to test page  */}
      <button
        className="text-5xl text-purple-400"
        onClick={() => router.push('/test-calendar/my')}
      >
        test my calendar
      </button>
      <button
        className="text-5xl text-green-600"
        onClick={() => router.push('/test-calendar/hyun')}
      >
        test hyun calendar
      </button>
      <button
        className="text-5xl text-blue-400"
        onClick={() => router.push('/test-calendar/woo')}
      >
        test woo calendar
      </button>
    </div>
  );
}
