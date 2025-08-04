import { Search } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';

import Modal from '@/shared/components/modal/components';
import { useModalStore } from '@/shared/libs/stores/useModalStore';

/**
 * 공통 입력 컴포넌트
 * @description 공통 입력 컴포넌트 (input, textarea, select, number, address)
 * @author 김영현, 유동환
 * @param label 창 위에 표시될 라벨 텍스트
 * @param name react-hook-form에 등록할 필드의 이름
 * @param register 부모 폼에서 전달받는 react-hook-form의 register 함수
 * @param setValue 부모 폼에서 전달받는 react-hook-form의 setValue 함수
 * @param watch 부모 폼에서 전달받는 react-hook-form의 watch 함수
 * @param error 해당 필드의 유효성 검사 에러 객체
 * @param inputType 입력 요소의 타입
 * @param options select 타입일 때 사용할 옵션들
 * @param rows textarea 타입일 때 사용할 행 수
 * @param type 입력 요소의 타입
 * @param placeholder 입력 요소의 플레이스홀더
 * @param className 입력 요소의 클래스 이름
 * @param [key: string]: unknown 기타 HTML 속성들
 */
interface FormInputProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  setValue?: (name: Path<T>, value: string) => void;
  watch?: (name: Path<T>) => string;
  error?: FieldError;
  inputType?: 'input' | 'textarea' | 'select' | 'number' | 'address';
  options?: Array<{ value: string; label: string }>;
  rows?: number;
  type?: string;
  placeholder?: string;
  className?: string;
  [key: string]: unknown; // 기타 HTML 속성들
}

export const FormInput = <T extends FieldValues>({
  label,
  name,
  register,
  setValue,
  watch,
  error,
  inputType = 'input',
  options = [],
  rows = 4,
  type = 'text',
  placeholder,
  className = '',
  ...rest
}: FormInputProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === 'password';

  const { openModal, closeModal } = useModalStore();

  // 공통 스타일 클래스
  const baseInputClass = `w-full bg-white rounded-[1.2rem] border px-[1.6rem] text-[1.4rem] focus:outline-0 md:text-[1.6rem] ${
    error ? 'border-red-500' : 'border-gray-200'
  } ${className}`;

  // 입력 요소 렌더링 함수
  const renderInputElement = () => {
    switch (inputType) {
      case 'textarea':
        return (
          <textarea
            id={name}
            rows={rows}
            placeholder={placeholder}
            {...register(name, {
              setValueAs: (value) => value, // 원본 값을 그대로 유지하여 엔터 문자 보존
            })}
            className={`${baseInputClass} h-auto resize-none py-[1.2rem]`}
            {...rest}
          />
        );

      case 'select':
        return (
          <div className="relative">
            <select
              id={name}
              {...register(name)}
              className={`${baseInputClass} h-[4.4rem] appearance-none pr-[4rem] md:h-[4.8rem]`}
              {...rest}
            >
              <option value="" disabled>
                {placeholder || '선택해 주세요'}
              </option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-[1.6rem]">
              <Image
                src="/images/icons/arrow.svg"
                alt="dropdown-arrow"
                width={16}
                height={16}
                className="rotate-270"
              />
            </div>
          </div>
        );

      case 'number':
        return (
          <input
            id={name}
            type="number"
            placeholder={placeholder}
            {...register(name, {
              setValueAs: (value) => {
                if (!value || value.trim() === '') {
                  return undefined;
                }
                const num = parseInt(value, 10);
                return isNaN(num) ? undefined : num;
              },
            })}
            className={`${baseInputClass} h-[4.4rem] md:h-[4.8rem]`}
            {...rest}
            max={100000000}
            min={0}
            onInput={(e) => {
              const target = e.target as HTMLInputElement;
              if (target.value.length > 8) {
                target.value = target.value.slice(0, 8);
              }
            }}
          />
        );

      case 'address':
        return (
          <div className="relative">
            <button
              type="button"
              id={name}
              className={`${baseInputClass} flex h-[4.4rem] cursor-pointer items-center justify-between md:h-[4.8rem]`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                openModal();
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  e.stopPropagation();
                  openModal();
                }
              }}
              aria-label={placeholder}
            >
              <span className="flex-1 text-left">
                {watch ? watch(name) || placeholder : placeholder}
              </span>
              <Search className="h-[2rem] w-[2rem] text-gray-500 md:h-[2.4rem] md:w-[2.4rem]" />
            </button>
            <Modal type="custom" extraClassName="md: w-[60rem] h-[50rem]">
              <div>
                <DaumPostcode
                  onComplete={(data) => {
                    // 주소 선택 완료 시 입력 필드에 값 설정
                    const fullAddress = data.address;
                    if (setValue) {
                      setValue(name, fullAddress);
                    }
                    closeModal();
                  }}
                />
              </div>
            </Modal>
          </div>
        );

      default: // input
        return (
          <div className="relative">
            <input
              id={name}
              type={
                isPasswordField ? (showPassword ? 'text' : 'password') : type
              }
              placeholder={placeholder}
              {...register(name)}
              className={`${baseInputClass} h-[4.4rem] md:h-[4.8rem]`}
              {...rest}
            />
            {isPasswordField && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center pr-3"
              >
                {showPassword ? (
                  <Image
                    src="/images/icons/eye-on.png"
                    alt="eye-on"
                    width={24}
                    height={24}
                  />
                ) : (
                  <Image
                    src="/images/icons/eye-off.png"
                    alt="eye-off"
                    width={24}
                    height={24}
                  />
                )}
              </button>
            )}
          </div>
        );
    }
  };

  return (
    <div className="mb-[2.4rem] flex flex-col gap-[1rem]">
      <label htmlFor={name} className="text-[1.6rem] font-bold text-gray-950">
        {label}
      </label>
      {renderInputElement()}
      {error && (
        <p className="text-[1.2rem] font-medium text-red-500">
          {inputType === 'number' &&
          (error.message ===
            'Invalid input: expected number, received undefined' ||
            error.message === 'Expected number, received nan')
            ? '금액을 작성해주세요'
            : error.message}
        </p>
      )}
    </div>
  );
};
