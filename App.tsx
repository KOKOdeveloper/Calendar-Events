/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useContext} from 'react';
import Root from '@screens/root';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {DatabaseContextProvider} from 'databaseContext/useDatabaseContext';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <DatabaseContextProvider>
          <Root />
        </DatabaseContextProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default App;
