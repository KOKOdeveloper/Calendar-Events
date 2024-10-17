import React from 'react';
import {View} from 'react-native';
import Navigator from '../../navigation';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Root = (): JSX.Element => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}>
      <View
        style={{
          position: 'absolute',
          height: insets.top,
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: '#4794b5',
        }}
      />
      <View
        style={{
          position: 'absolute',
          height: insets.bottom,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#dadee0',
        }}
      />
      <Navigator />
    </View>
  );
};

export default Root;
