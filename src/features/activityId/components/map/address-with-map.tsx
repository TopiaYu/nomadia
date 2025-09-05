'use client';
import { Copy } from 'lucide-react';
import { useRef } from 'react';

import KakaoMap from '@/features/activityId/components/map/kakao-map';
import { textStyle } from '@/features/activityId/libs/constants/variants';

const AddressWithMap = ({ address }: { address: string | undefined }) => {
  const textRef = useRef<HTMLParagraphElement>(null);

  const handleCopy = async () => {
    if (textRef.current) {
      const text = textRef.current.innerText;
      await navigator.clipboard.writeText(text);
    }
  };

  return (
    <>
      <section className="flex flex-col gap-[0.8rem]">
        <h2 className={textStyle.h2}>오시는 길</h2>
        <div className="flex items-center gap-1">
          <p
            ref={textRef}
            className="text-[1.4rem] font-semibold text-gray-800"
          >
            {address}
          </p>
          <button
            onClick={handleCopy}
            className="flex-center trans-colors-200 cursor-pointer gap-1 rounded-2xl p-2.5 text-[1.4rem] text-gray-700 select-none hover:bg-gray-50 active:bg-gray-100"
          >
            <Copy strokeWidth={1.5} className="size-[1.8rem]" />
            복사
          </button>
        </div>
        <div
          id="map"
          className="mb-[2rem] h-[18rem] w-full overflow-hidden rounded-[1.6rem] md:h-[38rem] lg:mb-[4rem] lg:h-[45rem] lg:rounded-[2.4rem]"
        >
          <KakaoMap address={address} />
        </div>
      </section>
    </>
  );
};
export default AddressWithMap;
