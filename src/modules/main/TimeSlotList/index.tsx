import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {FlashList, ListRenderItem} from '@shopify/flash-list';
import {
  CalendarEvent,
  generateEventTemplate,
  TimeSlot,
} from 'modules/main/types';
import {MainStackParamList} from 'navigation/main';
import {RoutesMain} from 'navigation/routes';
import React, {useMemo} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Button} from 'react-native';
import {getRandomEventColor} from 'utils/colors';
import {getDifferenceInMinutesPercentTopOffset} from 'utils/dateAndHelpers';
import {windowHeight, windowWidth} from 'utils/dimensions/dimension';

export type TTimeSlotListProps = {
  data: Array<TimeSlot>;
};

const TimeSlotList = ({data}: TTimeSlotListProps): JSX.Element => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  const onSlotPress = () => {
    navigation.navigate(RoutesMain.event, {
      data: {event: generateEventTemplate(), type: 'create'},
    });
  };
  const onEventPress = (event: CalendarEvent) => {
    navigation.navigate(RoutesMain.event, {data: {event: event, type: 'edit'}});
  };
  const renderItem: ListRenderItem<TimeSlot> = useMemo(
    () => info => {
      return (
        <TouchableOpacity style={styles.slotWrapper} onPress={onSlotPress}>
          <View style={styles.slotTimeWrapper}>
            <Text style={styles.time}>{info.item.id[1]}</Text>
          </View>
          <View style={styles.bottomLine}></View>
          <View style={styles.eventWrapper}>
            {info.item.events.map(event => {
              return (
                <TouchableOpacity
                  key={event.id}
                  style={[
                    styles.eventStyle,
                    {
                      backgroundColor: getRandomEventColor(),
                      left:
                        Math.floor(
                          Math.random() * (windowWidth - 100 - 30 + 1),
                        ) + 30,
                      top:
                        windowHeight *
                        0.1 *
                        getDifferenceInMinutesPercentTopOffset(
                          info.item.startSlot,
                          new Date(event.start),
                        ),
                    },
                  ]}
                  onPress={() => {
                    onEventPress(event);
                  }}>
                  <Text style={styles.eventDescription} numberOfLines={1}>
                    {event.description}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </TouchableOpacity>
      );
    },
    [data],
  );

  return (
    <View style={styles.wrapper}>
      <FlashList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        estimatedItemSize={windowHeight * 0.1}></FlashList>
    </View>
  );
};

export default TimeSlotList;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#dadee0',
  },

  slotWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: windowHeight * 0.1,
  },
  bottomLine: {
    backgroundColor: '#4794b5',
    width: '100%',
    height: 1,
  },
  slotTimeWrapper: {
    width: '100%',
    position: 'relative',
  },
  time: {
    fontSize: 10,
    marginLeft: 10,
  },
  eventWrapper: {
    flex: 1,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    pointerEvents: 'box-none',
  },
  eventStyle: {
    maxWidth: '60%',
    height: 20,
    borderRadius: 5,
    justifyContent: 'center',
    paddingHorizontal: 5,
    position: 'absolute',
  },
  eventDescription: {
    fontSize: 12,
    fontWeight: '500',
    color: 'white',
  },
});
