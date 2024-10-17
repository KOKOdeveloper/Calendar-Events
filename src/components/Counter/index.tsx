import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {useEffect, useMemo, useState} from 'react';
import {Text} from 'react-native';
import {getMonthName} from 'utils/dateAndHelpers';
import {TestID} from './testID';
export type CounterProps = {
  testID: string;
  type: CounterType;
  initialValue: number;
  min?: number;
  max: number;
  title?: string;
  width: number;
  buttonDimension: number;
  onChange: (type: CounterType, value: number) => void;
};

export type CounterType = 'day' | 'month' | 'hour' | 'minutes' | 'year';

const Counter = ({
  testID,
  type,
  onChange,
  initialValue,
  width,
  min = 1,
  max,
  buttonDimension,
  title,
}: CounterProps): JSX.Element => {
  const [count, setCount] = useState<number>(initialValue);

  const increase = () => {
    if (count < max) {
      setCount(prevCount => prevCount + 1);
    }
  };

  const decrease = () => {
    if (count > min) {
      setCount(prevCount => prevCount - 1);
    }
  };

  const textValue = useMemo(() => {
    switch (type) {
      case 'month':
        return getMonthName(count);
      default:
        return `${count}`;
    }
  }, [type, count, initialValue]);

  useEffect(() => {
    if (initialValue < min) {
      setCount(min);
    } else if (initialValue > max) {
      setCount(max);
    } else {
      setCount(initialValue);
    }
  }, [initialValue]);

  useEffect(() => {
    onChange(type, count);
  }, [count]);

  return (
    <View testID={testID} style={[styles.container, {width: `${width}%`}]}>
      <View style={styles.wrapperTitle}>
        <Text
          testID={TestID.title}
          style={{
            fontSize: buttonDimension / 2,
            fontStyle: 'italic',
            fontWeight: 900,
            color: 'white',
          }}>
          {title}
        </Text>
      </View>
      <View style={[styles.wrapperCounter, {height: buttonDimension * 1.5}]}>
        <TouchableOpacity
          testID={TestID.decrementButton}
          style={[
            styles.buttonStyle,
            {
              width: buttonDimension,
              height: buttonDimension,
              borderRadius: buttonDimension / 2,
            },
          ]}
          onPress={decrease}>
          <Text style={{fontSize: buttonDimension / 2}}>{'<'}</Text>
        </TouchableOpacity>
        <View style={styles.valueWrapper}>
          <Text
            testID={TestID.counterValue}
            style={{fontSize: buttonDimension / 2, color: 'white'}}>
            {textValue}
          </Text>
        </View>
        <TouchableOpacity
          testID={TestID.incrementButton}
          style={[
            styles.buttonStyle,
            {
              width: buttonDimension,
              height: buttonDimension,
              borderRadius: buttonDimension / 2,
            },
          ]}
          onPress={increase}>
          <Text style={{fontSize: buttonDimension / 2}}>{'>'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Counter;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  wrapperCounter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  valueWrapper: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#b1b9bd',
  },
});
