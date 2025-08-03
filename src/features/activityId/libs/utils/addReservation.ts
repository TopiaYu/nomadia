export const addReservation = (scheduleId: number) => {
  if (typeof window === 'undefined') return [];
  const saved = JSON.parse(localStorage.getItem('myReservation') || '[]');
  saved.push(scheduleId);
  localStorage.setItem('myReservation', JSON.stringify(saved));
  console.log(JSON.parse(localStorage.getItem('myReservation') || '[]'), '✅');
};

export const getMyResertvation = (): number[] => {
  if (typeof window === 'undefined') return [];
  console.log('geteMuRservation!and diffing');
  return JSON.parse(localStorage.getItem('myReservation') || '[]');
};

export const removeReservation = (scheduleId: number | null) => {
  if (typeof window === 'undefined') return;
  if (scheduleId === null) {
    console.log('해당 스케줄은 "없는" 값으로, 로컬스토리지에서 삭제 못함.');
    return;
  }

  const saved = JSON.parse(
    localStorage.getItem('myReservation') || '[]',
  ) as number[];
  const filtered = saved.filter((id) => id !== scheduleId);
  localStorage.setItem('myReservation', JSON.stringify(filtered));
  console.log(`예약 ${scheduleId} 제거됨`, filtered, '🗑️');
  // 전역상태 스케줄아이디 값 널값으로 다시 리셋????
};
