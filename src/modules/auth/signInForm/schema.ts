import * as yup from 'yup';

const signInSchema = () =>
  yup.object().shape({
    email: yup
      .string()
      .email('Invalid email address')
      .required('Email is mandatory'),
    password: yup
      .string()
      .required('Password is mandatory')
      .min(8, 'Password is too short'),
  });

export default signInSchema;
