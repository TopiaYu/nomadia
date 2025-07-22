'use client';

import Image from 'next/image';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="txt-13-medium mx-auto h-[11.6rem] w-full border-t border-gray-100 bg-white px-[2.4rem] py-[3rem] text-gray-600 md:h-[14rem] md:px-[4rem] lg:px-[20rem]">
      {/* 모바일 사이즈: 위에 보일 Privacy Policy · FAQ */}
      <div className="mb-4 flex justify-center gap-7 md:hidden">
        <a href="/privacy-policy">Privacy Policy</a>
        <span>·</span>
        <a href="/faq">FAQ</a>
      </div>

      <div className="flex flex-row items-center justify-between md:grid md:grid-cols-3 md:items-center">
        <div className="text-left text-gray-400">nomadia - 2025</div>

        <div className="hidden justify-center gap-4 md:flex">
          <a href="/privacy-policy">Privacy Policy</a>
          <span>·</span>
          <a href="/faq">FAQ</a>
        </div>

        <div className="flex items-center justify-end gap-[1.6rem]">
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/images/icons/facebook.svg"
              alt="facebook"
              width={20}
              height={20}
            />
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/images/icons/instagram.svg"
              alt="instagram"
              width={20}
              height={20}
            />
          </a>
          <a
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/images/icons/youtube.svg"
              alt="youtube"
              width={20}
              height={20}
            />
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="/images/icons/X.svg" alt="X" width={20} height={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
