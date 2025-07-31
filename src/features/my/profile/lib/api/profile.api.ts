import api from '@/shared/libs/api/axios';

import { ProfileImageUrlResponse, ProfilePatch } from '../types/types';

export const getMe = async () => {
  const response = await api.get('/users/me');
  return response.data;
};

export const editMe = async (payload: ProfilePatch) => {
  const response = await api.patch('/users/me', payload);
  return response.data;
};

// 이미지 변경 및 업로드 를 post를 통해 profileImageUrl 응답받음 -> 이를 다시 editMe patch에 적용
export const editImage = async (
  file: File,
): Promise<ProfileImageUrlResponse> => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await api.post('/users/me/image', formData);
  return response.data;
};
