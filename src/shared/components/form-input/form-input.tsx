import Image from 'next/image';
import { useState } from 'react';
import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';

/**
 * @description react-hook-form 과 함께 쓰는 공통 입력 컴포넌트
 *  * 제네릭을 사용하여 로그인, 회원가입 등 모든 폼에서 재사용할 수 있습니다. so hard,,,
 * @param {string} label - 창 위에 표시될 라벨 텍스트
 * @param {Path<T>} name - react-hook-form에 등록할 필드의 이름
 * @param {UseFormRegister<T>} register - 부모 폼에서 전달받는 react-hook-form의 register 함수
 * @param {FieldError} [errors] - 해당 필드의 유효성 검사 에러 객체
 * @param {React.InputHTMLAttributes<HTMLInputElement>} ...rest - type, placeholder 등 표준 HTML input 속성을 그대로 전달받습니다.
 */

interface FormInputProps<T extends FieldValues>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: FieldError;
}

export const FormInput = <T extends FieldValues>({
  label,
  name,
  register,
  error,
  ...rest
}: FormInputProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = rest.type === 'password';
  return (
    <div className="mb-[2.4rem] flex flex-col">
      <label htmlFor={name} className="txt-16-medium mb-[1.2rem] text-gray-950">
        {label}
      </label>
      <div className="relative">
        <input
          id={name}
          {...rest}
          type={
            isPasswordField ? (showPassword ? 'text' : 'password') : rest.type
          }
          {...register(name)} // type, placeholder 등을 여기에 적용
          className={`mb-[0.6rem] h-[4.4rem] w-full rounded-[1.2rem] border px-[1.6rem] text-[1.4rem] focus:outline-0 md:h-[4.8rem] md:text-[1.6rem] ${
            error ? 'border-red-500' : 'border-gray-200'
          } `}
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
      {error && <p className="txt-12-medium text-red-500">{error.message}</p>}
    </div>
  );
};
