import {useEffect, useState} from 'react';
import {getDaysInMonth} from 'utils/dateAndHelpers';

const useHeaderDate = (date: Date) => {
  const [selectedDate, setSelectedDate] = useState<Date>(date);
  const [day, setDay] = useState<number>(1);
  const [month, setMonth] = useState<number>(1);
  const [year, setYear] = useState<number>(1);

  useEffect(() => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    setDay(day);
    setMonth(month);
    setYear(year);
  }, []);

  const updateDay = (value: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(value);
    setSelectedDate(newDate);
    setDay(value);
  };

  const updateMonth = (value: number) => {
    const newMax = getDaysInMonth(value, year);
    if (day > newMax) {
      setDay(newMax);
      setMonth(value);
      const newDate = new Date(selectedDate);
      newDate.setDate(newMax);
      newDate.setMonth(value - 1);
      setSelectedDate(newDate);
    } else {
      const newDate = new Date(selectedDate);
      newDate.setMonth(value - 1);
      setSelectedDate(newDate);
      setMonth(value);
    }
  };

  const updateYear = (value: number) => {
    const newMax = getDaysInMonth(month, value);
    if (day > newMax) {
      setDay(newMax);
      setYear(value);
      const newDate = new Date(selectedDate);
      newDate.setDate(newMax);
      newDate.setMonth(month - 1);
      newDate.setFullYear(value);
      setSelectedDate(newDate);
    } else {
      const newDate = new Date(selectedDate);
      newDate.setFullYear(value);
      setSelectedDate(newDate);
      setYear(value);
    }
  };

  return {
    selectedDate,
    day,
    month,
    year,
    updateDay,
    updateMonth,
    updateYear,
  };
};

export default useHeaderDate;
