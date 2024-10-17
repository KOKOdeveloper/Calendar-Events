import React, {useState, useEffect} from 'react';
import {CalendarEvent, TimeSlot} from '../types';
import {getTimeSlotIndex, isSameDay} from 'utils/dateAndHelpers';
import useEventsProvider from './useEventsProvider';

const useDailySlotEvents = () => {
  const {events, refreshEventsAS} = useEventsProvider();
  const [slots, setSlots] = useState<Array<TimeSlot>>([]);
  const [date, setDate] = useState<Date>(new Date());

  const tamplatesSlots: {[key: string]: TimeSlot} = {};

  const selectDate = (date: Date) => {
    setDate(date);
  };

  useEffect(() => {
    setupSlotsTamplates();
    configureSlotsAndEvents();
  }, [date, events]);

  const setupSlotsTamplates = () => {
    const temp = Array<TimeSlot>();

    for (let i = 1; i < 25; i++) {
      let timeDescription = i < 10 ? `0${i} : 00` : `${i} : 00`;
      if (i === 24) {
        timeDescription = '00 : 00';
      }
      const start = new Date(date);
      start.setHours(i - 1);
      start.setMinutes(0);
      start.setSeconds(0);
      const end = new Date(date);
      end.setHours(i - 1);
      end.setMinutes(59);
      end.setSeconds(59);
      const tempSlot: TimeSlot = {
        id: [i, timeDescription],
        startSlot: start,
        endSlot: end,
        events: [],
      };

      tamplatesSlots[`${i}`] = tempSlot;
    }
  };

  const configureSlotsAndEvents = () => {
    events.forEach(event => {
      const isEventForSelectedDay = isSameDay(new Date(event.start), date);
      if (isEventForSelectedDay) {
        const index = getTimeSlotIndex(new Date(event.start));
        tamplatesSlots[index].events.push(event);
      }
    });
    const tempSlots = Array<TimeSlot>();
    Object.entries(tamplatesSlots).forEach(([key, value]) => {
      tempSlots.push(value);
    });
    tempSlots.sort((a, b) => a.id[0] - b.id[0]);
    setSlots(tempSlots);
  };

  const refreshSlotsAS = () => {
    refreshEventsAS();
  };

  return {
    selectDate,
    slots,
    date,
    refreshSlotsAS,
  };
};

export default useDailySlotEvents;
