import {render, fireEvent} from '@testing-library/react-native';
import {it, describe, expect, jest} from '@jest/globals';
import Counter, {CounterType} from '.';
import {TestID} from './testID';

describe('Counter component', () => {
  it('test counter title value', () => {
    const mockOnChange = jest.fn();
    const {getByTestId} = render(
      <Counter
        testID=""
        title="Day"
        type={'day'}
        initialValue={2}
        min={0}
        max={10}
        width={50}
        buttonDimension={10}
        onChange={mockOnChange}
      />,
    );

    const title = getByTestId(TestID.title);

    expect(title.props.children).toBe('Day');
  });

  it('test counter initial value', () => {
    const mockOnChange = jest.fn();
    const {getByTestId} = render(
      <Counter
        testID=""
        type={'day'}
        initialValue={2}
        min={0}
        max={10}
        width={50}
        buttonDimension={10}
        onChange={mockOnChange}
      />,
    );

    const counterValue = getByTestId(TestID.counterValue);

    expect(counterValue.props.children).toBe('2');
  });

  it('test counter initial value with DEFAULT MIN', () => {
    const mockOnChange = jest.fn();
    const {getByTestId} = render(
      <Counter
        testID=""
        type={'day'}
        initialValue={0}
        max={10}
        width={50}
        buttonDimension={10}
        onChange={mockOnChange}
      />,
    );

    const counterValue = getByTestId(TestID.counterValue);

    expect(counterValue.props.children).toBe('1');
  });

  it('test counter initial value below MIN', () => {
    const mockOnChange = jest.fn();
    const {getByTestId} = render(
      <Counter
        testID=""
        type={'day'}
        initialValue={2}
        min={10}
        max={100}
        width={50}
        buttonDimension={10}
        onChange={mockOnChange}
      />,
    );

    const counterValue = getByTestId(TestID.counterValue);

    expect(counterValue.props.children).toBe('10');
  });

  it('test counter initial value above MAX', () => {
    const mockOnChange = jest.fn();
    const {getByTestId} = render(
      <Counter
        testID=""
        type={'day'}
        initialValue={200}
        min={10}
        max={100}
        width={50}
        buttonDimension={10}
        onChange={mockOnChange}
      />,
    );

    const counterValue = getByTestId(TestID.counterValue);

    expect(counterValue.props.children).toBe('100');
  });

  it('test counter increase and decrease actions', () => {
    const mockOnChange = jest.fn();
    const {getByTestId} = render(
      <Counter
        testID=""
        type={'day'}
        initialValue={20}
        min={10}
        max={100}
        width={50}
        buttonDimension={10}
        onChange={mockOnChange}
      />,
    );

    const counterValue = getByTestId(TestID.counterValue);
    const incrementButton = getByTestId(TestID.incrementButton);
    const decrementButton = getByTestId(TestID.decrementButton);

    expect(counterValue.props.children).toBe('20');
    fireEvent.press(incrementButton);
    expect(counterValue.props.children).toBe('21');
    fireEvent.press(decrementButton);
    expect(counterValue.props.children).toBe('20');
  });

  it('test counter decrease OUT OF BOUNDS', () => {
    const mockOnChange = jest.fn();
    const {getByTestId} = render(
      <Counter
        testID=""
        type={'day'}
        initialValue={11}
        min={10}
        max={100}
        width={50}
        buttonDimension={10}
        onChange={mockOnChange}
      />,
    );

    const counterValue = getByTestId(TestID.counterValue);
    const decrementButton = getByTestId(TestID.decrementButton);

    expect(counterValue.props.children).toBe('11');

    fireEvent.press(decrementButton);
    fireEvent.press(decrementButton);
    fireEvent.press(decrementButton);
    fireEvent.press(decrementButton);

    expect(counterValue.props.children).toBe('10');
  });

  it('test counter increase OUT OF BOUNDS', () => {
    const mockOnChange = jest.fn();
    const {getByTestId} = render(
      <Counter
        testID=""
        type={'day'}
        initialValue={99}
        min={10}
        max={100}
        width={50}
        buttonDimension={10}
        onChange={mockOnChange}
      />,
    );

    const counterValue = getByTestId(TestID.counterValue);
    const increaseButton = getByTestId(TestID.incrementButton);

    expect(counterValue.props.children).toBe('99');

    fireEvent.press(increaseButton);
    fireEvent.press(increaseButton);
    fireEvent.press(increaseButton);
    fireEvent.press(increaseButton);

    expect(counterValue.props.children).toBe('100');
  });

  it('test counter callback', () => {
    const mockOnChange = jest.fn();
    const {getByTestId} = render(
      <Counter
        testID=""
        type={'day'}
        initialValue={50}
        min={10}
        max={100}
        width={50}
        buttonDimension={10}
        onChange={mockOnChange}
      />,
    );

    const counterValue = getByTestId(TestID.counterValue);
    const incrementButton = getByTestId(TestID.incrementButton);

    fireEvent.press(incrementButton);

    expect(counterValue.props.children).toBe('51');
    expect(mockOnChange).toHaveBeenCalledWith('day', 51);
  });

  it('test counter value and callback for type month', () => {
    const mockOnChange = jest.fn();
    const {getByTestId} = render(
      <Counter
        testID=""
        type={'month'}
        initialValue={2}
        min={1}
        max={12}
        width={50}
        buttonDimension={10}
        onChange={mockOnChange}
      />,
    );

    const counterValue = getByTestId(TestID.counterValue);
    const incrementButton = getByTestId(TestID.incrementButton);

    fireEvent.press(incrementButton);

    expect(counterValue.props.children).toBe('March');
    expect(mockOnChange).toHaveBeenCalledWith('month', 3);
  });
});
