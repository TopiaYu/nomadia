'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useAuthStore } from '@/features/auth/stores/useAuthStore';
import { useRedirectAfterSuccess } from '@/features/auth/utils/hooks/useRedirectAfterSuccess';
import {
  LoginFormType,
  loginSchema,
} from '@/features/auth/validators/auth.schema';
import { FormInput } from '@/shared/components/form-input/form-input';

import { login as apiLogin } from '../../api/auth.api';

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const storeLogin = useAuthStore((state) => state.login);
  const redirectAfterLogin = useRedirectAfterSuccess();

  const onSubmit: SubmitHandler<LoginFormType> = async (data) => {
    try {
      const response = await apiLogin(data);
      storeLogin(response);
      toast.success('로그인 성공');
      redirectAfterLogin('/activities');
    } catch (error) {
      console.error('로그인 실패', error);
      toast.error('로그인에 실패했습니다');
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
        placeholder="이메일을 입력해 주세요"
        register={register}
        error={errors.email}
      />
      <FormInput
        label="비밀번호"
        name="password"
        type="password"
        placeholder="비밀번호를 입력해 주세요"
        register={register}
        error={errors.password}
      />

      <button
        type="submit"
        disabled={isSubmitting || !isValid}
        className={`mt-10 h-[4.4rem] w-full cursor-pointer rounded-[1.2rem] text-[1.6rem] font-semibold text-gray-50 transition-colors md:h-[4.8rem] ${isValid ? 'bg-main hover:bg-blue-500' : 'bg-gray-200'} `}
      >
        로그인
      </button>
    </form>
  );
};
