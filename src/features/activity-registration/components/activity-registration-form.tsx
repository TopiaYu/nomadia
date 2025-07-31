'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import z from 'zod';

import BannerImageUpload from '@/features/activity-registration/components/banner-image-upload';
import DateScheduler from '@/features/activity-registration/components/date-scheduler';
import SubImage from '@/features/activity-registration/components/sub-image';
import {
  CATEGORY_OPTIONS,
  FORM_CONSTRAINTS,
  TIME_OPTIONS,
} from '@/features/activity-registration/libs/constants/formOption';
import { useRegistrationMutation } from '@/features/activity-registration/libs/hooks/useRegistrationMutation';
import { FormInput } from '@/shared/components/form-input/form-input';
import Modal from '@/shared/components/modal/components';
import { useModalStore } from '@/shared/libs/stores/useModalStore';
import {
  ActivityRegistrationFormData,
  ActivityRegistrationParams,
} from '@/shared/types/activity';

// 업데이트된 스키마 - schedules 배열로 변경
const registerSchema = z.object({
  title: z.string().min(1, { message: '제목을 입력해 주세요.' }),
  category: z.string().min(1, { message: '카테고리를 선택해 주세요.' }),
  address: z.string().min(1, { message: '주소를 입력해주세요.' }),
  description: z.string().min(1, { message: '설명을 입력해 주세요.' }),
  price: z
    .number()
    .min(FORM_CONSTRAINTS.PRICE.MIN, {
      message: `최소 ${FORM_CONSTRAINTS.PRICE.MIN}원 이상 입력해 주세요.`,
    })
    .max(FORM_CONSTRAINTS.PRICE.MAX, {
      message: `최대 ${FORM_CONSTRAINTS.PRICE.MAX.toLocaleString()}원 이하 입력해 주세요.`,
    }),
  schedules: z
    .array(
      z.object({
        date: z.string().min(1, { message: '날짜를 선택해 주세요.' }),
        startTime: z.string().min(1, { message: '시작 시간을 선택해 주세요.' }),
        endTime: z.string().min(1, { message: '종료 시간을 선택해 주세요.' }),
      }),
    )
    .min(FORM_CONSTRAINTS.SCHEDULES.MIN_COUNT, {
      message: '최소 하나의 시간대를 등록해 주세요.',
    }),
  bannerImages: z.string().min(1, { message: '배너 이미지를 등록해 주세요.' }),
  subImages: z
    .array(z.string())
    .min(1, { message: '소개 이미지를 등록해 주세요.' }),
});

const ActivityRegistrationForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ActivityRegistrationFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      schedules: [],
      bannerImages: '',
      subImages: [],
    },
  });

  const registrationMutation = useRegistrationMutation();
  const { openModal, closeModal } = useModalStore();
  const router = useRouter();

  const onSubmit = (data: ActivityRegistrationFormData) => {
    // 모든 스케줄의 시간 유효성 검증
    const hasInvalidSchedules = data.schedules.some((schedule) => {
      const startIndex = TIME_OPTIONS.findIndex(
        (option) => option.value === schedule.startTime,
      );
      const endIndex = TIME_OPTIONS.findIndex(
        (option) => option.value === schedule.endTime,
      );
      return endIndex <= startIndex;
    });

    if (hasInvalidSchedules) {
      alert('시간 설정을 확인해 주세요.');
      return;
    }

    // API 데이터 변환
    const apiData: ActivityRegistrationParams = {
      title: data.title,
      category: data.category,
      description: data.description,
      address: data.address,
      price: data.price,
      bannerImageUrl: data.bannerImages,
      schedules: data.schedules,
      subImageUrls: data.subImages,
    };

    // TanStack Query mutation 실행
    registrationMutation.mutate(apiData, {
      onSuccess: () => {
        openModal();
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-[2.4rem] flex flex-col"
    >
      {/* 제목 */}
      <FormInput
        label="제목"
        name="title"
        register={register}
        error={errors.title}
        inputType="input"
        placeholder="제목을 입력해 주세요"
        required
      />

      {/* 카테고리 */}
      <FormInput
        label="카테고리"
        name="category"
        register={register}
        error={errors.category}
        inputType="select"
        options={CATEGORY_OPTIONS}
        placeholder="카테고리를 선택해 주세요"
        required
      />

      {/* 설명 */}
      <FormInput
        label="설명"
        name="description"
        register={register}
        error={errors.description}
        inputType="textarea"
        rows={6}
        placeholder="체험에 대한 설명을 입력해 주세요"
        required
      />

      {/* 가격 */}
      <FormInput
        label="가격"
        name="price"
        register={register}
        error={errors.price}
        inputType="number"
        placeholder="체험 금액을 입력해 주세요"
        required
      />

      {/* 주소 */}
      <FormInput
        label="주소"
        name="address"
        register={register}
        error={errors.address}
        inputType="input"
        placeholder="주소를 입력해 주세요"
        required
      />

      {/* DateScheduler 컴포넌트 사용 */}
      <DateScheduler
        schedules={watch('schedules') || []}
        onChange={(schedules) => setValue('schedules', schedules)}
        errors={{ schedules: errors.schedules }}
      />

      <BannerImageUpload
        label="배너 이미지 등록"
        name="bannerImages"
        error={errors.bannerImages}
        required
        onChange={(imageUrl: string) => setValue('bannerImages', imageUrl)}
        value={watch('bannerImages') || ''}
      />

      <SubImage
        label="소개 이미지 등록"
        name="subImages"
        error={errors.subImages}
        onChange={(imageUrls: string[]) => setValue('subImages', imageUrls)}
        value={watch('subImages') || []}
      />

      {/* 제출 버튼 */}
      <div className="flex-center">
        <button
          type="submit"
          disabled={registrationMutation.isPending}
          className={`h-[4.1rem] w-[16rem] rounded-[1.2rem] text-center text-[1.4rem] font-bold text-white md:h-[4.8rem] md:w-[16rem] md:rounded-[1.6rem] md:text-[1.6rem] lg:h-[5.2rem] lg:w-[18rem] ${
            registrationMutation.isPending
              ? 'cursor-not-allowed bg-gray-400'
              : 'bg-main hover:bg-blue-500'
          }`}
        >
          {registrationMutation.isPending ? '등록 중...' : '체험 등록하기'}
        </button>
        <Modal type="confirm">
          <Modal.Header>체험 등록이 완료되었습니다.</Modal.Header>
          <Modal.Button
            color="blue"
            ariaLabel="확인 버튼"
            onClick={() => {
              closeModal();
              router.push('/activities');
            }}
          >
            확인
          </Modal.Button>
        </Modal>
      </div>
    </form>
  );
};

export default ActivityRegistrationForm;
