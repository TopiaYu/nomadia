import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import ActivityPageContent from '@/app/activities/[id]/page-content';
import { getActivityId } from '@/features/activityId/libs/api/getActivityId';
import { ActivityInfo } from '@/features/activityId/libs/types/activityInfo';

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const queryClient = new QueryClient();
  let data: ActivityInfo | undefined;

  try {
    data = queryClient.getQueryData(['activityId', id]);
    if (!data) {
      data = await queryClient.fetchQuery({
        queryKey: ['activityId', id],
        queryFn: () => getActivityId(id),
        staleTime: 1000 * 60 * 30,
        retry: 1,
      });
    }
  } catch (error) {
    if (error) notFound();
  }

  return (
    <>
      {data && (
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ActivityPageContent id={id} data={data} />
        </HydrationBoundary>
      )}
    </>
  );
};

export default Page;
