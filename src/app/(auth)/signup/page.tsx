import Image from 'next/image';
import Link from 'next/link';

import { SignupForm } from '@/features/auth/signup/components/SignupForm';

const Signup = () => {
  return (
    <div className="mx-6 mt-[3.6rem] mb-10 flex w-full max-w-[34.3rem] flex-col items-center md:mt-[10rem] md:max-w-[46rem]">
      <Image
        src="/images/icons/logo-desktop.png"
        alt="Signup logo image"
        width={86}
        height={71}
        className="mb-10 w-[86px] md:w-[120px]"
      />

      <SignupForm />

      <p className="my-[4rem] text-[1.4rem] text-gray-950 md:text-[1.6rem]">
        회원이신가요?{'  '}
        <Link
          href="/login"
          className="text-main cursor-pointer text-[1.4rem] underline md:text-[1.6rem]"
        >
          로그인하기
        </Link>
      </p>
    </div>
  );
};

export default Signup;
