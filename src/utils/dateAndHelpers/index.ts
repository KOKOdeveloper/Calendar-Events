export const getMonthName = (monthNumber: number) => {
  if (monthNumber < 1 || monthNumber > 12) {
    return 'Invalid month number';
  }
  const date = new Date();
  date.setMonth(monthNumber - 1);
  return date.toLocaleString('default', {month: 'long'});
};

export const getDaysInMonth = (month: number, year: number) => {
  return new Date(year, month, 0).getDate();
};

export const isDateInRange = (
  dateToCheck: Date,
  startDate: Date,
  endDate: Date,
) => {
  return dateToCheck >= startDate && dateToCheck <= endDate;
};

export const getDifferenceInMinutesPercentTopOffset = (
  firstDate: Date,
  secondDate: Date,
) => {
  const differenceInMilliseconds = Math.abs(
    secondDate.getTime() - firstDate.getTime(),
  );
  const differenceInMinutes = Math.floor(
    differenceInMilliseconds / (1000 * 60),
  );
  const topOffset = differenceInMinutes / 60;
  return topOffset;
};

export const isSameDay = (firstDate: Date, secondDate: Date) => {
  return (
    firstDate.getFullYear() === secondDate.getFullYear() &&
    firstDate.getMonth() === secondDate.getMonth() &&
    firstDate.getDate() === secondDate.getDate()
  );
};

export const getTimeSlotIndex = (date: Date) => {
  const hour = date.getHours();
  return hour + 1;
};
