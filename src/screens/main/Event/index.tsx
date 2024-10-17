import React, {useEffect} from 'react';
import GeneralButton from 'components/GeneralButton';
import {StyleSheet, View, Text, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {RoutesMain} from 'navigation/routes';
import {ScrollView} from 'react-native-gesture-handler';
import {MainStackParamList} from 'navigation/main';
import HeaderDate from 'components/HeaderDate';
import Counter from 'components/Counter';
import TextField from 'components/CustomTextInput/TextField';
import useEventHandler from 'modules/main/hooks/useEventHandler';
import useKeyboardInset from 'utils/useKeyboardInset';
import LoadingIndicator from 'components/ActivityIndicator';
import {windowHeight} from 'utils/dimensions/dimension';
import {useDatabase} from 'databaseContext/useDatabaseContext';
import {TestID} from './testID';

const EventScreen = ({
  route: {
    params: {
      data: {event, type},
    },
  },
}: NativeStackScreenProps<
  MainStackParamList,
  RoutesMain.event
>): JSX.Element => {
  const {bottom} = useKeyboardInset();
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const {databaseType} = useDatabase();

  const {
    setDate,
    setStartHoursChange,
    setStartMinutesChange,
    setEndHoursChange,
    setEndMinutesChange,
    setDescriptionChange,
    createEvent,
    error,
    reset,
    isLoading,
    isSuccess,
  } = useEventHandler(event, type);

  useEffect(() => {
    if (isSuccess) {
      if (databaseType === 'Firebase') {
        navigation.goBack();
      } else {
        navigation.navigate({
          name: RoutesMain.calendar,
          params: {refresh: true},
        });
      }
    }
  }, [isSuccess]);

  const onCancel = () => {
    navigation.goBack();
  };

  const onCreate = () => {
    createEvent();
  };

  const onReset = () => {
    reset();
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>
            {type === 'create' ? 'Create new event' : 'Edit event'}
          </Text>
          <HeaderDate date={new Date(event.start)} onChange={setDate} />
          <Text style={styles.timeTitle}> Start time </Text>
          <View style={styles.timeCounterWrapper}>
            <Counter
              testID={TestID.startHourCounter}
              title="Hours"
              type={'hour'}
              initialValue={new Date(event.start).getHours()}
              max={23}
              min={0}
              width={25}
              buttonDimension={25}
              onChange={(_, value) => {
                setStartHoursChange(value);
              }}
            />
            <Counter
              testID={TestID.startMinutesCounter}
              title="Minutes"
              type={'minutes'}
              initialValue={new Date(event.start).getMinutes()}
              max={59}
              width={25}
              buttonDimension={25}
              onChange={(_, value) => {
                setStartMinutesChange(value);
              }}
            />
          </View>
          <Text style={styles.timeTitle}> End time </Text>
          <View style={styles.timeCounterWrapper}>
            <Counter
              testID={TestID.endHourCounter}
              title="Hours"
              type={'hour'}
              initialValue={new Date(event.end).getHours()}
              max={23}
              min={0}
              width={25}
              buttonDimension={25}
              onChange={(_, value) => {
                setEndHoursChange(value);
              }}
            />
            <Counter
              testID={TestID.endMinutesCounter}
              title="Minutes"
              type={'minutes'}
              initialValue={new Date(event.end).getMinutes()}
              max={59}
              width={25}
              buttonDimension={25}
              onChange={(_, value) => {
                setEndMinutesChange(value);
              }}
            />
          </View>
          <TextField
            wrapperStyle={styles.customInput}
            placeholder={event.description}
            onChangeText={setDescriptionChange}
            errorLabel={''}></TextField>
          <View style={styles.buttonsWrapper}>
            <GeneralButton
              title={'Cancel'}
              isDisabled={false}
              onPress={onCancel}
              width={20}
            />
            <GeneralButton
              title={type === 'create' ? 'Create' : 'Save'}
              isDisabled={false}
              onPress={onCreate}
              width={20}
            />
          </View>
        </View>
        <View style={{height: bottom}} />
        {isLoading && <LoadingIndicator />}
      </ScrollView>
      {error && (
        <View style={styles.errorWrapper}>
          <Text style={{color: 'red', textAlign: 'center'}}>{error}</Text>
          <Button color={'#4794b5'} title="Ok" onPress={onReset} />
        </View>
      )}
    </View>
  );
};

export default EventScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#dadee0',
  },
  container: {
    flex: 1,
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 30,
    color: '#4794b5',
  },
  buttonsWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  timeCounterWrapper: {
    backgroundColor: '#4794b5',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  customInput: {
    borderColor: '#4794b5',
    marginTop: 15,
  },
  timeTitle: {
    fontSize: 10,
    fontWeight: '900',
    textAlign: 'center',
    marginTop: 35,
    color: '#4794b5',
  },
  errorWrapper: {
    textAlign: 'center',
    color: 'red',
    height: 100,
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: windowHeight / 4,
  },
});
