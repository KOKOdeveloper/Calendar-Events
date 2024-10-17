import React, {useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StyleSheet, View, Text, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useAuthentiactionWithEmailPassword} from 'modules/hooks/useAuthentiactionWithEmailPassword';
import SignUpForm, {TRegistrationFormType} from 'modules/auth/signUpForm';
import {RootStackParamList} from 'navigation';
import {RoutesNavigators} from 'navigation/routes';
import LoadingIndicator from 'components/ActivityIndicator';
import useKeyboardInset from 'utils/useKeyboardInset';
import {useDatabase} from 'databaseContext/useDatabaseContext';
import {setStringValue} from 'utils/storage';
import {windowHeight} from 'utils/dimensions/dimension';

const SignUpScreen = (): JSX.Element => {
  const {bottom} = useKeyboardInset();
  const {databaseType} = useDatabase();
  const [error, setError] = useState<string | null>(null);
  const rootNavigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {createUser, isLoading, createUserAS} =
    useAuthentiactionWithEmailPassword();

  const onReset = () => {
    setError(null);
  };

  const handleSubmit = async (data: TRegistrationFormType) => {
    try {
      if (databaseType === 'Firebase') {
        await createUser(data);
        rootNavigation.reset({
          routes: [{name: RoutesNavigators.main}],
        });
      } else {
        const result = await createUserAS(data);
        if (result) {
          setStringValue('login', data.email);
          rootNavigation.reset({
            routes: [{name: RoutesNavigators.main}],
          });
        } else {
          console.log('Error create user with AS');
        }
      }
    } catch (error) {
      if (typeof error === 'string') {
        setError(error);
      }
      console.log('Error', error);
    }
  };
  return (
    <View style={styles.wrapper}>
      <View style={styles.headerWrapper}>
        <Text style={styles.headerTitle}>
          Please fill the form and press sign up button
        </Text>
      </View>
      <SignUpForm onSubmit={handleSubmit} />
      <View style={{height: bottom}} />
      {isLoading && <LoadingIndicator />}
      {error && (
        <View style={styles.errorWrapper}>
          <Text style={{color: 'red', textAlign: 'center'}}>{error}</Text>
          <Button color={'#4794b5'} title="Ok" onPress={onReset} />
        </View>
      )}
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#dadee0',
  },

  headerWrapper: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '300',
    textAlign: 'center',
  },
  loading: {
    backgroundColor: 'rgba(72, 72, 72, 0.5)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
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
