export const modalContentClasses: Record<string, string> = {
  confirm:
    'flex  w-[32rem] flex-col items-center p-[3rem] pt-[3.4rem] text-center h-fit md:w-[40rem] md:p-[4rem] md:pb-[3.4rem]',
  warning:
    'flex w-[32rem] flex-col items-center p-[3rem] pb-[2.4rem] text-center md:w-[40rem] md:p-[3rem]',
  custom: 'px-[2.4rem] py-[2rem]',
};

export const modalHeaderClasses: Record<string, string> = {
  confirm: 'mb-[1.4rem] md:mt-[0.6rem] md:mb-[1.6rem]',
  warning: 'mb-[2rem] md:mb-[2.4rem]',
  custom: 'mb-[1.2rem] md:mb-[1.6rem]',
};

export const modalButtonClasses: Record<string, string> = {
  confirm: 'w-[18rem] md:w-[20rem] h-[4.1rem] md:h-[4.7rem]',
  warning: 'w-[11.3rem] md:w-[13.5rem] h-[4.1rem] md:h-[4.7rem]',
  custom: 'w-full md:mb-[2rem] h-[4.1rem] md:h-[5.4rem] ',
};
export const modalButtonColorClasses: Record<string, string> = {
  white:
    'btn-action-white hover:border-main border border-gray-200 bg-white font-medium text-gray-600',
  blue: 'btn-action-blue bg-main font-semibold text-white',
};
