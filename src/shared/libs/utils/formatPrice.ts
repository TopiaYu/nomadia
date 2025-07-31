/**
 * @author 김영현
 * @param price 포매팅할 금액(숫자)
 * @returns 원화 형식의 문자열(천 단위마다 콤마 추가, ex: "42,000")
 */
export const formatPrice = (price: number): string => {
  if (typeof price !== 'number' || isNaN(price)) {
    return '0';
  }
  return price.toLocaleString('ko-KR');
};
