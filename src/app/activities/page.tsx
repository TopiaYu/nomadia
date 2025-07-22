'use client';

import { Suspense } from 'react';

import ActivitiesPageContent from '@/app/activities/page-content';
import LoadingSpinner from '@/shared/components/loading-spinner/loading-spinner';

const ActivitiesPage = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ActivitiesPageContent />
    </Suspense>
  );
};

export default ActivitiesPage;
