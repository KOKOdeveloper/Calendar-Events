import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RoutesAuth} from './routes';
import PendingAuthScreen from 'screens/auth/PendingAuth';
import SignInScreen from 'screens/auth/SignIn';
import SignUpScreen from 'screens/auth/SignUp';

export type AuthStackParamList = {
  [RoutesAuth.pending]: undefined;
  [RoutesAuth.signIn]: undefined;
  [RoutesAuth.signUp]: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = (): JSX.Element => {
  return (
    <Stack.Navigator initialRouteName={RoutesAuth.pending}>
      <Stack.Screen
        name={RoutesAuth.pending}
        component={PendingAuthScreen} options={{headerShown: false}}></Stack.Screen>
      <Stack.Screen
        name={RoutesAuth.signIn}
        component={SignInScreen}
        options={{
          headerBackVisible: false,
          title: 'Log in',
        }}></Stack.Screen>
      <Stack.Screen
        name={RoutesAuth.signUp}
        component={SignUpScreen}
        options={{
          title: 'Create account',
        }}></Stack.Screen>
    </Stack.Navigator>
  );
};

export default AuthNavigator;
