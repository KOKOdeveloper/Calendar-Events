import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useAuthentiactionWithEmailPassword} from 'modules/hooks/useAuthentiactionWithEmailPassword';
import {RootStackParamList} from 'navigation';
import {AuthStackParamList} from 'navigation/auth';
import {RoutesAuth, RoutesNavigators} from 'navigation/routes';
import {StyleSheet, View, Text} from 'react-native';
import {useDatabase} from 'databaseContext/useDatabaseContext';

const PendingAuthScreen = (): JSX.Element => {
  const {databaseType, updateDatabaseType} = useDatabase();

  const {isAuth, isAuthAS} = useAuthentiactionWithEmailPassword();

  const rootNavigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  useEffect(() => {
    if (databaseType === 'Firebase') {
      checkAuth();
    } else if (databaseType === 'AsyncStorage') {
      checkAuthAS();
    }
  }, []);

  const checkAuthAS = async () => {
    const result = await isAuthAS();
    if (result) {
      rootNavigation.reset({
        routes: [{name: RoutesNavigators.main}],
      });
    } else {
      navigation.navigate(RoutesAuth.signIn);
    }
  };

  const checkAuth = () => {
    if (isAuth()) {
      rootNavigation.reset({
        routes: [{name: RoutesNavigators.main}],
      });
    } else {
      navigation.navigate(RoutesAuth.signIn);
    }
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}> Events Calendar </Text>
      <Text style={[styles.text, {fontSize: 20}]}> Loading ....... </Text>
    </View>
  );
};

export default PendingAuthScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  text: {
    fontSize: 40,
    fontWeight: '500',
    color: '#4794b5',
  },
});
