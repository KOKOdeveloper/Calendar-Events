import React, {useMemo, useState} from 'react';
import GeneralButton from 'components/GeneralButton';
import {StyleSheet, View, Text, Button} from 'react-native';
import {useAuthentiactionWithEmailPassword} from 'modules/hooks/useAuthentiactionWithEmailPassword';
import {RootStackParamList} from 'navigation';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RoutesNavigators} from 'navigation/routes';
import MainBaseLayout from 'modules/main/MainBaseLayout';
import TextField from 'components/CustomTextInput/TextField';
import {ScrollView} from 'react-native-gesture-handler';
import {useUserManager} from 'modules/contexts/UserManagerContext';
import {FormikHelpers, useFormik} from 'formik';
import * as yup from 'yup';
import LoadingIndicator from 'components/ActivityIndicator';
import {useDatabase} from 'databaseContext/useDatabaseContext';
import {removeItem} from 'utils/storage';
import {windowHeight} from 'utils/dimensions/dimension';

const updateUserSchema = () =>
  yup.object().shape({
    username: yup
      .string()
      .required('User name is mandatory')
      .min(2, 'First name too short'),
  });

export type TUpdateUsernameFormType = {
  username: string;
};

const ProfileScreen = (): JSX.Element => {
  const rootNavigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {logOutUser} = useAuthentiactionWithEmailPassword();
  const {user, updateUserName, updateUserNameAS} = useUserManager();
  const {databaseType} = useDatabase();
  const [success, setSuccess] = useState<string | null>(null);

  const username: string = useMemo(() => {
    return user?.username ?? '';
  }, [user]);

  const handleLogOut = async () => {
    if (databaseType === 'Firebase') {
      try {
        await logOutUser();
        rootNavigation.reset({
          routes: [{name: RoutesNavigators.auth}],
        });
      } catch (error) {
        console.log('Error logout', error);
      }
    } else {
      await removeItem('login');
      rootNavigation.reset({
        routes: [{name: RoutesNavigators.auth}],
      });
    }
  };

  const handleSubmit = async (
    values: TUpdateUsernameFormType,
    {resetForm}: FormikHelpers<TUpdateUsernameFormType>,
  ) => {
    if (databaseType === 'Firebase') {
      setIsLoading(true);
      try {
        await updateUserName(values.username);
        setIsLoading(false);
        setSuccess('Successfully updated profile');
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    } else {
      setIsLoading(true);
      try {
        await updateUserNameAS(values.username);
        setIsLoading(false);
        setSuccess('Successfully updated profile');
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    }
  };

  const formik = useFormik({
    initialValues: {username: username},
    validationSchema: updateUserSchema,
    onSubmit: handleSubmit,
  });

  const onReset = () => {
    setSuccess(null);
  };

  return (
    <View style={styles.wrapper}>
      <MainBaseLayout hasBack={true} hasProfile={false} title={'Profile'}>
        <ScrollView style={styles.container}>
          <Text style={styles.title}>Username</Text>
          <TextField
            wrapperStyle={styles.customInput}
            placeholder={'Username'}
            value={formik.values.username}
            onChangeText={formik.handleChange('username')}
            errorLabel={
              formik.touched.username && formik.errors.username
                ? formik.errors.username
                : null
            }></TextField>
          <Text style={styles.title}>Email</Text>
          <TextField
            wrapperStyle={styles.customInput}
            placeholder="email"
            editable={false}
            value={user?.email}
            errorLabel={''}></TextField>
          <GeneralButton
            title={'Update user'}
            isDisabled={!formik.isValid}
            onPress={formik.submitForm}></GeneralButton>
          <GeneralButton
            title="LogOut"
            isDisabled={false}
            onPress={handleLogOut}
          />
        </ScrollView>
        {isLoading && <LoadingIndicator />}
      </MainBaseLayout>
      {success && (
        <View style={styles.successWrapper}>
          <Text style={{color: '#4794b5', textAlign: 'center'}}>{success}</Text>
          <Button color={'#4794b5'} title="Ok" onPress={onReset} />
        </View>
      )}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#dadee0',
    justifyContent: 'space-around',
  },
  container: {
    marginHorizontal: 15,
  },
  customInput: {
    borderColor: '#4794b5',
  },
  title: {
    marginTop: 30,
  },
  successWrapper: {
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
