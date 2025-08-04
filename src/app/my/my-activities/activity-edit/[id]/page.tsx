import { ParamValue } from 'next/dist/server/request/params';

import ActivityEditForm from '@/features/my/activity-edit/components/activity-edit-form';

const ActivityEditPage = async ({ params }: { params: { id: ParamValue } }) => {
  const activityId = params.id;
  return (
    <main>
      <div className="my-[1rem] flex w-full gap-[0.4rem]">
        <span className="text-[1.8rem] font-bold text-gray-950">
          내 체험 등록
        </span>
      </div>
      <ActivityEditForm activityId={activityId} />
    </main>
  );
};

export default ActivityEditPage;
