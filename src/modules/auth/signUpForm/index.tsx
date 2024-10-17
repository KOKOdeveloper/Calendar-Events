import TextField from 'components/CustomTextInput/TextField';
import {FormikHelpers, useFormik} from 'formik';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import registrationSchema from './schema';
import GeneralButton from 'components/GeneralButton';

export type TRegistrationFormProps = {
  onSubmit: (data: TRegistrationFormType) => void;
};
export type TRegistrationFormType = {
  firstName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const initialValues: TRegistrationFormType = {
  firstName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = (props: TRegistrationFormProps): JSX.Element => {
  const handleSubmit = (
    values: TRegistrationFormType,
    {resetForm}: FormikHelpers<TRegistrationFormType>,
  ) => {
    props.onSubmit(values);
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: registrationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <View style={styles.wrapper}>
      <ScrollView>
        <View style={styles.container}>
          <TextField
            wrapperStyle={styles.customInput}
            placeholder="First name"
            onChangeText={formik.handleChange('firstName')}
            value={formik.values.firstName}
            errorLabel={
              formik.touched.firstName && formik.errors.firstName
                ? formik.errors.firstName
                : null
            }></TextField>
          <View style={styles.divider} />
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
          <TextField
            wrapperStyle={styles.customInput}
            placeholder="Confirm password"
            secureTextEntry={true}
            onChangeText={formik.handleChange('confirmPassword')}
            value={formik.values.confirmPassword}
            errorLabel={
              formik.touched.confirmPassword && formik.errors.confirmPassword
                ? formik.errors.confirmPassword
                : null
            }></TextField>
          <GeneralButton
            title={'Sign up'}
            isDisabled={!formik.isValid}
            onPress={formik.submitForm}></GeneralButton>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignUpForm;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    marginTop: 50,
    marginHorizontal: 10,
    alignItems: 'center',
    paddingBottom: 50,
  },
  divider: {
    height: 20,
    width: '100%',
  },
  customInput: {
    borderColor: '#4794b5',
  },
  submit: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4794b5',
    width: 150,
    height: 50,
    borderRadius: 25,
    marginTop: 50,
  },
});
