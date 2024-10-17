import {createContext, useContext, useState, useEffect} from 'react';
import {
  TDatabaseContextType,
  DatabaseType,
  TDatabaseContextProps,
} from './types';

const UserManagerContext = createContext<TDatabaseContextType | null>(null);

const DatabaseContextProvider = ({children}: TDatabaseContextProps) => {
  const [databaseType, setDatabaseType] = useState<DatabaseType>('Firebase');

  const updateDatabaseType = async (type: DatabaseType) => {
    setDatabaseType(type);
  };

  return (
    <UserManagerContext.Provider
      value={{
        databaseType,
        updateDatabaseType,
      }}>
      {children}
    </UserManagerContext.Provider>
  );
};

const useDatabase = (): TDatabaseContextType => {
  const context = useContext(UserManagerContext);
  if (context) {
    return context;
  } else {
    throw new Error(
      'Database context r is not used whithin DatabaseContextProvider',
    );
  }
};
export {useDatabase, DatabaseContextProvider};
