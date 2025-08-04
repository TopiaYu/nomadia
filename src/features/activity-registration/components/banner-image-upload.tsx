import ImageUploadBase from './image-upload-base';

interface BannerImageUploadProps {
  label: string;
  name: string;
  error?: { message?: string };
  required?: boolean;
  value: string; // 이미지 URL string
  onChange: (imageUrl: string) => void;
}

/**
 * 배너 이미지 업로드 컴포넌트
 * @description 1장만 업로드 가능하며, 공통 베이스 컴포넌트를 활용
 * @author 김영현
 */
const BannerImageUpload = ({
  label,
  name,
  error,
  required,
  value,
  onChange,
}: BannerImageUploadProps) => {
  return (
    <ImageUploadBase
      label={label}
      name={name}
      error={error}
      required={required}
      singleImage={true}
      maxImages={1}
      value={value}
      onChange={(newValue) => onChange(newValue as string)}
      className="mt-[3rem] mb-[2.4rem]"
    />
  );
};

export default BannerImageUpload;
