import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RoutesNavigators} from './routes';
import AuthNavigator from './auth';
import MainNavigator from './main';

export type RootStackParamList = {
  [RoutesNavigators.auth]: undefined;
  [RoutesNavigators.main]: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigator = (): JSX.Element => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={RoutesNavigators.auth}
        screenOptions={{headerShown: false}}>
        <Stack.Screen
          name={RoutesNavigators.auth}
          component={AuthNavigator}></Stack.Screen>
        <Stack.Screen
          name={RoutesNavigators.main}
          component={MainNavigator}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
