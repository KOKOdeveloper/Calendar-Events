import NavigationBar from 'components/NavigationBar';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TNavigationBarProps} from 'components/NavigationBar';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface IMainBaseLayoutProps extends TNavigationBarProps {
  children?: React.ReactNode;
}

const MainBaseLayout = ({
  children,
  hasBack,
  hasProfile,
  title,
}: IMainBaseLayoutProps): JSX.Element => {
  return (
    <View style={styles.wrapper}>
      <NavigationBar hasBack={hasBack} hasProfile={hasProfile} title={title} />
      {children}
    </View>
  );
};

export default MainBaseLayout;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});
