import AsyncStorage from '@react-native-async-storage/async-storage';

export const useBaseStorage = <T extends unknown>() => {
  const SaveData = async (data: T | T[], key: string): Promise<boolean> => {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem(key, jsonValue);
      return true;
    } catch (error) {
      return false;
    }
  };

  const GetData = async <T extends unknown>(key: string): Promise<T> => {
    const value = await AsyncStorage.getItem(key);
    const objToken: T = {} as T;
    if (value != null) {
      const objToken: T = JSON.parse(value);
      return objToken;
    }
    switch (typeof objToken) {
      case 'string':
        return '' as unknown as T;
      case 'boolean':
        return false as unknown as T;
      case 'number':
        return 0 as unknown as T;
      default:
        return undefined as unknown as T;
    }
  };

  const CheckData = async (key: string): Promise<boolean> => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value != null;
    } catch (error) {
      return false;
    }
  };

  const DeleteData = async (
    id: string,
    key: string,
    itemId: (item: T) => string,
  ): Promise<boolean> => {
    const value = await AsyncStorage.getItem(key);
    if (value != null) {
      const objToken: T[] = JSON.parse(value);
      const objTokenFilter = objToken.filter(item => itemId(item) !== id);
      const jsonValue = JSON.stringify(objTokenFilter);
      await AsyncStorage.setItem(key, jsonValue);
    }
    return true;
  };

  const RemoveData = async (keysArray: string[]) => {
    // Usamos Promise.all para manejar múltiples llamadas asincrónicas a AsyncStorage.removeItem
    await Promise.all(keysArray.map(key => AsyncStorage.removeItem(key)));
  };

  return {
    SaveData,
    GetData,
    CheckData,
    DeleteData,
    RemoveData,
  };
};
