import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RoutesMain} from './routes';
import CalendarScreen from 'screens/main/Calendar';
import ProfileScreen from 'screens/main/Profile';
import {UserManagerContextProvider} from 'modules/contexts/UserManagerContext';
import EventScreen from 'screens/main/Event';
import {CalendarEvent, EventAction} from 'modules/main/types';

export type MainStackParamList = {
  [RoutesMain.calendar]: {refresh: boolean};
  [RoutesMain.profile]: undefined;
  [RoutesMain.event]: {data: {event: CalendarEvent; type: EventAction}};
};

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainNavigator = (): JSX.Element => {
  return (
    <UserManagerContextProvider>
      <Stack.Navigator
        initialRouteName={RoutesMain.calendar}
        screenOptions={{headerShown: false}}>
        <Stack.Group>
          <Stack.Screen
            name={RoutesMain.calendar}
            component={CalendarScreen}
            initialParams={{refresh: false}}></Stack.Screen>
          <Stack.Screen
            name={RoutesMain.profile}
            component={ProfileScreen}></Stack.Screen>
        </Stack.Group>
        <Stack.Group screenOptions={{presentation: 'modal'}}>
          <Stack.Screen
            name={RoutesMain.event}
            component={EventScreen}></Stack.Screen>
        </Stack.Group>
      </Stack.Navigator>
    </UserManagerContextProvider>
  );
};

export default MainNavigator;
