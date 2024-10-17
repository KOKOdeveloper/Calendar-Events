import AsyncStorage from '@react-native-async-storage/async-storage';

export const setStringValue = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
};

export const getStringValue = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch {
    return null;
  }
};

export const setObjectValue = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    return true;
  } catch {
    return false;
  }
};

export const getObjectValue = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value != null ? JSON.parse(value) : null;
  } catch {
    return null;
  }
};

export const setLastUserObjectValue = async (value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('lu', jsonValue);
    return true;
  } catch {
    return false;
  }
};

export const getLastUserObjectValue = async () => {
  try {
    const value = await AsyncStorage.getItem('lu');
    return value != null ? JSON.parse(value) : null;
  } catch {
    return null;
  }
};

export const setLastUserObjectValueAS = async (value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('luAS', jsonValue);
    return true;
  } catch {
    return false;
  }
};

export const getLastUserObjectValueAS = async () => {
  try {
    const value = await AsyncStorage.getItem('luAS');
    return value != null ? JSON.parse(value) : null;
  } catch {
    return null;
  }
};

export const removeItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
};
