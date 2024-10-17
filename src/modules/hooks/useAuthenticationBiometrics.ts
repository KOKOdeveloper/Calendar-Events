import ReactNativeBiometrics, {
  BiometryType,
  BiometryTypes,
} from 'react-native-biometrics';
import {TSignInFormType} from 'modules/auth/signInForm';
import auth from '@react-native-firebase/auth';
import {useEffect, useState} from 'react';
import {useAuthentiactionWithEmailPassword} from './useAuthentiactionWithEmailPassword';

const useAuthenticationBiometrics = () => {
  const [biometricType, setBiometricType] = useState<BiometryType>();
  const {isLoading, loginUser, loginUserAS} =
    useAuthentiactionWithEmailPassword();

  const rnBiometrics = new ReactNativeBiometrics();

  const checkBiometrics = async () => {
    const {biometryType} = await rnBiometrics.isSensorAvailable();
    setBiometricType(biometryType);
  };

  useEffect(() => {
    checkBiometrics();
  }, []);

  const loginUserWithBiometrics = async (
    data: TSignInFormType,
  ): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
      try {
        const {success, error} = await rnBiometrics.simplePrompt({
          promptMessage: 'Authenticate to continue',
        });
        if (success) {
          const result = await loginUser(data);
          resolve(result);
        } else {
          reject(error);
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  const loginUserWithBiometricsAS = async (
    data: TSignInFormType,
  ): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
      try {
        const {success, error} = await rnBiometrics.simplePrompt({
          promptMessage: 'Authenticate to continue',
        });
        if (success) {
          const result = await loginUserAS(data);
          resolve(result);
        } else {
          reject(error);
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  return {
    isLoading,
    biometricType,
    loginUserWithBiometrics,
    loginUserWithBiometricsAS,
  };
};

export default useAuthenticationBiometrics;
