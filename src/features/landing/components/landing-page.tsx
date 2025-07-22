'use client';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import type { Swiper as SwiperType } from 'swiper';

import { ActivityCard } from '@/features/activities/components/activity-card';

import { steps } from '../libs/constants/data';
import Cta from './cta';
import Hero from './hero';

const LandingPage = () => {
  const router = useRouter();
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="bg-background min-h-screen">
      <Hero swiperRef={swiperRef} ActivityCard={ActivityCard} router={router} />
      <Cta steps={steps} router={router} />
    </div>
  );
};

export default LandingPage;
