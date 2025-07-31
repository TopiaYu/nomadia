import Profile from '@/features/my/profile/components/profile';

const ProfilePage = () => {
  return (
    <div>
      <header className="mb-[2rem] flex flex-col gap-[0.4rem] py-[1rem] md:mb-[2.4rem]">
        <h1 className="text-[1.8rem] font-bold text-gray-950">내 정보</h1>
        <span className="text-[1.4rem] font-medium text-gray-500">
          프로필, 닉네임, 비밀번호를 수정하실 수 있습니다.
        </span>
      </header>
      <Profile />
    </div>
  );
};

export default ProfilePage;
