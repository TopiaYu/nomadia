import Image from 'next/image';

const StarImage = ({ extraClassName }: { extraClassName?: string }) => {
  return (
    <Image
      src="/images/icons/star.svg"
      width={16}
      height={16}
      alt={'rating-star'}
      className={extraClassName}
    />
  );
};

export default StarImage;
