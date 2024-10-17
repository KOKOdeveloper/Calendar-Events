import {useState} from 'react';
import {CalendarEvent, EventAction, generateID} from '../types';
import database from '@react-native-firebase/database';
import {useUserManager} from 'modules/contexts/UserManagerContext';
import {getObjectValue, setObjectValue} from 'utils/storage';
import {useDatabase} from 'databaseContext/useDatabaseContext';

const useEventHandler = (event: CalendarEvent, type: EventAction) => {
  const {databaseType} = useDatabase();
  const {user} = useUserManager();
  const [error, setError] = useState<string>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [dayMonthYear, setDateMonthYear] = useState<Date>(
    new Date(event.start),
  );
  const [hoursStart, setHoursStart] = useState<number>(
    new Date(event.start).getHours(),
  );
  const [minutesStart, setMinutesStart] = useState<number>(
    new Date(event.start).getMinutes(),
  );
  const [hoursEnd, setHoursEnd] = useState<number>(
    new Date(event.end).getHours(),
  );
  const [minutesEnd, setMinutesEnd] = useState<number>(
    new Date(event.end).getMinutes(),
  );
  const [description, setDescription] = useState<string>(event.description);

  const setDate = (date: Date) => {
    setDateMonthYear(date);
  };

  const setStartHoursChange = (value: number) => {
    setHoursStart(value);
  };

  const setStartMinutesChange = (value: number) => {
    setMinutesStart(value);
  };

  const setEndHoursChange = (value: number) => {
    setHoursEnd(value);
  };

  const setEndMinutesChange = (value: number) => {
    setMinutesEnd(value);
  };

  const setDescriptionChange = (value: string) => {
    setDescription(value);
  };

  const reset = () => {
    setError(undefined);
  };

  const createEvent = async () => {
    const start = new Date(dayMonthYear);
    start.setHours(hoursStart);
    start.setMinutes(minutesStart);

    const end = new Date(dayMonthYear);
    end.setHours(hoursEnd);
    end.setMinutes(minutesEnd);

    if (end < start) {
      setError('Incorrect format for event, plaese check your dates.');
    } else if (start < new Date()) {
      setError(
        'Time slot for event that you trying to create is already passed!',
      );
    } else {
      const newEvent: CalendarEvent = {
        id: type === 'create' ? generateID() : event.id,
        description: description,
        start: start.getTime(),
        end: end.getTime(),
      };

      if (databaseType === 'Firebase') {
        setLoading(true);
        try {
          await sendEvent(newEvent);
          setLoading(false);
          setIsSuccess(true);
        } catch (error) {
          setLoading(false);
          setError('Something happen, please try again later');
        }
      } else {
        if (type === 'create') {
          setLoading(true);
          try {
            await sendEventAS(newEvent);
            setLoading(false);
            setIsSuccess(true);
          } catch (error) {
            setLoading(false);
            setError('Something happen, please try again later');
          }
        } else {
          setLoading(true);
          try {
            await updateEventAS(newEvent);
            setLoading(false);
            setIsSuccess(true);
          } catch (error) {
            setLoading(false);
            setError('Something happen, please try again later');
          }
        }
      }
    }
  };

  const sendEvent = (event: CalendarEvent): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      if (user?.userId) {
        const reference = '/events/' + user.userId + '/' + event.id;
        database()
          .ref(reference)
          .set(event)
          .then(value => {
            resolve(true);
          })
          .catch(error => {
            reject(error);
          });
      }
    });
  };

  const sendEventAS = (event: CalendarEvent): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
      if (user?.userId) {
        const key = user.userId;
        const tempEvents = (await getObjectValue(key)) as Array<CalendarEvent>;
        if (tempEvents !== null) {
          tempEvents.push(event);
          const result = await setObjectValue(key, tempEvents);
          if (result) {
            resolve(true);
          } else {
            reject('Error writing events in AS');
          }
        } else {
          const newArray = Array<CalendarEvent>();
          newArray.push(event);
          const result = await setObjectValue(key, newArray);
          if (result) {
            resolve(true);
          } else {
            reject('Error writing events in AS');
          }
        }
      }
    });
  };

  const updateEventAS = (event: CalendarEvent): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
      if (user?.userId) {
        const key = user.userId;
        const tempEvents = (await getObjectValue(key)) as Array<CalendarEvent>;
        if (tempEvents !== null) {
          const reducedEvents = tempEvents.filter(item => item.id !== event.id);
          reducedEvents.push(event);
          const result = await setObjectValue(key, reducedEvents);
          if (result) {
            resolve(true);
          } else {
            reject('Error writing events in AS');
          }
        } else {
          reject('We do not have events at all');
        }
      }
    });
  };

  return {
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
    sendEventAS,
  };
};

export default useEventHandler;

// {
//     "rules": {
//       ".read": "now < 1731452400000",  // 2024-11-13
//       ".write": "now < 1731452400000",  // 2024-11-13
//     }
//   }
