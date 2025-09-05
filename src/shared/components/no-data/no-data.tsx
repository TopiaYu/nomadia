import Image from 'next/image';

const NoData = ({ message }: { message: string }) => {
  return (
    <>
      <div className="flex-center mt-[6rem] flex w-full flex-col gap-[4.5rem] md:mt-[8rem] lg:mt-[10rem]">
        <Image
          src="/images/icons/no-data.svg"
          alt="no-data"
          width={105}
          height={87}
          className="lg:h-[10rem] lg:w-[12rem]"
        />
        <p className="text-[1.8rem] font-medium text-gray-600">{message}</p>
      </div>
    </>
  );
};
export default NoData;
