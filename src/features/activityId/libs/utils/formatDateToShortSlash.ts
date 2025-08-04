export const formatDateToShortSlash = (dateStr: string | null) => {
  if (!dateStr) return;

  const [year, month, day] = dateStr.split('-');
  return `${year.slice(-2)}/${month}/${day}`;
};
