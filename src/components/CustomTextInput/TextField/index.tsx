import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import TextFieldLayout, {TTextFieldLayoutProps} from '../TextFieldLayout.tsx/index.tsx';

export type TTextFieldProps = React.ComponentProps<typeof TextInput> &
  TTextFieldLayoutProps;

const TextField = ({
  errorLabel,
  wrapperStyle,
  style,
  placeholder,
  ...props
}: TTextFieldProps): JSX.Element => {
  const inputStyle = StyleSheet.flatten([styles.input, style]);
  return (
    <TextFieldLayout errorLabel={errorLabel} wrapperStyle={wrapperStyle}>
      <TextInput
        {...props}
        style={inputStyle}
        placeholder={placeholder}></TextInput>
    </TextFieldLayout>
  );
};

export default TextField;

const styles = StyleSheet.create({
  input: {
    height: '100%',
    width: '100%',
    marginLeft: 15,
  },
});
