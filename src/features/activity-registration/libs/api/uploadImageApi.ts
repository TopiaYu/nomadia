import api from '@/shared/libs/api/axios';

// 이미지 업로드 응답 타입
export interface UploadImageResponse {
  activityImageUrl: string;
  message?: string;
}

export const uploadImageApi = async (
  formData: FormData,
): Promise<UploadImageResponse> => {
  const { data } = await api.post<UploadImageResponse>(
    '/activities/image',
    formData,
  );

  return data;
};
