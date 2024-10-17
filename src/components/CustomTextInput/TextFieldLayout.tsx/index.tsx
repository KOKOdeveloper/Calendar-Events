import React from 'react';
import {Text, View, StyleSheet, StyleProp, ViewStyle} from 'react-native';

export type TTextFieldLayoutProps = {
  errorLabel: string | null;
  children?: React.ReactNode;
  wrapperStyle?: StyleProp<ViewStyle>
};

const TextFieldLayout = ({
  errorLabel,
  wrapperStyle,
  children,
}: TTextFieldLayoutProps): JSX.Element => {

    const inputStyle = StyleSheet.flatten([styles.inputWrapper, wrapperStyle]);
  return (
    <View style={styles.wrapper}>
      <View style={inputStyle}>{children}</View>
      {errorLabel && (
        <View style={styles.errorWrapper}>
          <Text style={styles.errorLabel}>{errorLabel}</Text>
        </View>
      )}
    </View>
  );
};

export default TextFieldLayout;

const styles = StyleSheet.create({
  wrapper: {
    height: 55,
    width: '100%',
  },

  inputWrapper: {
    height: 45,
    width: '100%',
    borderWidth: 1,
  },
  errorWrapper: {
    height: 20,
    width: '90%',
    marginLeft: 15,
    justifyContent: 'center',
  },
  errorLabel: {
    color: 'red',
    fontSize: 10,
  },
});
