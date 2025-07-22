export const searchVariant = {
  main: {
    wrapper:
      'flex-center flex-col gap-[1.2rem] py-[1.6rem] md:py-[3.2rem] md:px-[4rem] md:gap-[3.6rem] mt-[1.2rem] lg:mt-[3rem]',
    title: 'font-bold text-[1.6rem] text-gray-950 md:text-[3.2rem] pb-[1rem]',
    inputBox:
      'flex w-[32.7rem] h-[4.9rem] md:w-[62.8rem] items-center rounded-full bg-white border focus-within:border-[#3D9EF2] py-[0.6rem] pr-[0.8rem] pl-[2rem] shadow-experience-card md:h-[7rem] md:w-[62.8rem] lg:w-[104rem] md:py-[1rem] md:pr-[1.2rem] md:pl-[3.2rem]',
    input:
      'text-medium flex-1 px-4 text-[1.4rem] text-black outline-none placeholder:text-gray-500 md:text-[1.8rem] caret-[#0094FF]',
    button:
      'font-bold bg-main h-[3.7rem] w-[8.5rem] rounded-full text-[1.4rem] text-white md:h-[5rem] md:w-[12rem] md:text-[1.6rem]',
  },
} as const;

export type SearchVariantKey = keyof typeof searchVariant;
