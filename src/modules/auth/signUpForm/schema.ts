import * as yup from 'yup';

const registrationSchema = () =>
  yup.object().shape({
    firstName: yup.string().required('First name is mandatory').min(2, 'First name too short'),
    email: yup
      .string()
      .email('Invalid email address')
      .required('Email is mandatory'),
    password: yup
      .string()
      .required('Password is mandatory')
      .min(8, 'Password is too short'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), undefined], 'Passwords must match')
      .required('Confirm your password'),
  });

export default registrationSchema;
