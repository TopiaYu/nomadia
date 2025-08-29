'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { FormInput } from '@/shared/components/form-input/form-input';

import { SignupFormType, signupSchema } from '../../validators/auth.schema';

export const SignupForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SignupFormType>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<SignupFormType> = async () => {
    try {
      toast.success('회원가입 성공');
      router.push('./login');
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 409) {
        setError('email', {
          type: 'manual',
          message: '이미 사용중인 이메일입니다.',
        });
      } else {
        toast.error('회원가입 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mb-6 flex w-full flex-col"
    >
      <FormInput
        label="이메일"
        name="email"
        type="text"
        placeholder="nomad@google.com"
        register={register}
        error={errors.email}
      />
      <FormInput
        label="닉네임"
        name="nickname"
        type="text"
        placeholder="닉네임을 입력해 주세요"
        register={register}
        error={errors.nickname}
      />
      <FormInput
        label="비밀번호"
        name="password"
        type="password"
        placeholder="비밀번호를 8자 이상 입력해 주세요"
        register={register}
        error={errors.password}
      />
      <FormInput
        label="비밀번호 확인"
        name="confirmPassword"
        type="password"
        placeholder="비밀번호를 8자 이상 입력해 주세요"
        register={register}
        error={errors.confirmPassword}
      />
      <button
        type="submit"
        disabled={isSubmitting || !isValid}
        className={`mt-10 h-[4.4rem] w-full cursor-pointer rounded-[1.2rem] text-[1.6rem] font-semibold text-gray-50 transition-colors md:h-[4.8rem] ${isValid ? 'bg-main hover:bg-blue-500' : 'bg-gray-200'} `}
      >
        회원가입
      </button>
    </form>
  );
};
