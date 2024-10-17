import React, {useEffect, useMemo} from 'react';
import Counter, {CounterType} from 'components/Counter';
import {StyleSheet, View} from 'react-native';
import useHeaderDate from './useHeaderDate';
import {getDaysInMonth} from 'utils/dateAndHelpers';
import {TestID} from './testID';

interface IHeaderDate {
  date: Date;
  onChange: (date: Date) => void;
}

const HeaderDate = ({
  date,
  onChange: onChangeSelectedDate,
}: IHeaderDate): JSX.Element => {
  const {day, month, year, updateDay, updateMonth, updateYear, selectedDate} =
    useHeaderDate(date);
  const onChange = (type: CounterType, value: number) => {
    switch (type) {
      case 'day':
        updateDay(value);
        break;
      case 'month':
        updateMonth(value);
        break;
      case 'year':
        updateYear(value);
      default:
        break;
    }
  };

  const maxDays = useMemo(() => {
    return getDaysInMonth(month, year);
  }, [day, month, year]);

  useEffect(() => {
    onChangeSelectedDate(selectedDate);
  }, [selectedDate]);

  return (
    <View style={styles.wrapper}>
      <Counter
        testID={TestID.headerDayCounter}
        type={'day'}
        initialValue={day}
        max={maxDays}
        title={'Day'}
        onChange={onChange}
        width={20}
        buttonDimension={25}
      />
      <Counter
        testID={TestID.headerMonthCounter}
        type={'month'}
        initialValue={month}
        max={12}
        title={'Month'}
        onChange={onChange}
        width={30}
        buttonDimension={25}
      />
      <Counter
        testID={TestID.headerYearCounter}
        type={'year'}
        initialValue={year}
        max={3000}
        title={'Year'}
        onChange={onChange}
        width={25}
        buttonDimension={25}
      />
    </View>
  );
};

export default HeaderDate;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#4794b5',
    width: '100%',
    height: 60,
  },
});
