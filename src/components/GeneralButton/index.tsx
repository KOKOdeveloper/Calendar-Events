import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

export type TGeneralButtonProps = {
  title: string;
  isDisabled: boolean;
  onPress: () => void;
  width?: number
};

const GeneralButton = ({
  title,
  isDisabled,
  onPress,
  width = 100
}: TGeneralButtonProps): JSX.Element => {
  return (
    <TouchableOpacity
      style={[
        styles.wrapper,
        {backgroundColor: isDisabled ? 'grey' : '#4794b5', width: `${width}%`},
      ]}
      onPress={onPress}>
      <Text numberOfLines={1} style={{color: 'white', textAlign: 'center'}}>{title}</Text>
    </TouchableOpacity>
  );
};
export default GeneralButton;

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4794b5',
    height: 50,
    borderRadius: 25,
    marginTop: 15,
    marginBottom: 10
  },
});
