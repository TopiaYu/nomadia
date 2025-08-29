import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import ActivityPageContent from '@/app/activities/[id]/page-content';
import { getActivityId } from '@/features/activityId/libs/api/getActivityId';

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['activityId', id],
    queryFn: () => getActivityId(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ActivityPageContent id={id} />
    </HydrationBoundary>
  );
};

export default Page;
