import {render, fireEvent} from '@testing-library/react-native';
import {it, describe, expect, jest} from '@jest/globals';
import HeaderDate from '.';
import {TestID} from './testID';
import {TouchableOpacity} from 'react-native';

describe('Test header date', () => {
  it('test initial header date', () => {
    const dateToBePassed = new Date(2024, 11, 15, 0, 0, 0, 0);
    const mockOnChange = jest.fn();
    const {getByTestId} = render(
      <HeaderDate date={dateToBePassed} onChange={mockOnChange} />,
    );

    expect(mockOnChange).toHaveBeenCalledWith(dateToBePassed);
  });

  it('test change day increment', () => {
    const dateToBePassed = new Date(2024, 9, 15, 0, 0, 0, 0);
    const mockOnChange = jest.fn();
    const {getByTestId} = render(
      <HeaderDate date={dateToBePassed} onChange={mockOnChange} />,
    );

    const expectedDateIncrement = new Date(2024, 9, 18, 0, 0, 0, 0);

    const dayCounter = getByTestId(TestID.headerDayCounter);
    const incrementDayButton = dayCounter.findAllByType(TouchableOpacity)[1];
    const decrementDayButton = dayCounter.findAllByType(TouchableOpacity)[0];

    fireEvent.press(incrementDayButton);
    fireEvent.press(incrementDayButton);
    fireEvent.press(incrementDayButton);

    expect(mockOnChange).toHaveBeenCalledWith(expectedDateIncrement);
  });

  it('test change day decrement', () => {
    const dateToBePassed = new Date(2024, 9, 15, 0, 0, 0, 0);
    const mockOnChange = jest.fn();
    const {getByTestId} = render(
      <HeaderDate date={dateToBePassed} onChange={mockOnChange} />,
    );

    const expectedDateDecrement = new Date(2024, 9, 12, 0, 0, 0, 0);

    const dayCounter = getByTestId(TestID.headerDayCounter);
    const incrementDayButton = dayCounter.findAllByType(TouchableOpacity)[1];
    const decrementDayButton = dayCounter.findAllByType(TouchableOpacity)[0];

    fireEvent.press(decrementDayButton);
    fireEvent.press(decrementDayButton);
    fireEvent.press(decrementDayButton);

    expect(mockOnChange).toHaveBeenCalledWith(expectedDateDecrement);
  });

  it('test change day and month', () => {
    const dateToBePassed = new Date(2024, 9, 15, 0, 0, 0, 0);
    const mockOnChange = jest.fn();
    const {getByTestId} = render(
      <HeaderDate date={dateToBePassed} onChange={mockOnChange} />,
    );

    const expectedDate = new Date(2024, 6, 12, 0, 0, 0, 0);

    const dayCounter = getByTestId(TestID.headerDayCounter);
    const incrementDayButton = dayCounter.findAllByType(TouchableOpacity)[1];
    const decrementDayButton = dayCounter.findAllByType(TouchableOpacity)[0];

    fireEvent.press(decrementDayButton);
    fireEvent.press(decrementDayButton);
    fireEvent.press(decrementDayButton);

    const monthCounter = getByTestId(TestID.headerMonthCounter);
    const incrementMonthButton =
      monthCounter.findAllByType(TouchableOpacity)[1];
    const decrementMonthButton =
      monthCounter.findAllByType(TouchableOpacity)[0];

    fireEvent.press(decrementMonthButton);
    fireEvent.press(decrementMonthButton);
    fireEvent.press(decrementMonthButton);

    expect(mockOnChange).toHaveBeenCalledWith(expectedDate);
  });

  it('test change day, month and year', () => {
    const dateToBePassed = new Date(2024, 9, 15, 0, 0, 0, 0);
    const mockOnChange = jest.fn();
    const {getByTestId} = render(
      <HeaderDate date={dateToBePassed} onChange={mockOnChange} />,
    );

    const expectedDate = new Date(2026, 10, 12, 0, 0, 0, 0);

    const dayCounter = getByTestId(TestID.headerDayCounter);
    const incrementDayButton = dayCounter.findAllByType(TouchableOpacity)[1];
    const decrementDayButton = dayCounter.findAllByType(TouchableOpacity)[0];

    fireEvent.press(decrementDayButton);
    fireEvent.press(decrementDayButton);
    fireEvent.press(decrementDayButton);

    const monthCounter = getByTestId(TestID.headerMonthCounter);
    const incrementMonthButton =
      monthCounter.findAllByType(TouchableOpacity)[1];
    const decrementMonthButton =
      monthCounter.findAllByType(TouchableOpacity)[0];

    fireEvent.press(incrementMonthButton);

    const yearCounter = getByTestId(TestID.headerYearCounter);
    const incrementYearButton = yearCounter.findAllByType(TouchableOpacity)[1];
    const decrementYearButton = yearCounter.findAllByType(TouchableOpacity)[0];

    fireEvent.press(incrementYearButton);
    fireEvent.press(incrementYearButton);

    expect(mockOnChange).toHaveBeenCalledWith(expectedDate);
  });

  it('test change month when days are not allowed from 10/31/2024 -> change only month ->  11/30/2024 since November does not have 31 days', () => {
    const dateToBePassed = new Date(2024, 9, 31, 0, 0, 0, 0);
    const mockOnChange = jest.fn();
    const {getByTestId} = render(
      <HeaderDate date={dateToBePassed} onChange={mockOnChange} />,
    );

    const expectedDate = new Date(2024, 10, 30, 0, 0, 0, 0);

    const monthCounter = getByTestId(TestID.headerMonthCounter);
    const incrementMonthButton =
      monthCounter.findAllByType(TouchableOpacity)[1];
    const decrementMonthButton =
      monthCounter.findAllByType(TouchableOpacity)[0];

    fireEvent.press(incrementMonthButton);

    expect(mockOnChange).toHaveBeenCalledWith(expectedDate);
  });
});
