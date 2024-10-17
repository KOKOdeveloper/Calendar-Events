import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {windowHeight, windowWidth} from 'utils/dimensions/dimension';

const LoadingIndicator = (): JSX.Element => {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size={'large'} color={'#4794b5'} />
    </View>
  );
};

export default LoadingIndicator;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'space-around',
  },
  loading: {
    backgroundColor: 'rgba(72, 72, 72, 0.5)',
    width: windowWidth,
    height: windowHeight,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
});
