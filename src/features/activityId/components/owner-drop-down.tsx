import Image from 'next/image';

import { useAuthStore } from '@/features/auth/stores/useAuthStore';
import Dropdown from '@/shared/components/dropdown';

const OwnerDropdown = ({
  ownerId,
  activityId,
}: {
  ownerId: number | undefined;
  activityId: number;
}) => {
  const { user } = useAuthStore();
  const isOwner = user?.id === String(ownerId);

  const handleDelete = () => {
    console.log(
      'activityId:',
      activityId,
      ' isOwner:',
      isOwner,
      'want to delete?',
    );
  };
  return (
    <>
      {!isOwner && (
        <Dropdown
          dropdownClassName="absolute top-8 right-2"
          trigger={
            <button>
              <Image
                src="/images/icons/more.svg"
                width={28}
                height={28}
                alt={'more-options'}
              />
            </button>
          }
        >
          <div className="border-sub-300 h-[10.8rem] overflow-hidden rounded-[0.8rem] border bg-white">
            <button className="hover:text-main hover:bg-sub h-[5.4rem] w-[9.3rem] px-[1.8rem] text-[1.6rem]">
              수정하기
            </button>
            <hr />
            <button
              onClick={handleDelete}
              className="h-[5.4rem] w-[9.3rem] px-[1.8rem] text-[1.6rem] hover:bg-red-100 hover:text-red-500"
            >
              삭제하기
            </button>
          </div>
        </Dropdown>
      )}
    </>
  );
};

export default OwnerDropdown;
