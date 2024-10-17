import React, {useEffect, useMemo, useState} from 'react';
import {TSignInFormType} from 'modules/auth/signInForm';
import {StyleSheet, View, Text, Button} from 'react-native';
import SignInForm from 'modules/auth/signInForm';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from 'navigation/auth';
import {RoutesAuth, RoutesNavigators} from 'navigation/routes';
import {useAuthentiactionWithEmailPassword} from 'modules/hooks/useAuthentiactionWithEmailPassword';
import {RootStackParamList} from 'navigation';
import {
  getLastUserObjectValue,
  getLastUserObjectValueAS,
  setStringValue,
} from 'utils/storage';
import GeneralButton from 'components/GeneralButton';
import {ScrollView} from 'react-native-gesture-handler';
import useAuthenticationBiometrics from 'modules/hooks/useAuthenticationBiometrics';
import {windowHeight, windowWidth} from 'utils/dimensions/dimension';
import LoadingIndicator from 'components/ActivityIndicator';
import useKeyboardInset from 'utils/useKeyboardInset';
import {useDatabase} from 'databaseContext/useDatabaseContext';

type LastUser = {
  id: string;
  email: string;
  password: string;
};

const SignInScreen = (): JSX.Element => {
  const {bottom} = useKeyboardInset();
  const {databaseType, updateDatabaseType} = useDatabase();
  const {loginUser, isLoading, loginUserAS} =
    useAuthentiactionWithEmailPassword();
  const [error, setError] = useState<string | null>(null);
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const rootNavigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [lastUser, setLastUser] = useState<LastUser | null>(null);
  const {biometricType, loginUserWithBiometrics, loginUserWithBiometricsAS} =
    useAuthenticationBiometrics();

  useEffect(() => {
    const getLastUser = async () => {
      if (databaseType === 'Firebase') {
        const lastUser = (await getLastUserObjectValue()) as LastUser;
        if (lastUser !== null) {
          setLastUser(lastUser);
        } else {
          setLastUser(null);
        }
      } else {
        const lastUser = (await getLastUserObjectValueAS()) as LastUser;
        if (lastUser !== null) {
          setLastUser(lastUser);
        } else {
          setLastUser(null);
        }
      }
    };
    getLastUser();
  }, [databaseType]);

  const handleSubmit = async (data: TSignInFormType) => {
    try {
      if (databaseType === 'Firebase') {
        await loginUser(data);
        rootNavigation.reset({
          routes: [{name: RoutesNavigators.main}],
        });
      } else {
        const result = await loginUserAS(data);
        if (result) {
          setStringValue('login', data.email);
          rootNavigation.reset({
            routes: [{name: RoutesNavigators.main}],
          });
        }
      }
    } catch (error) {
      console.log('Error', error);
      if (typeof error === 'string') {
        setError(error);
      }
    }
  };

  const handleBiometrics = async () => {
    if (lastUser) {
      if (databaseType === 'Firebase') {
        try {
          await loginUserWithBiometrics({
            email: lastUser.email,
            password: lastUser.password,
          });
          rootNavigation.reset({
            routes: [{name: RoutesNavigators.main}],
          });
        } catch (error) {
          console.log('Error log in with biometrics', error);
        }
      } else {
        try {
          await loginUserWithBiometricsAS({
            email: lastUser.email,
            password: lastUser.password,
          });
          setStringValue('login', lastUser.email);
          rootNavigation.reset({
            routes: [{name: RoutesNavigators.main}],
          });
        } catch (error) {
          console.log('Error log in with biometrics', error);
        }
      }
    }
  };

  const handleCreateAccount = () => {
    navigation.navigate(RoutesAuth.signUp);
  };

  const onReset = () => {
    setError(null);
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView>
        <View style={styles.headerWrapper}>
          <View style={styles.optionsWrapper}>
            <GeneralButton
              title={`Firebase`}
              isDisabled={databaseType !== 'Firebase'}
              width={27}
              onPress={() => {
                updateDatabaseType('Firebase');
              }}></GeneralButton>
            <GeneralButton
              title={`AsyncStorage`}
              isDisabled={databaseType !== 'AsyncStorage'}
              width={27}
              onPress={() => {
                updateDatabaseType('AsyncStorage');
              }}></GeneralButton>
          </View>
          <Text style={styles.headerTitle}>
            Enter your email and password to login. If you don't have account
            press on create account button
          </Text>
        </View>
        <SignInForm onSubmit={handleSubmit} onSignUp={handleCreateAccount} />
        {lastUser && biometricType && (
          <View style={styles.biometricsWrapper}>
            <GeneralButton
              title={`Use ${biometricType} to log in as ${lastUser.email}`}
              isDisabled={false}
              onPress={handleBiometrics}></GeneralButton>
          </View>
        )}
        {isLoading && <LoadingIndicator />}
        <View style={{height: bottom}} />
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

export default SignInScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: '#dadee0',
  },

  headerWrapper: {
    marginTop: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '300',
    textAlign: 'center',
    marginHorizontal: 10,
  },
  biometricsWrapper: {
    marginHorizontal: 10,
  },
  loading: {
    backgroundColor: 'rgba(72, 72, 72, 0.5)',
    width: windowWidth,
    height: windowHeight,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  optionsWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
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
