export const getMonthRange = (year: number, month: number) => {
  const endOfMonth = new Date(year, month + 1, 0); // 이번달 마지막일
  const endOfPrevMonth = new Date(year, month, 0).getDate(); // 이전달 마지막일 (이번달의 0일 = 이전달의 마지막일)
  const startDayNum = new Date(year, month, 1).getDay(); // 남은 칸 갯수(이전달) == 이번달 1일의 요일(0~6)(일~토)
  const endDayNum = endOfMonth.getDay();

  // 앞 달에 해당하는 날짜 []
  const leadingDays = Array.from({ length: startDayNum }, (_, i) => {
    return endOfPrevMonth - i;
  }).reverse();
  // 다음 달에 해당하는 날짜 []
  const trailingDays = Array.from({ length: 6 - endDayNum }, (_, i) => {
    return i + 1;
  });
  // 이번달 날짜 []
  const thisMonthDays = Array.from({ length: endOfMonth.getDate() }, (_, i) => {
    return i + 1;
  });
  return { leadingDays, trailingDays, thisMonthDays };
};
