import './globals.css';

import type { Metadata } from 'next';
import localFont from 'next/font/local';

import { Providers } from '@/app/providers';
import Footer from '@/shared/components/footer/footer';
import HeaderWrapper from '@/shared/components/header/header-wrapper';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: 'Nomadia - 노마드를 위한 액티비티 예약 플랫폼',
  description:
    '어디서든 나답게 머무는 경험을 시작하세요. 노마드들이 직접 체험을 등록하고 예약하는 경험 공유 서비스 노마디아입니다.',
  metadataBase: new URL('https://nomadia-two.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Nomadia - 노마드를 위한 액티비티 예약 플랫폼',
    description:
      '어디서든 나답게 머무는 경험을 시작하세요. 노마드들이 직접 체험을 등록하고 예약하는 경험 공유 서비스',
    url: 'https://nomadia-two.vercel.app',
    siteName: 'Nomadia',
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Nomadia - 노마드를 위한 액티비티 예약 플랫폼',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nomadia - 노마드를 위한 액티비티 예약 플랫폼',
    description: '어디서든 나답게 머무는 경험을 시작하세요',
    images: ['/images/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable}`}>
      <body
        className={`${pretendard.className} bg-background flex min-h-screen flex-col`}
      >
        <Providers>
          <HeaderWrapper />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
