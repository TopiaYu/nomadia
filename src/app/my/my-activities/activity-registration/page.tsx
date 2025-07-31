import ActivityRegistrationForm from '@/features/activity-registration/components/activity-registration-form';

const ActivityRegistrationPage = () => {
  return (
    <main>
      <div className="my-[1rem] flex w-full gap-[0.4rem]">
        <span className="text-[1.8rem] font-bold text-gray-950">
          내 체험 등록
        </span>
      </div>
      <ActivityRegistrationForm />
    </main>
  );
};

export default ActivityRegistrationPage;
