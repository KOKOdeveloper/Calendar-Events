import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Counter from 'components/Counter';
import {useUserManager} from 'modules/contexts/UserManagerContext';
import {MainStackParamList} from 'navigation/main';
import {RoutesMain} from 'navigation/routes';
import React from 'react';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';

export type TNavigationBarProps = {
  hasProfile?: boolean;
  hasBack?: boolean;
  title?: string;
};

const NavigationBar = ({
  hasProfile = true,
  hasBack = false,
  title = '',
}: TNavigationBarProps): JSX.Element => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  const {user} = useUserManager();

  const onProfile = () => {
    navigation.navigate(RoutesMain.profile);
  };
  const onBack = () => {
    navigation.goBack();
  };

  const onChange = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.leftContainer}>
        {hasBack && (
          <TouchableOpacity style={styles.leftRightWrapper} onPress={onBack}>
            <Text style={styles.profileText}>{'<'}</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.middleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.rightContainer}>
        {hasProfile && (
          <TouchableOpacity style={styles.leftRightWrapper} onPress={onProfile}>
            <Text style={styles.profileText}>{user?.username.slice(0, 2).toUpperCase()}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
export default NavigationBar;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#4794b5',
    width: '100%',
    height: 80,
    paddingHorizontal: 5,
  },
  leftContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '15%',
  },
  middleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '70%',
  },
  rightContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '15%',
  },
  leftRightWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  profileText: {
    fontSize: 15,
    fontWeight: '700',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    fontStyle: 'italic',
    color: 'white',
  },
});
