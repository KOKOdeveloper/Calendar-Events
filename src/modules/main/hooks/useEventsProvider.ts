import {useEffect, useState} from 'react';
import {CalendarEvent} from '../types';
import database from '@react-native-firebase/database';
import {useUserManager} from 'modules/contexts/UserManagerContext';
import {useDatabase} from 'databaseContext/useDatabaseContext';
import {getObjectValue} from 'utils/storage';

const useEventsProvider = () => {
  const {databaseType} = useDatabase();
  const {user} = useUserManager();
  const [events, setEvents] = useState<Array<CalendarEvent>>([]);

  useEffect(() => {
    if (databaseType === 'Firebase') {
      const reference = '/events/' + user?.userId;
      const onValueChange = database()
        .ref(reference)
        .on('value', snapshot => {
          const data = snapshot.val();
          if (data) {
            setupEvents(data);
          }
        });

      // Stop listening for updates when no longer required
      return () => database().ref(reference).off('value', onValueChange);
    }
  }, [user]);

  useEffect(() => {
    configureEventsForAS();
  }, [user]);

  const configureEventsForAS = async () => {
    if (databaseType === 'AsyncStorage') {
      if (user?.userId) {
        const tempEvents = (await getObjectValue(
          user.userId,
        )) as Array<CalendarEvent>;
        if (tempEvents !== null) {
          setEvents(tempEvents);
        }
      }
    }
  };

  const setupEvents = (data: any) => {
    const eventsArray = Object.values(data) as Array<CalendarEvent>;
    if (eventsArray !== null) {
      setEvents(eventsArray);
    }
  };

  const refreshEventsAS = () => {
    configureEventsForAS();
  };

  return {
    events,
    refreshEventsAS,
  };
};

export default useEventsProvider;
