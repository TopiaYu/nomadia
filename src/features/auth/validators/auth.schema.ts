import z from 'zod';

export const signupSchema = z
  .object({
    email: z.email({ message: '올바른 이메일 형식을 입력해 주세요' }),
    nickname: z.string().min(2, { message: '닉네임은 2자 이상이어야 합니다' }),
    password: z
      .string()
      .min(8, { message: '비밀번호는 8자 이상이어야 합니다' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['confirmPassword'],
  });

export const loginSchema = z.object({
  email: z.email({ message: '올바른 이메일 형식을 입력해 주세요' }),
  password: z.string().min(8, { message: '비밀번호를 8자 이상 입력해 주세요' }),
});

export type SignupFormType = z.infer<typeof signupSchema>;
export type LoginFormType = z.infer<typeof loginSchema>;
