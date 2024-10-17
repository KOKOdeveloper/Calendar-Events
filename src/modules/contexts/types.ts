import {TRegistrationFormType} from 'modules/auth/signUpForm';

export type TUserManagerContextType = {
  user: User | undefined;
  updateUserName: (name: string) => Promise<boolean>;
  updateUserNameAS: (name: string) => Promise<boolean>;
};

export type TUserManagerContextProps = {
  children: React.ReactNode;
};

export interface User {
  username: string;
  userId: string;
  email: string;
}

export type UserAsyncStorage = TRegistrationFormType & {
  id: string;
};
