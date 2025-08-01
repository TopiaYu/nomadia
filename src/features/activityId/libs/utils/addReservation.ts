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
