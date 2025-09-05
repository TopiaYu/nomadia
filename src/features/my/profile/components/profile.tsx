'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import {
  ProfileFormType,
  profileSchema,
} from '@/features/auth/validators/auth.schema';
import { editImage, getMe } from '@/features/my/profile/lib/api/profile.api';
import { editMe } from '@/features/my/profile/lib/api/profile.api';
import { useMyProfile } from '@/features/my/profile/lib/hooks/useMyProfile';
import { FormInput } from '@/shared/components/form-input/form-input';
import LoadingSpinner from '@/shared/components/loading-spinner/loading-spinner';

const Profile = () => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useForm<ProfileFormType>({
    resolver: zodResolver(profileSchema),
    mode: 'onChange',
  });
  const queryClient = useQueryClient();
  const router = useRouter();
  const [isloading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(
    '/images/icons/profile-default.svg',
  );
  const isImageChanged = !!selectedImage;
  const { data: myData } = useMyProfile();

  // 사용자 정보 가져오기 (hook?)
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const userData = await getMe();
        reset(userData);
        if (userData.profileImageUrl) {
          setPreviewUrl(userData.profileImageUrl);
        }
      } catch {
        alert('사용자 정보를 가져오지 못했습니다.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, [reset]);

  // 이미지 변경 핸들러
  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // 이전 preview URL 정리
    if (
      previewUrl &&
      previewUrl !== '/images/icons/profile-default.svg' &&
      !previewUrl.startsWith('http')
    ) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => {
      if (
        previewUrl &&
        previewUrl !== '/images/icons/profile-default.svg' &&
        !previewUrl.startsWith('http')
      ) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const mutation = useMutation({
    mutationFn: async (data: ProfileFormType) => {
      let profileImageUrl = myData?.profileImageUrl; // 수정에서 profileImageUrl에 보낼 현재 유저의 url 기본값이 필요
      if (selectedImage) {
        const res = await editImage(selectedImage);
        profileImageUrl = res.profileImageUrl;
      }

      return editMe({
        nickname: data.nickname,
        profileImageUrl, //변경되면 변경된거로 들어옴
        newPassword: data.password || undefined,
      });
    },
    onSuccess: () => {
      toast.success('프로필 수정 성공');
      queryClient.invalidateQueries({ queryKey: ['me'] });
      router.push('/my');
    },
    onError: (error) => {
      if (isAxiosError(error) && error.response) {
        if (error.response?.status === 400 && error.response.data?.message) {
          const serverMessage = error.response.data.message;
          setError('nickname', {
            type: 'manual',
            message: serverMessage,
          });
          return;
        }
      }
      alert('프로필 수정에 실패했습니다. 다시 시도해주세요.');
    },
  });

  // 폼 제출 핸들러
  const onSubmit: SubmitHandler<ProfileFormType> = (data) =>
    mutation.mutate(data);

  if (isloading) {
    return (
      <>
        <LoadingSpinner />
      </>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center"
    >
      <div className="relative mb-[2rem] h-[12rem] w-[12rem] md:mb-[2.4rem]">
        <Image
          src={previewUrl}
          alt="profile-image"
          fill
          className="rounded-full object-cover"
        />
        <input
          type="file"
          accept="image/*"
          className="hidden"
          id="profile-image-input"
          onChange={handleProfileImageChange}
        />
        <label htmlFor="profile-image-input">
          <Image
            src="/images/icons/edit-button.png"
            alt="edit-image"
            width={30}
            height={30}
            className="absolute right-0 bottom-0 cursor-pointer"
          />
        </label>
      </div>
      <div className="w-full">
        <FormInput
          label="닉네임"
          name="nickname"
          type="text"
          placeholder=""
          register={register}
          error={errors.nickname}
        />
        <FormInput
          label="이메일"
          name="email"
          type="email"
          disabled
          register={register}
          className="text-gray-400"
        />
        <FormInput
          label="비밀번호"
          name="password"
          type="password"
          placeholder="변경할 경우에만 입력해주세요"
          register={register}
          error={errors.password}
        />
        <FormInput
          label="비밀번호 확인"
          name="confirmPassword"
          type="password"
          placeholder="변경할 경우에만 입력해주세요"
          register={register}
          error={errors.confirmPassword}
        />
      </div>
      <div className="mt-[1.2rem] flex w-full justify-between gap-[1.2rem] md:justify-center">
        <button
          type="button"
          onClick={() => router.push('/my')}
          className="h-[4.7rem] w-full cursor-pointer rounded-[1.4rem] border border-gray-200 text-[1.6rem] font-medium text-gray-600 md:hidden"
        >
          취소하기
        </button>
        <button
          type="submit"
          disabled={!isValid || isSubmitting || (!isDirty && !isImageChanged)}
          className="bg-main h-[4.7rem] w-full cursor-pointer rounded-[1.4rem] text-[1.6rem] font-bold text-white disabled:bg-gray-200 md:h-[4.1rem] md:w-[12rem] md:text-[1.4rem]"
        >
          저장하기
        </button>
      </div>
    </form>
  );
};

export default Profile;
