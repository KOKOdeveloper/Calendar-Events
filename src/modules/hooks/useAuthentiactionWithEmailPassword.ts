import {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {TRegistrationFormType} from 'modules/auth/signUpForm';
import {TSignInFormType} from 'modules/auth/signInForm';
import {
  getObjectValue,
  getStringValue,
  setLastUserObjectValue,
  setLastUserObjectValueAS,
  setObjectValue,
} from 'utils/storage';
import {UserAsyncStorage} from 'modules/contexts/types';
import {generateID} from 'modules/main/types';

type TCreateUserEmailPassword = Pick<
  TRegistrationFormType,
  'email' | 'password'
>;

export const useAuthentiactionWithEmailPassword = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isAuth = (): boolean => {
    return auth().currentUser !== null;
  };

  const isAuthAS = async () => {
    const isLogin = await getStringValue('login');
    if (isLogin) {
      return true;
    } else {
      return false;
    }
  };

  const createUser = (data: TRegistrationFormType): Promise<boolean> => {
    setIsLoading(true);
    const createData: TCreateUserEmailPassword = {
      email: data.email,
      password: data.password,
    };
    return new Promise((resolve, reject) => {
      auth()
        .createUserWithEmailAndPassword(createData.email, createData.password)
        .then(async userData => {
          try {
            await userData.user.updateProfile({
              displayName: data.firstName,
            });
            const id = userData.user.uid;
            const result = await setLastUserObjectValue({
              id: id,
              email: data.email,
              password: data.password,
            });
            if (result) {
              setIsLoading(false);
              resolve(true);
              return;
            } else {
              setIsLoading(false);
              reject("Can't store user data in storage");
              return;
            }
          } catch {
            setIsLoading(false);
            reject("Can't update user display name");
            return;
          }
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            setIsLoading(false);
            reject('That email address is already in use!');
            return;
          }

          if (error.code === 'auth/invalid-email') {
            setIsLoading(false);
            reject('That email address is invalid!');
            return;
          }

          if (error.code === 'auth/network-request-failed') {
            setIsLoading(false);
            reject('A network error has occurred, please try again');
            return;
          }

          console.error(error);
          reject(error);
        });
    });
  };

  const loginUser = (data: TSignInFormType): Promise<boolean> => {
    setIsLoading(true);
    return new Promise((resolve, reject) => {
      auth()
        .signInWithEmailAndPassword(data.email, data.password)
        .then(async userData => {
          const id = userData.user.uid;
          const result = await setLastUserObjectValue({
            id: id,
            email: data.email,
            password: data.password,
          });
          if (result) {
            setIsLoading(false);
            resolve(true);
            return;
          } else {
            setIsLoading(false);
            reject("Can't store user data in storage");
            return;
          }
        })
        .catch(error => {
          if (error.code === 'auth/invalid-credential') {
            setIsLoading(false);
            reject('Incorrect email or password');
            return;
          }
          if (error.code === 'auth/network-request-failed') {
            setIsLoading(false);
            reject('A network error has occurred, please try again');
            return;
          }

          setIsLoading(false);
          reject(error);
        });
    });
  };

  const logOutUser = (): Promise<boolean> => {
    setIsLoading(true);
    return new Promise((resolve, reject) => {
      auth()
        .signOut()
        .then(() => {
          setIsLoading(false);
          resolve(true);
          return;
        })
        .catch(error => {
          setIsLoading(false);
          reject(error);
          return;
        });
    });
  };

  // Async storage methods
  const createUserAS = (data: TRegistrationFormType): Promise<boolean> => {
    setIsLoading(true);
    const key = data.email;
    return new Promise(async (resolve, reject) => {
      const emailExist = (await getObjectValue(data.email)) as UserAsyncStorage;
      if (emailExist !== null) {
        setIsLoading(false);
        reject('That email is already in use');
        return;
      }
      const key = data.email;
      const userAS: UserAsyncStorage = {
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        firstName: data.firstName,
        id: generateID(),
      };
      const result = await setObjectValue(key, userAS);
      if (result) {
        const result = await setLastUserObjectValueAS(userAS);
        if (result) {
          setIsLoading(false);
          resolve(true);
          return;
        } else {
          setIsLoading(false);
          resolve(false);
          return;
        }
      } else {
        setIsLoading(false);
        resolve(false);
      }
    });
  };

  const loginUserAS = (data: TSignInFormType): Promise<boolean> => {
    setIsLoading(true);
    return new Promise(async (resolve, reject) => {
      const key = data.email;

      const isUser = (await getObjectValue(key)) as UserAsyncStorage;
      if (isUser !== null) {
        if (isUser.password === data.password) {
          const result = await setLastUserObjectValueAS(isUser);
          if (result) {
            setIsLoading(false);
            resolve(true);
            return;
          } else {
            setIsLoading(false);
            reject('Something happen please try again later');
            return;
          }
        } else {
          setIsLoading(false);
          reject('Incorrect password');
        }
      } else {
        setIsLoading(false);
        reject('Email does not exist');
      }
    });
  };

  return {
    isLoading,
    isAuth,
    createUser,
    loginUser,
    logOutUser,
    createUserAS,
    loginUserAS,
    isAuthAS,
  };
};
