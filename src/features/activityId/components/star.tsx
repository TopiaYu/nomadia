import Image from 'next/image';

const Star = () => {
  return (
    <Image
      src="/images/icons/star.svg"
      width={16}
      height={16}
      alt={'rating-star'}
    />
  );
};

export default Star;
