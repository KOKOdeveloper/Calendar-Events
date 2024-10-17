import TextField from 'components/CustomTextInput/TextField';
import {FormikHelpers, useFormik} from 'formik';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import signInSchema from './schema';
import GeneralButton from 'components/GeneralButton';

export type TRegistrationFormProps = {
  onSubmit: (data: TSignInFormType) => void;
  onSignUp: () => void;
};
export type TSignInFormType = {
  email: string;
  password: string;
};

const initialValues: TSignInFormType = {
  email: '',
  password: '',
};

const SignInForm = (props: TRegistrationFormProps): JSX.Element => {
  const handleSubmit = (
    values: TSignInFormType,
    {resetForm}: FormikHelpers<TSignInFormType>,
  ) => {
    props.onSubmit(values);
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: signInSchema,
    onSubmit: handleSubmit,
  });

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <TextField
          wrapperStyle={styles.customInput}
          placeholder="Email"
          onChangeText={formik.handleChange('email')}
          value={formik.values.email}
          errorLabel={
            formik.touched.email && formik.errors.email
              ? formik.errors.email
              : null
          }></TextField>
        <View style={styles.divider} />
        <TextField
          wrapperStyle={styles.customInput}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={formik.handleChange('password')}
          value={formik.values.password}
          errorLabel={
            formik.touched.password && formik.errors.password
              ? formik.errors.password
              : null
          }></TextField>
        <View style={styles.divider} />
        <GeneralButton
          title={'Sign in'}
          isDisabled={!formik.isValid}
          onPress={formik.submitForm}></GeneralButton>
        <GeneralButton
          title={'Create account'}
          onPress={props.onSignUp}
          isDisabled={false}></GeneralButton>
      </View>
    </View>
  );
};

export default SignInForm;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    marginTop: 50,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  divider: {
    height: 20,
    width: '100%',
  },
  customInput: {
    borderColor: '#4794b5',
  },
});
