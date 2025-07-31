import z from 'zod';

// 회원가입 스키마
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

// 로그인 스키마
export const loginSchema = z.object({
  email: z.email({ message: '올바른 이메일 형식을 입력해 주세요' }),
  password: z.string().min(8, { message: '비밀번호를 8자 이상 입력해 주세요' }),
});

// 프로필 스키마
export const profileSchema = z
  .object({
    nickname: z.string().min(2, { message: '닉네임은 2자 이상이어야 합니다' }),
    email: z.email(),
    password: z
      .string()
      .min(8, { message: '비밀번호는 8자 이상이어야 합니다' })
      .optional()
      .or(z.literal('')),
    confirmPassword: z.string().optional().or(z.literal('')),
  })
  .refine(
    (data) => {
      if (!data.password && !data.confirmPassword) {
        return true;
      }
      return data.password === data.confirmPassword;
    },
    {
      message: '비밀번호가 일치하지 않습니다',
      path: ['confirmPassword'],
    },
  );

export type SignupFormType = z.infer<typeof signupSchema>;
export type LoginFormType = z.infer<typeof loginSchema>;
export type ProfileFormType = z.infer<typeof profileSchema>;
