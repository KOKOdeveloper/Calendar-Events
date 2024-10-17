import {createContext, useContext, useState, useEffect} from 'react';
import {
  TUserManagerContextProps,
  TUserManagerContextType,
  User,
  UserAsyncStorage,
} from './types';
import auth from '@react-native-firebase/auth';
import {useDatabase} from 'databaseContext/useDatabaseContext';
import {getObjectValue, getStringValue, setObjectValue} from 'utils/storage';

const UserManagerContext = createContext<TUserManagerContextType | null>(null);

const UserManagerContextProvider = ({children}: TUserManagerContextProps) => {
  const {databaseType} = useDatabase();
  const [user, setUser] = useState<User>();
  useEffect(() => {
    if (databaseType === 'Firebase') {
      const authUser = auth().currentUser;
      if (authUser) {
        const tempUser: User = {
          userId: authUser.uid,
          username: authUser.displayName ?? '',
          email: authUser.email ?? '',
        };
        setUser(tempUser);
      }
    }
  }, []);

  useEffect(() => {
    const setupUser = async () => {
      if (databaseType === 'AsyncStorage') {
        const userAS = await getStringValue('login');
        if (userAS) {
          const tempUser = (await getObjectValue(userAS)) as UserAsyncStorage;
          if (tempUser !== null) {
            const authUser: User = {
              username: tempUser.firstName,
              userId: tempUser.id,
              email: tempUser.email,
            };
            setUser(authUser);
          }
        }
      }
    };
    setupUser();
  }, []);

  const updateUserName = (name: string): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
      const authUser = auth().currentUser;
      if (authUser) {
        try {
          await authUser.updateProfile({
            displayName: name,
          });
          const newUser: User = {
            username: name,
            userId: authUser.uid,
            email: authUser.email ?? '',
          };
          setUser(newUser);
          resolve(true);
        } catch (error) {
          reject(error);
        }
      } else {
        reject('User does not exist');
      }
    });
  };

  const updateUserNameAS = (name: string): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
      if (user) {
        const tempUser = (await getObjectValue(user.email)) as UserAsyncStorage;
        if (tempUser !== null) {
          tempUser.firstName = name;
          const newUser: User = {
            username: name,
            userId: tempUser.id,
            email: tempUser.email,
          };
          setUser(newUser);
          const result = await setObjectValue(tempUser.email, tempUser);
          if (result) {
            resolve(true);
            return;
          } else {
            reject('Cant update AS');
          }
        } else {
          reject('Cant get user in AS');
        }
      } else {
        reject('User does not exist');
      }
    });
  };

  return (
    <UserManagerContext.Provider
      value={{
        user,
        updateUserName,
        updateUserNameAS,
      }}>
      {children}
    </UserManagerContext.Provider>
  );
};

const useUserManager = (): TUserManagerContextType => {
  const context = useContext(UserManagerContext);
  if (context) {
    return context;
  } else {
    throw new Error(
      'User manager is not used whithin UserManagerContextProvider',
    );
  }
};
export {useUserManager, UserManagerContextProvider};
