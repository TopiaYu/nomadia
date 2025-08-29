/**
 * 공통 컴포넌트들을 하나의 청크로 묶기 위한 index 파일
 * @author 김영현
 * @description 코드 스플리팅 최적화를 위해 자주 사용되는 컴포넌트들을 여기서 export
 */

// 자주 사용되는 기본 컴포넌트들
export { default as EmptyStarImage } from './empty-star/empty-star';
export { ErrorMessage } from './error-message/error-message';
export { default as LoadingSpinner } from './loading-spinner/loading-spinner';
export { default as StarImage } from './star/star';

// 모달 관련
export { useModalStore } from './modal/libs/stores/useModalStore';

// 폼 관련
export { FormInput } from './form-input/form-input';

// 네비게이션 관련
export { default as Dropdown } from './dropdown/dropdown';
export { default as Footer } from './footer/footer';
export { default as Header } from './header/header';

// 페이지네이션
export { default as Pagination } from './pagination/pagination';

// 인증 관련
export { AuthGuard } from './auth/AuthGuard';
