'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ParamValue } from 'next/dist/server/request/params';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

import BannerImageUpload from '@/features/activity-registration/components/banner-image-upload';
import DateScheduler from '@/features/activity-registration/components/date-scheduler';
import SubImage from '@/features/activity-registration/components/sub-image';
import {
  CATEGORY_OPTIONS,
  FORM_CONSTRAINTS,
  TIME_OPTIONS,
} from '@/features/activity-registration/libs/constants/formOption';
import { getActivityId } from '@/features/activityId/libs/api/getActivityId';
import { ActivityInfo } from '@/features/activityId/libs/types/activityInfo';
import { useEditActivityMutation } from '@/features/my/activity-edit/libs/hooks/useEditActivityMutation';
import { EditActivityRequest } from '@/features/my/activity-edit/libs/types/types';
import { FormInput } from '@/shared/components/form-input/form-input';

// 기존 hasDuplicateStartTime 함수를 사용

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
        id: z.number().optional(),
        date: z.string().min(1, {
          message: '날짜를 선택해 주세요.',
        }),
        startTime: z.string().min(1, { message: '시작 시간을 선택해 주세요.' }),
        endTime: z.string().min(1, { message: '종료 시간을 선택해 주세요.' }),
      }),
    )
    .min(1, { message: '예약 가능한 시간대는 최소 1개 이상 등록해주세요.' }),
  bannerImages: z.string().min(1, { message: '배너 이미지를 등록해 주세요.' }),
  subImages: z
    .array(z.string())
    .min(1, { message: '소개 이미지를 등록해 주세요.' }),
});

type FormData = z.infer<typeof registerSchema>;

interface ActivityEditFormProps {
  activityId: ParamValue;
}
// activityId: ParamValue 를 받음 (동적 이동)
const ActivityEditForm = ({ activityId }: ActivityEditFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
  });

  const editMutation = useEditActivityMutation();
  const router = useRouter();
  const [initialActivityData, setInitialActivityData] =
    useState<ActivityInfo | null>(null);

  // activityId를 기반으로
  useEffect(() => {
    const fetchActivityData = async () => {
      try {
        const data = await getActivityId(activityId);
        if (data) {
          setInitialActivityData(data);
          reset({
            title: data.title,
            category: data.category,
            description: data.description,
            address: data.address,
            price: String(data.price), // formInput 수정 필요해보임
            bannerImages: data.bannerImageUrl,
            subImages: data.subImages.map((img) => img.imageUrl),
            schedules: data.schedules.map((schedule) => ({
              id: schedule.id,
              date: schedule.date,
              startTime: schedule.startTime,
              endTime: schedule.endTime,
            })),
          });
        } else {
          toast.error('체험 정보를 불러오지 못했습니다.');
          router.push('/my/my-activities');
        }
      } catch {
        toast.error('오류기 발생했습니다.');
        console.error('오류 발생'); // 디버깅용
      }
    };
    fetchActivityData();
  }, [activityId, reset, router]);

  const onSubmit = async (data: FormData) => {
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

    if (!initialActivityData) {
      toast.error('기존 체험 데이터를 불러오지 못했습니다.');
      return;
    }

    // 스케줄 처리 : 추가, 삭제 id 찾기
    // 초기 스케줄 데이터를 Map으로 설정
    const initialSchedulesMap = new Map(
      initialActivityData.schedules.map((sch) => [sch.id, sch]),
    );
    const schedulesToAdd: {
      date: string;
      startTime: string;
      endTime: string;
    }[] = [];
    const scheduleIdsToRemove: number[] = [];

    data.schedules.forEach((schdule) => {
      if (!schdule.id) {
        schedulesToAdd.push({
          date: schdule.date,
          startTime: schdule.startTime,
          endTime: schdule.endTime,
        });
      }
    });
    // 기존 스케줄과 비교하여 수정, 삭제 스케줄 찾기
    initialSchedulesMap.forEach((initialSchedule, id) => {
      const currentSchedule = data.schedules.find((sch) => sch.id === id);
      if (!currentSchedule) {
        // 폼에 없으면 삭제
        scheduleIdsToRemove.push(id);
      } else {
        const isModified =
          initialSchedule.date !== currentSchedule.date ||
          initialSchedule.startTime !== currentSchedule.startTime ||
          initialSchedule.endTime !== currentSchedule.endTime;
        if (isModified) {
          // 수정된 스케줄은 삭제 후 추가 리스트에 추가
          scheduleIdsToRemove.push(id);
          schedulesToAdd.push({
            date: currentSchedule.date,
            startTime: currentSchedule.startTime,
            endTime: currentSchedule.endTime,
          });
        }
      }
    });

    // 배너 이미지 : 추가, 삭제
    const initialSubImageUrls = new Set(
      initialActivityData?.subImages.map((img) => img.imageUrl),
    );
    const currentImageUrls = new Set(data.subImages);
    const subImageUrlsToAdd = data.subImages.filter(
      (url) => !initialSubImageUrls.has(url),
    );
    const subImageIdsToRemove = initialActivityData.subImages
      .filter((img) => !currentImageUrls.has(img.imageUrl))
      .map((img) => img.id);

    // API 요청 데이터 생성
    const payload: EditActivityRequest = {
      title: data.title,
      category: data.category,
      description: data.description,
      price: Number(data.price),
      address: data.address,
      bannerImageUrl: data.bannerImages,
      schedulesToAdd,
      scheduleIdsToRemove,
      subImageUrlsToAdd,
      subImageIdsToRemove,
    };
    editMutation.mutateAsync({ id: Number(activityId), payload });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-[2.4rem] flex flex-col"
      onKeyDown={(e) => {
        if (e.key === 'Enter' && e.target instanceof HTMLInputElement) {
          const target = e.target as HTMLInputElement;
          if (target.type === 'button' || target.readOnly) {
            e.preventDefault();
            e.stopPropagation();
          }
        }
      }}
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
        setValue={setValue}
        watch={watch}
        error={errors.address}
        inputType="address"
        placeholder="주소를 입력해 주세요"
        required
      />

      {/* DateScheduler 컴포넌트 사용 */}
      <DateScheduler
        schedules={watch('schedules') || []}
        onChange={async (schedules) => {
          setValue('schedules', schedules);
          await trigger('schedules');
        }}
        errors={{ schedules: errors.schedules }}
        register={register}
        formErrors={errors}
      />

      <BannerImageUpload
        label="배너 이미지 등록"
        name="bannerImages"
        error={errors.bannerImages}
        required
        onChange={async (imageUrl: string) => {
          setValue('bannerImages', imageUrl);
          await trigger('bannerImages');
        }}
        value={watch('bannerImages') || ''}
      />

      <SubImage
        label="소개 이미지 등록"
        name="subImages"
        error={errors.subImages}
        onChange={async (imageUrls: string[]) => {
          setValue('subImages', imageUrls);
          await trigger('subImages');
        }}
        value={watch('subImages') || []}
      />

      {/* 제출 버튼 */}
      <div className="flex-center">
        <button
          type="submit"
          disabled={editMutation.isPending}
          className={`h-[4.1rem] w-[16rem] cursor-pointer rounded-[1.2rem] text-center text-[1.4rem] font-bold text-white md:h-[4.8rem] md:w-[16rem] md:rounded-[1.6rem] md:text-[1.6rem] lg:h-[5.2rem] lg:w-[18rem] ${
            editMutation.isPending
              ? 'cursor-not-allowed bg-gray-400'
              : 'bg-main hover:bg-blue-500'
          }`}
        >
          수정하기
        </button>
      </div>
    </form>
  );
};

export default ActivityEditForm;
