import Image from 'next/image';

const EmptyStarImage = ({ extraClassName }: { extraClassName?: string }) => {
  return (
    <Image
      src="/images/icons/empty-star.svg"
      width={16}
      height={16}
      alt={'empty-star'}
      className={extraClassName}
    />
  );
};

export default EmptyStarImage;
