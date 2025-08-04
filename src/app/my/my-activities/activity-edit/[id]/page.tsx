import ActivityEditForm from '@/features/my/activity-edit/components/activity-edit-form';

const ActivityEditPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id: activityId } = await params;
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
