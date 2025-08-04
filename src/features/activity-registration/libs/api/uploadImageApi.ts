import api from '@/shared/libs/api/axios';

// 이미지 업로드 응답 타입
export interface UploadImageResponse {
  activityImageUrl: string;
  message?: string;
}

/**
 * 이미지 업로드 API
 * @description 이미지 업로드 API
 * @author 김영현
 * @param formData 이미지 폼 데이터
 * @returns 이미지 업로드 응답
 */
export const uploadImageApi = async (
  formData: FormData,
): Promise<UploadImageResponse> => {
  const { data } = await api.post<UploadImageResponse>(
    '/activities/image',
    formData,
  );

  return data;
};
