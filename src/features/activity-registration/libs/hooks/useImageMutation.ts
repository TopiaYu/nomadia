import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { uploadImageApi, UploadImageResponse } from '../api/uploadImageApi';

/**
 * 이미지 파일을 FormData로 변환하는 유틸리티 함수
 * @param file - 업로드할 이미지 파일
 * @param fieldName - FormData 필드명 (기본값: 'image')
 * @returns FormData 객체
 */
export const createImageFormData = (
  file: File,
  fieldName: string = 'image',
): FormData => {
  const formData = new FormData();
  formData.append(fieldName, file);
  return formData;
};

/**
 * 여러 이미지 파일을 FormData로 변환하는 유틸리티 함수
 * @param files - 업로드할 이미지 파일 배열
 * @param fieldName - FormData 필드명 (기본값: 'images')
 * @returns FormData 객체
 */
export const createMultipleImageFormData = (
  files: File[],
  fieldName: string = 'images',
): FormData => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append(fieldName, file);
  });
  return formData;
};

/**
 * 이미지 파일 유효성 검사 함수
 * @param file - 검사할 파일
 * @param maxSize - 최대 파일 크기 (MB, 기본값: 4MB)  추측으로는 4.5MB 넘으면 에러인거 같은데 정확히 명시되어있지 않아 4MB로 설정
 * @returns 유효성 검사 결과
 */
export const validateImageFile = (
  file: File,
  maxSize: number = 4,
): { isValid: boolean; error?: string } => {
  // 파일 타입 검사
  if (!file.type.startsWith('image/')) {
    return { isValid: false, error: '이미지 파일만 업로드 가능합니다.' };
  }

  // 파일 크기 검사 (MB 단위)
  const fileSizeInMB = file.size / (1024 * 1024);
  if (fileSizeInMB > maxSize) {
    return {
      isValid: false,
      error: `파일 크기는 ${maxSize}MB 이하여야 합니다. (현재: ${fileSizeInMB.toFixed(1)}MB)`,
    };
  }

  return { isValid: true };
};

/**
 * 이미지 업로드 mutation 훅
 * @description FormData를 받아서 이미지를 업로드하는 훅
 * @author 김영현
 * @param onSuccess - 업로드 성공 시 실행할 콜백 함수 (선택사항)
 * @param onError - 업로드 실패 시 실행할 콜백 함수 (선택사항)
 * @returns 이미지 업로드 mutation 객체
 */
export const useImageUploadMutation = (
  onSuccess?: (data: UploadImageResponse) => void,
  onError?: (error: Error) => void,
) => {
  return useMutation<UploadImageResponse, Error, FormData>({
    mutationFn: uploadImageApi,
    onSuccess: (data) => {
      toast.success('이미지가 성공적으로 업로드되었습니다.');
      onSuccess?.(data);
    },
    onError: (error) => {
      console.error('이미지 업로드 실패:', error);
      toast.error('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
      onError?.(error);
    },
  });
};
