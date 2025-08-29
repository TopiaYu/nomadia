'use client';

import { CirclePlus, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import {
  createImageFormData,
  useImageUploadMutation,
  validateImageFile,
} from '@/features/activity-registration/libs/hooks/useImageMutation';

interface ImageUploadBaseProps {
  label: string;
  name: string;
  error?: { message?: string };
  required?: boolean;
  maxImages?: number;
  singleImage?: boolean;
  value: string | string[];
  onChange: (value: string | string[]) => void;
  className?: string;
}

/**
 * 공통 이미지 업로드 베이스 컴포넌트
 * @description 단일/다중 이미지 업로드를 모두 지원
 * @author 김영현
 */
const ImageUploadBase = ({
  label,
  name,
  error,
  maxImages = 4,
  singleImage = false,
  value,
  onChange,
  className = '',
}: ImageUploadBaseProps) => {
  const [localImageUrls, setLocalImageUrls] = useState<string[]>([]);
  const [uploadingIndexes, setUploadingIndexes] = useState<Set<number>>(
    new Set(),
  );
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 현재 이미지 개수 계산
  const currentImages = singleImage
    ? (value as string)
      ? [value as string]
      : []
    : (value as string[]);
  const totalImages = [...currentImages, ...localImageUrls].filter(
    (url) => url && url.trim() !== '',
  );
  const canAddMore = totalImages.length < maxImages;

  // 이미지 업로드 mutation
  const imageUploadMutation = useImageUploadMutation(
    (data) => {
      if (singleImage) {
        onChange(data.activityImageUrl);
        setLocalImageUrls([]);
        setIsUploading(false);
      } else {
        const newImageUrls = [...(value as string[]), data.activityImageUrl];
        onChange(newImageUrls);

        // 로컬 URL 제거
        setLocalImageUrls((prev) => {
          if (prev.length > 0) {
            const lastLocalUrl = prev[prev.length - 1];
            URL.revokeObjectURL(lastLocalUrl);
            return prev.slice(0, -1);
          }
          return prev;
        });

        // 업로드 중 상태 제거 (가장 오래된 것부터)
        setUploadingIndexes((prev) => {
          const newSet = new Set(prev);
          const oldestIndex = Math.min(...Array.from(newSet));
          newSet.delete(oldestIndex);
          return newSet;
        });
      }
    },
    (_error) => {
      // 업로드 실패 시 상태 정리
      handleUploadError();
    },
  );

  // 업로드 실패 시 상태 정리 함수
  const handleUploadError = () => {
    if (singleImage) {
      setLocalImageUrls([]);
      setIsUploading(false);
    } else {
      // 마지막 로컬 이미지 URL 제거
      setLocalImageUrls((prev) => {
        if (prev.length > 0) {
          const lastLocalUrl = prev[prev.length - 1];
          URL.revokeObjectURL(lastLocalUrl);
          return prev.slice(0, -1);
        }
        return prev;
      });

      // 업로드 중 상태 제거 (가장 오래된 것부터)
      setUploadingIndexes((prev) => {
        const newSet = new Set(prev);
        const oldestIndex = Math.min(...Array.from(newSet));
        newSet.delete(oldestIndex);
        return newSet;
      });
    }
  };

  // 파일 선택 핸들러
  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];

    // 파일 유효성 검사 (4MB 제한)
    const validation = validateImageFile(file, 4);
    if (!validation.isValid) {
      return;
    }

    // 중복 체크 비활성화 (사용자가 원하는 대로 이미지를 업로드할 수 있도록)

    // 로컬 이미지 URL 생성 (미리보기용)
    const localUrl = URL.createObjectURL(file);

    if (singleImage) {
      setLocalImageUrls([localUrl]);
      setIsUploading(true);
    } else {
      setLocalImageUrls((prev) => [...prev, localUrl]);
      const currentIndex = totalImages.length;
      setUploadingIndexes((prev) => new Set([...prev, currentIndex]));
    }

    // FormData 생성 및 이미지 업로드
    const formData = createImageFormData(file);
    imageUploadMutation.mutate(formData);
  };

  // 이미지 삭제 핸들러
  const handleRemoveImage = (index: number) => {
    if (singleImage) {
      onChange('');
      setLocalImageUrls([]);
      if (localImageUrls[0]) {
        URL.revokeObjectURL(localImageUrls[0]);
      }
    } else {
      if (index < currentImages.length) {
        const newImageUrls = currentImages.filter((_, i) => i !== index);
        onChange(newImageUrls);
      } else {
        const localIndex = index - currentImages.length;
        const newLocalUrls = localImageUrls.filter((_, i) => i !== localIndex);
        setLocalImageUrls(newLocalUrls);

        if (localImageUrls[localIndex]) {
          URL.revokeObjectURL(localImageUrls[localIndex]);
        }
      }
    }
  };

  // 드래그 앤 드롭 핸들러
  const handleDragOver = (e: React.DragEvent) => e.preventDefault();
  const handleDragLeave = (e: React.DragEvent) => e.preventDefault();
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (canAddMore) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  // 파일 입력 클릭 핸들러
  const handleUploadClick = () => {
    if (canAddMore) {
      // 파일 입력 value 초기화 (동일한 파일 재선택을 위해)
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      fileInputRef.current?.click();
    } else {
      alert('더 이상 이미지를 추가할 수 없습니다.');
    }
  };

  // 컴포넌트 언마운트 시 Object URL 정리
  useEffect(() => {
    return () => {
      // 남은 모든 로컬 이미지 URL 해제
      localImageUrls.forEach((url) => {
        if (url && url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [localImageUrls]);

  return (
    <div className={`flex flex-col gap-[0.8rem] ${className}`}>
      {/* 라벨 */}
      <label className="text-[1.6rem] font-bold text-gray-950">{label}</label>

      {/* 이미지 업로드 영역 */}
      <div
        className={`flex gap-[1.2rem] ${singleImage ? 'flex-wrap' : 'category-scroll pb-[0.8rem]'}`}
      >
        {/* 업로드 버튼 */}
        {canAddMore && (
          <div
            onClick={handleUploadClick}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleUploadClick();
              }
            }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            role="button"
            tabIndex={0}
            className="flex-center h-[8rem] w-[8rem] flex-shrink-0 cursor-pointer flex-col rounded-[0.8rem] border-1 border-gray-100 hover:bg-gray-50 md:h-[12.6rem] md:w-[12.6rem] md:rounded-[1.6rem]"
          >
            <div className="flex-center flex-col gap-[0.8rem]">
              <CirclePlus size={26} className="text-gray-500 opacity-70" />
              <p className="text-[1.3rem] font-medium text-gray-500 md:text-[1.4rem]">
                이미지 추가
              </p>
            </div>
          </div>
        )}

        {/* 업로드된 이미지들 */}
        {totalImages.map((imageUrl, index) => (
          <div key={index} className="relative">
            <div className="h-[8rem] w-[8rem] flex-shrink-0 overflow-hidden rounded-[0.8rem] border-1 border-gray-100 md:h-[12.6rem] md:w-[12.6rem]">
              <Image
                src={imageUrl}
                alt={`이미지 ${index + 1}`}
                className="h-full w-full object-cover md:h-[12.6rem] md:w-[12.6rem]"
                width={80}
                height={80}
              />

              {/* 업로드 중 오버레이 */}
              {(singleImage ? isUploading : uploadingIndexes.has(index)) && (
                <div className="bg-opacity-50 absolute inset-0 flex items-center justify-center rounded-[0.8rem] bg-black md:rounded-[1.6rem]">
                  <div className="text-[1.2rem] font-medium text-white">
                    업로드 중...
                  </div>
                </div>
              )}
            </div>

            {/* 삭제 버튼 - 업로드 중에도 표시 (사용자가 취소할 수 있도록) */}
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="bg-opacity-70 flex-center absolute -top-[0.5rem] -right-[0.7rem] h-[2rem] w-[2rem] cursor-pointer rounded-full bg-gray-950 text-white md:h-[2.6rem] md:w-[2.6rem]"
            >
              <X size={10} className="font-bold md:size-[1.8rem]" />
            </button>
          </div>
        ))}
      </div>

      {/* 이미지 개수 정보 (다중 이미지인 경우만) */}
      {!singleImage && (
        <p className="text-[1.3rem] font-medium text-gray-600">
          {totalImages.length}/{maxImages}개 (최대 {maxImages}개)
        </p>
      )}

      {/* 숨겨진 파일 입력 */}
      <input
        ref={fileInputRef}
        type="file"
        name={name}
        accept="image/*"
        onChange={(e) => {
          handleFileSelect(e.target.files);
        }}
        className="hidden"
      />

      {/* 에러 메시지 */}
      {error && <p className="text-[1.2rem] text-red-500">{error.message}</p>}
    </div>
  );
};

export default ImageUploadBase;
