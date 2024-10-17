import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import HeaderDate from 'components/HeaderDate';
import MainBaseLayout from 'modules/main/MainBaseLayout';
import TimeSlotList from 'modules/main/TimeSlotList';
import useDailySlotEvents from 'modules/main/hooks/useDailySlotEvents';
import {generateEventTemplate} from 'modules/main/types';
import {MainStackParamList} from 'navigation/main';
import {RoutesMain} from 'navigation/routes';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

const CalendarScreen = ({
  route: {
    params: {refresh},
  },
}: NativeStackScreenProps<
  MainStackParamList,
  RoutesMain.calendar
>): JSX.Element => {
  let currentDate = new Date();
  const {selectDate, slots, date, refreshSlotsAS} = useDailySlotEvents();
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  const onChangeDate = (date: Date) => {
    selectDate(date);
  };

  const onAction = () => {
    navigation.navigate(RoutesMain.event, {
      data: {event: generateEventTemplate(), type: 'create'},
    });
  };

  useEffect(() => {
    if (refresh) {
      refreshSlotsAS();
      navigation.setParams({refresh: false});
    }
  }, [refresh]);

  return (
    <View style={styles.wrapper}>
      <MainBaseLayout
        title={date.toLocaleDateString(undefined, {
          month: 'long',
          year: 'numeric',
          day: '2-digit',
        })}>
        <HeaderDate date={currentDate} onChange={onChangeDate} />
        <TimeSlotList data={slots} />
        <TouchableOpacity style={styles.floatButton} onPress={onAction}>
          <Text style={{color: 'white', fontSize: 25}}>+</Text>
        </TouchableOpacity>
      </MainBaseLayout>
    </View>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  floatButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    position: 'absolute',
    bottom: 50,
    right: 30,
    backgroundColor: '#4794b5',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
