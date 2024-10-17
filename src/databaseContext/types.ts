export type DatabaseType = 'Firebase' | 'AsyncStorage';

export type TDatabaseContextType = {
  databaseType: DatabaseType;
  updateDatabaseType(type: DatabaseType): void;
};

export type TDatabaseContextProps = {
  children: React.ReactNode;
};
