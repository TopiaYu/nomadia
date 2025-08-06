export const formatDateWithDots = (date: string) => {
  const targetDate = new Date(date);
  return `${targetDate.getFullYear()}.${targetDate.getMonth() + 1}.${targetDate.getDate()}`;
};
