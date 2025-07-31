import ImageUploadBase from './image-upload-base';

interface SubImageUploadProps {
  label: string;
  name: string;
  error?: { message?: string };
  value: string[]; // 이미지 URL 배열
  onChange: (imageUrls: string[]) => void;
  maxImages?: number;
}

/**
 * 소개 이미지 업로드 컴포넌트
 * 최대 4장까지 업로드 가능하며, 공통 베이스 컴포넌트를 활용
 */
const SubImageUpload = ({
  label,
  name,
  error,
  value,
  onChange,
  maxImages = 4,
}: SubImageUploadProps) => {
  return (
    <ImageUploadBase
      label={label}
      name={name}
      error={error}
      singleImage={false}
      maxImages={maxImages}
      value={value}
      onChange={(newValue) => onChange(newValue as string[])}
      className="mb-[2.4rem]"
    />
  );
};

export default SubImageUpload;
