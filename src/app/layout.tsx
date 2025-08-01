import './globals.css';

import type { Metadata } from 'next';
import localFont from 'next/font/local';

import { Providers } from '@/app/providers';
import Footer from '@/shared/components/footer';
import HeaderWrapper from '@/shared/components/header-wrapper';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: 'Nomadia',
  description: 'C2C service for Global Nomads',
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
